import ActionTypes from '../constants/ActionTypes';
import BaseStore from './BaseStore';
import jwt_decode from 'jwt-decode';
import deepCopy from '../utils/deepCopy';


class SignupStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this));
    this._error = null;
    this._success = null;
    this._phoneCode = null;
  }

  _registerToActions(action) {
    switch(action.type) {

      case ActionTypes.REQUEST_SIGNUP_USER_SUCCESS:
        this._error = null;
        this._phoneCode = null;
        this._success = true;
        this.emitChange();
        break;

      case ActionTypes.REQUEST_SIGNUP_USER_ERROR:
        if (action.error) {
          this._error = action.error.message || 'none';
        } else {
          this._error = 'none';
        }
        this._success = false;
        this._phoneCode = null;
        this.emitChange();
        break;

      case ActionTypes.REQUEST_SIGNUP_PHONE_CODE_SUCCESS:
        this._error = null;
        this._success = true;
        this._phoneCode = action.data && action.data.result;
        this.emitChange();
        break;

      case ActionTypes.REQUEST_SIGNUP_PHONE_CODE_ERROR:
        if (action.error) {
          this._error = action.error.message || 'error';
        } else {
          this._error = 'error';
        }
        this._success = false;
        this._phoneCode = action.data && action.data.result;
        this.emitChange();
        break;

      default:
        break;
    };
  }

  get error() {
    return deepCopy(this._error);
  }

  get success() {
    return deepCopy(this._success);
  }

  get phoneCode() {
    return deepCopy(this._phoneCode);
  }
}

export default new SignupStore();
