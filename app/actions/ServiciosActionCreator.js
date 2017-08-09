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

}