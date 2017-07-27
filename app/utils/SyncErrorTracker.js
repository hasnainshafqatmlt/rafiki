import { EventEmitter } from 'events';
import keyMirror from 'fbjs/lib/keyMirror';


export const RetryStatus = keyMirror({
  PENDING: null,
  PROCESSING: null,
});

/**
 * User for tracking errors in sync layer.
 *
 * It allows to register callbacks which will called when
 * pending to retry will started.
 */
class SyncErrorTracker extends EventEmitter {
  constructor() {
    super();
    // Used for checking general status:
    // 1) Check if pending of next retry then don't need to do emit.
    // 2) Check if retry in process then we wait to handle retry
    //    or success (set retry status to STOPPED).
    this._retryStatus = {};
    // Time to retry tick (default 1 second)
    this._tick = 1000;
    // Time to retry
    this._timeToRetry = -1;
    // Stop watch for queues
    this._stopWatch = {};
  }

  /**
   * Used for register callback which will called when pending to retry will started
   * @param  {[function]} callback [function which will called when pending to retry will started]
   */
  addSyncErrorListener(callback) {
    this.on('SyncErrorTracker', callback)
  }

  /**
   * Used for unregister callback which will called when retry pending will started
   * @param  {[function]} callabck [registered callback]
   */
  removeSyncErrorListener(callback) {
    this.removeListener('SyncErrorTracker', callback);
  }

  /**
   * Used for emit event
   * @param  {[String]} queueName [name of queue to check stop watching]
   */
  emitChange(queueName) {
    if (!queueName || !this._stopWatch[queueName]) {
      this.emit('SyncErrorTracker');
    }
  }

  /**
   * Used for show request error with countdown and retry
   * @param  {[String]} queueName [name of queue to start watching]
   */
  startWatchQueue(queueName) {
    this._stopWatch[queueName] = false;
  }

  /**
   * Used for don't show error after close by user
   * @param  {[String]} queueName [name of queue to stop watching]
   */
  stopWatchQueue(queueName) {
    this._stopWatch[queueName] = true;
  }

  /**
   * Used for handling retry pending start
   * @param  {[Number]} time [pending time to next retry]
   */
  handleRetry(queueName, time) {
    const statusKeys = Object.keys(this._retryStatus);
    if (statusKeys.length && !this._retryStatus[queueName]) {
      return;
    }

    this._retryStatus[queueName] = RetryStatus.PENDING;
    this._timeToRetry = time;
    this.emitChange(queueName);
    const intervalId = setInterval(this._decreaseTimeToRetry.bind(this, queueName), this._tick);
    setTimeout(() => {
      this._retryStatus[queueName] = RetryStatus.PROCESSING;
      this.emitChange(queueName);
      clearInterval(intervalId);
    }, time);
  }

  /**
   * Used for remove retry for queue
   * @param  {[String]} queueName [name of queue to delete]
   */
  removeQueue(queueName) {
    delete this._retryStatus[queueName];
    delete this._stopWatch[queueName];
    this.emitChange();
  }

  /**
   * Used for clearing retry status of queue
   * @param  {[String]} queueName [name of queue to clear retry status]
   */
  clearRetry(queueName) {
    delete this._retryStatus[queueName];
    this.emitChange();
  }

  /**
   * Used for get retry status for certain queue
   * @param  {[type]} queueName [name of queue which retry status will be returned]
   * @return {[String]} [retry status of queue with name=queueName]
   */
  getRetryStatus(queueName) {
    return this._retryStatus[queueName];
  }

  /**
   * Used for get time to retry
   * @return {[Number]} [time to next retry in milliseconds]
   */
  getTimeToRetry() {
    return this._timeToRetry / 1000;
  }

  /**
   * Used for change tick
   * @param  {[type]} tick [to retry time tick]
   */
  set tick(tick) {
    this._tick = tick;
  }

  /**
   * Used for countdown time to retry
   * @param  {[String]} queueName [name of queue to check stop watching in emitChange]
   */
  _decreaseTimeToRetry = (queueName) => {
    this._timeToRetry -= this._tick;
    if (this._timeToRetry > 0) {
      this.emitChange(queueName);
    } else {
      this._timeToRetry = 0;
    }
  }

}


export default new SyncErrorTracker();