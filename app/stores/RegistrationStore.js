import ActionTypes from '../constants/ActionTypes';
import BaseStore from './BaseStore';
import jwt_decode from 'jwt-decode';
import deepCopy from '../utils/deepCopy';


class RegistrationStore extends BaseStore {

	constructor() {
		super();
		this.subscribe(() => this._registerToActions.bind(this));
		this._error = null;
		this._success = null;
	}

	_registerToActions(action) {
		switch(action.type) {

			case ActionTypes.SIGNUP_USER_SUCCESS:
			case ActionTypes.SIGNUP_STEP2_SUCCESS:
			case ActionTypes.REQUEST_RESET_PASSWORD_SUCCESS:
				this._error = null;
				this._success = true;
				this.emitChange();
			break;

			case ActionTypes.SIGNUP_USER_ERROR:
			case ActionTypes.SIGNUP_STEP2_ERROR:
			case ActionTypes.REQUEST_RESET_PASSWORD_ERROR:
				if (action.error) {
					this._error = action.error.message || 'none';
				} else {
					this._error = 'none';
				}

				this._success = false;
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

}

export default new RegistrationStore();
