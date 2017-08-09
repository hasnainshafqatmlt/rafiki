import ActionTypes from '../constants/ActionTypes';
import BaseStore from './BaseStore';
import jwt_decode from 'jwt-decode';
import deepCopy from '../utils/deepCopy';
import UserActionCreator from '../actions/UserActionCreator';


class UserStore extends BaseStore {

	constructor() {
		super();
		this.subscribe(() => this._registerToActions.bind(this));
		this._error = null;
		this._success = null;
		this._action = null;
		this._user = {};
		this._members = [];
	}


	_registerToActions(action) {
		switch (action.type) {

			case ActionTypes.GET_PROFILE_SUCCESS:
				this._error = null;
				this._success = true;
				this._action = action;
				this._user = action.data.user;
				this.emitChange();
				break;

			case ActionTypes.GET_MEMBERS_SUCCESS:
				this._error = null;
				this._success = true;
				this._action = action;
				this._members = this._members.concat(action.data.users);
				//this._members = action.data.users;
				this.emitChange();
				break;

			case ActionTypes.UPDATE_PROFILE_SUCCESS:
				this._error = null;
				this._success = true;
				this._action = action;
				this.emitChange();
				break;

			case ActionTypes.GET_MYINFO_SUCCESS:
				this._error = null;
				this._success = true;
				this._action = action;
				this.emitChange();
				break;

			case ActionTypes.GET_USERS_SUCCESS:
				this._error = null;
				this._success = true;
				this._action = action;
				this.emitChange();
				break;

			case ActionTypes.UPDATE_SALES_SUCCESS:
				this._error = null;
				this._success = true;
				this._action = action;
				this.emitChange();
				break;

			case ActionTypes.GET_PROFILE_ERROR:
			case ActionTypes.GET_MEMBERS_ERROR:
			case ActionTypes.UPDATE_PROFILE_ERROR:
			case ActionTypes.GET_MYINFO_ERROR:
			case ActionTypes.GET_USERS_ERROR:
				if (action.error) {
					this._error = action.error.message || 'none';
				} else {
					this._error = 'none';
				}

				this._success = false;
				this._action = action;
				this.emitChange();
				break;


			default:
				this._action = action;
				break;
		}
	}

	get singleUserData() {
		return this._singleUserData;
	}

	get user() {
		return this._user;
	}	

	get members() {
		return deepCopy(this._members || []);
	}

	clearMembers() {
		this._members = [];
	}

	get error() {
		return deepCopy(this._error);
	}

	get success() {
		return deepCopy(this._success);
	}

}

export default new UserStore();
