import ServerActionCreator from '../actions/ServerActionCreator';
import SyncErrorTracker, { RetryStatus } from './SyncErrorTracker';


/**
 * Used for send requests one by one in queue.
 *
 * It allows don't send next request from the same queue
 * if from previous request it got an error. If it got
 * an error from API response it retry to send the same
 * request after 5 seconds. If it got a critical error
 * like a no internet connection or server don't respond
 * it clear queue with this request.
 *
 * Queues with different name runs without dependencies.
 * It means that errors from one queue don't influence
 * on run process of another queues at all.
 */
class SyncLayer {

  constructor() {
    // Schema: {'queueName': [actions]}
    this._queue = {};

    // Queue name that is in processing now.
    this._processingQueue = null;

    // Delay between retries of failed request (in milliseconds)
    this._retryDelay = 5000;

    // Allow to check if at least one request is in processing
    this._isSyncing = false;

    // Check if the action allows retry or no
    // (all actions in this object aren't allow retry)
    // Schema: {'queueName': [actions]}
    this._noRetryActions = {};

    // By default all actions allow retry
    this._actionRetryStatus = true;

    // Max retries
    this._maxRetryCount = 3;

    // Retry counters for queues
    // Schema: {'queueName': Number}
    this._retryCounter = {};
  }

  /**
   * Used for to add action to queue in react component.
   * All actions execute one by one in the same queue (from array with the same queueName).
   * @param  {[string]}      queueName [queue name where action was put]
   * @param  {[function]}    action    [action creator function]
   * @param  {...[any]}      args      [action creator function arguments]
   */
  addAction(queueName, action, ...args) {
    const queue = this._queue;
    queue[queueName] = queue[queueName] || [];
    const q = queue[queueName];
    const act = action.bind(null, ...args);
    q.push(act);

    if (!this._actionRetryStatus) {
      const noRetr = this._noRetryActions;
      noRetr[queueName] = noRetr[queueName] || [];
      const noRQ = noRetr[queueName];
      noRQ.push(act);
      this._actionRetryStatus = true;
    }

    if (q.length === 1) {
      this._retryCounter[queueName] = 0;
      this._isSyncing = true;
      SyncErrorTracker.emitChange();
      this._runQueue(queueName);
    }
  }

  /**
   * Used for handle responses from WebAPIUtils
   * @param  {[string]} queueName  [queue name from where action was called]
   * @param  {[string]} actionType [type of action which sent request]
   * @param  {[object]} data       [data returned in response]
   */
  receiveAPISuccess(queueName, actionType, data) {
    ServerActionCreator.receiveAPIData(actionType, data);
    if (queueName) {
      const _queue = this._queue[queueName];
      // One action in current queue that already comleted and will be shifted soon
      if (_queue && _queue.length === 1) {
        SyncErrorTracker.removeQueue(queueName);
      // Delete retry status from queue
      } else {
        SyncErrorTracker.clearRetry(queueName);
      }
      this._retryCounter[queueName] = 0;
      this._continue(queueName);
    }
  }

  receiveAPIError(queueName, actionType, error) {
    ServerActionCreator.receiveAPIError(actionType, error);
    if (queueName) {
      const queue = this._queue[queueName];
      const noRQ = this._noRetryActions[queueName];
      // Check if action doesn't allow retry
      if (!noRQ || (Array.isArray(noRQ) && !noRQ.includes(queue[0]))) {
        if (this._retryCounter[queueName] < this._maxRetryCount) {
          SyncErrorTracker.handleRetry(queueName, this._retryDelay);
          this._retryCounter[queueName]++;
          this._retry(queueName);
        } else {
          SyncErrorTracker.clearRetry(queueName);
        }
      } else {
        this._continue(queueName);
      }
    }
  }

  receiveProcessError(queueName, actionType, error) {
    ServerActionCreator.receiveProcessError(actionType, error);
    if (queueName) {
      delete this._queue[queueName];
      delete this._retryCounter[queueName];
      this._processingQueue = null;
    }
  }

  /**
   * Used for managing queue execution
   * @param  {[string]} queueName [queue name where we can call next action]
   */
  _continue(queueName) {
    const queue = this._queue[queueName];
    const removedAct = queue.shift();
    const noRQ = this._noRetryActions[queueName];

    if (Array.isArray(noRQ)) {
      if (noRQ.length) {
        const idx = noRQ.indexOf(removedAct);

        if (idx !== -1) {
          noRQ.splice(idx, 1);
        }
      } else {
        delete this._noRetryActions[queueName];
      }
    }

    this._runQueue(queueName);
  }

  _retry(queueName) {
    setTimeout(() => {
      this._runQueue(queueName);
    }, this._retryDelay);
  }

  _runQueue(queueName) {
    const queue = this._queue[queueName];
    if (queue.length) {
      this._processingQueue = queueName;
      queue[0]();
    } else {
      delete this._queue[queueName];
      delete this._retryCounter[queueName];
      // Check if all requests was processed
      if (Object.keys(this._queue).length === 0) {
        this._isSyncing = false;
        SyncErrorTracker.emitChange();
      }
    }
    this._processingQueue = null;
  }

  /**
   * Used for get requests are processing or no
   */
  isSyncing() {
    return this._isSyncing;
  }

  /**
   * Used for that next added action doesn't allow retry
   */
  nextActionWithoutRetry() {
    this._actionRetryStatus = false;
  }

  /**
   * Used for get queueName for bind it to response callback in WebAPIUtils
   * @return {[String]} [queue name of current processing queue]
   */
  get processingQueue() {
    return this._processingQueue;
  }

  /**
   * Used for get delay between retries of failed request
   * @return {[Number]} [delay between retries]
   */
  get retryDelay() {
    return this._retryDelay;
  }

  /**
   * Used for set delay between retries of failed request
   * @param  {[type]} retryDelay [time to pause between retries]
   */
  set retryDelay(retryDelay) {
    if (Number.isInteger(retryDelay)) {
      retryDelay = Math.trunc(retryDelay);

      if (retryDelay > 0 && retryDelay <= 20) {
        retryDelay *= 1000;
      } else if (retryDelay > 20 && retryDelay < 500) {
        throw new Error('SyncLayer.retryDelay(...): You try to set too small delay between retries of failed request');
      } else if (retryDelay >= 500 && retryDelay < 1000) {
        console.warn('SyncLayer.retryDelay(...): You set very small delay between retries of failed request');
      } else if (retryDelay >= 1000 && retryDelay <= 20000) {
        // All right, just continue
      } else if (retryDelay > 20000) {
        throw new Error('SyncLayer.retryDelay(...): You try to set too large delay between retries of failed request');
      } else {
        throw new Error('SyncLayer.retryDelay(...): Retry delay must be > 0');
      }

    } else {
      throw new Error(`SyncLayer.retryDelay(...): Retry delay must be a number in seconds or in milliseconds,
        but you try to set ${typeof retryDelay}`);
    }

    this._retryDelay = retryDelay;
  }

}

export default new SyncLayer();
