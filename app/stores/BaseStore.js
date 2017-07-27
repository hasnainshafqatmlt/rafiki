import { EventEmitter } from 'events';

import { register } from '../dispatchers/AppDispatcher';
import deepCopy from '../utils/deepCopy';


export default class BaseStore extends EventEmitter {

  constructor() {
    super();
    this.setMaxListeners(100);
    register(this._registerLastActionChecked);
  }

  subscribe(actionSubscribe) {
    this._dispatchToken = register(actionSubscribe());
  }

  get dispatchToken() {
    return this._dispatchToken;
  }

  emitChange() {
    this.emit('CHANGE');
  }

  addChangeListener(cb) {
    this.on('CHANGE', cb)
  }

  removeChangeListener(cb) {
    this.removeListener('CHANGE', cb);
  }

  _registerLastActionChecked = (action) => {
    this._action = action;
  }

  getLastAction() {
    return deepCopy(this._action);
  }
}
