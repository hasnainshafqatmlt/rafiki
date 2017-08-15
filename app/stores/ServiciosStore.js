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
		this._selectedCategory = {};
		this._serviceDescription = {};
		this._service = {};
		this._services = {};
		this._serviceUserDetail = {};
	}


	_registerToActions(action) {
		switch (action.type) {

			case ActionTypes.SET_AREAS_CATEGORIES:
				this._error = null;
				this._success = true;
				this._selectedCategory = action.data;
				this.emitChange();
				break;

			case ActionTypes.SET_SERVICE_DESCRIPTION:
				this._error = null;
				this._success = true;
				this._serviceDescription = action.data;
				this.emitChange();
				break;

			case ActionTypes.SUBMIT_SERVICE_SUCCESS:
				this._error = null;
				this._success = true;
				this._service = action.data;
				this.emitChange();
				break;

			case ActionTypes.GET_SERVICES_SUCCESS:
				this._error = null;
				this._success = true;
				this._services = action.data;
				this.emitChange();
				break;

			case ActionTypes.DELETE_SERVICE_SUCCESS:
				this._error = null;
				this._success = true;
				this.emitChange();
				break;

			case ActionTypes.SET_SERVICE_USER_DATA:
				this._error = null;
				this._success = true;
				this._serviceUserDetail = action.data;
				this.emitChange();
				break;

			case ActionTypes.ACCEPT_SERVICE_SUCCESS:
				this._error = null;
				this._success = true;
				this.emitChange();
				break;

			case ActionTypes.REJECT_SERVICE_SUCCESS:
				this._error = null;
				this._success = true;
				this.emitChange();
				break;

			case ActionTypes.GET_SERVICES_BYID_SUCCESS:
				this._error = null;
				this._success = true;
				this.emitChange();
				break;

			case ActionTypes.UPDATE_SERVICE_SUCCESS:
				this._error = null;
				this._success = true;
				this.emitChange();
				break;

			case ActionTypes.EXPORT_SERVICES_SUCCESS:
				this._error = null;
				this._success = true;
				this.emitChange();
				break;				

			default:
				this._action = action;
				break;
		}
	}

	get getSelectedCategory() {
		return this._selectedCategory;
	}

	get getServiceDescription() {
		return this._serviceDescription;
	}

	get getServices() { console.log(' in store >>', this._services)
		return this._services;
	}

	clearCategoryService() {
		this._selectedCategory = {};
		this._serviceDescription = {};
	}

	get getServiceUserDetail() {
		return this._serviceUserDetail;
	}

	get error() {
		return deepCopy(this._error);
	}

	get success() {
		return deepCopy(this._success);
	}

}

export default new AreasStore();
