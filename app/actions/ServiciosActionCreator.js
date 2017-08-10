import { dispatch } from '../dispatchers/AppDispatcher';
import Config from '../config/Config';
import ActionTypes from '../constants/ActionTypes';
import WebAPIUtils from '../utils/WebAPIUtils';


export default {

	setCategories: (selectedCategories) => {
		const action = ActionTypes.SET_AREAS_CATEGORIES;
		dispatch(action, {data: selectedCategories});
	},  

	setServiceDescription: (data) => {
		const action = ActionTypes.SET_SERVICE_DESCRIPTION;
		dispatch(action, {data});
	},

	submitService: (data) => {
		const success = ActionTypes.SUBMIT_SERVICE_SUCCESS;
		const error = ActionTypes.SUBMIT_SERVICE_ERROR;
		const url = `${Config.API_URL}/services`;

		WebAPIUtils.sendPOST(success, error, url, data);
	},

	updateService: (data, id) => {
		const success = ActionTypes.UPDATE_SERVICE_SUCCESS;
		const error = ActionTypes.UPDATE_SERVICE_ERROR;
		const url = `${Config.API_URL}/services/${id}`;

		WebAPIUtils.sendPUT(success, error, url, data);
	},

	getServices: () => {
		const success = ActionTypes.GET_SERVICES_SUCCESS;
		const error = ActionTypes.GET_SERVICES_ERROR;
		const url = `${Config.API_URL}/services/my`;

		WebAPIUtils.sendGET(success, error, url);
	},

	deleteServices: (data, id) => {
		const success = ActionTypes.DELETE_SERVICE_SUCCESS;
		const error = ActionTypes.DELETE_SERVICE_ERROR;
		const url = `${Config.API_URL}/services/status/${id}`;

		WebAPIUtils.sendPUT(success, error, url, data);
	},

	getAdminServices: () => {
		const success = ActionTypes.GET_SERVICES_SUCCESS;
		const error = ActionTypes.GET_SERVICES_ERROR;
		const url = `${Config.API_URL}/services`;

		WebAPIUtils.sendGET(success, error, url);
	},

	getServiceById: (id) => {
		const success = ActionTypes.GET_SERVICES_BYID_SUCCESS;
		const error = ActionTypes.GET_SERVICES_BYID_ERROR;
		const url = `${Config.API_URL}/services/${id}`;

		WebAPIUtils.sendGET(success, error, url);
	},

	setServiceUserData: (data) => {
		const action = ActionTypes.SET_SERVICE_USER_DATA;
		dispatch(action, {data: data});
	},

	acceptService: (data, id) => {
		const success = ActionTypes.ACCEPT_SERVICE_SUCCESS;
		const error = ActionTypes.ACCEPT_SERVICE_ERROR;
		const url = `${Config.API_URL}/services/status/${id}`;

		WebAPIUtils.sendPUT(success, error, url, data);
	},

	rejectService: (data, id) => {
		const success = ActionTypes.REJECT_SERVICE_SUCCESS;
		const error = ActionTypes.REJECT_SERVICE_ERROR;
		const url = `${Config.API_URL}/services/status/${id}`;

		WebAPIUtils.sendPUT(success, error, url, data);
	},

}