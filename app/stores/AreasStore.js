import ActionTypes from '../constants/ActionTypes';
import BaseStore from './BaseStore';
import jwt_decode from 'jwt-decode';
import deepCopy from '../utils/deepCopy';
import UserActionCreator from '../actions/UserActionCreator';


class AreasStore extends BaseStore {

	constructor() {
		super();
		this.subscribe(() => this._registerToActions.bind(this));
		this._error = null;
		this._success = null;
		this._action = null;
		this._areas = {};
		this._members = [];
	}


	_registerToActions(action) {
		switch (action.type) {

			case ActionTypes.SET_AREAS_CATEGORIES:
				this._error = null;
				this._success = true;
				this._action = action;
				this._areas = action.data;
				this.emitChange();
				break;

			default:
				this._action = action;
				break;
		}
	}

	get getAreas() {
		return this._areas;
	}

	get error() {
		return deepCopy(this._error);
	}

	get success() {
		return deepCopy(this._success);
	}

}

export default new AreasStore();
