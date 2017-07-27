import {dispatch} from '../dispatchers/AppDispatcher';
import {API_URL} from '../config';
import ActionTypes from '../constants/ActionTypes';
import WebAPIUtils from '../utils/WebAPIUtils';


export default {

	registerStep1: (payload) => {
		const success = ActionTypes.REQUEST_SIGNUP_USER_SUCCESS;
		const error = ActionTypes.REQUEST_SIGNUP_USER_ERROR;
		const url = `${API_URL}/users`;

		const form = {
			id: data.phone,
			id_type: 'phone',
			username: data.username,
			password: data.password,
			code: data.phone_code,
		};

		WebAPIUtils.sendPOST(success, error, url, form);
	},

	checkEmail: (phoneNo,username) => {
		const success = ActionTypes.REQUEST_SIGNUP_PHONE_CODE_SUCCESS;
		const error = ActionTypes.REQUEST_SIGNUP_PHONE_CODE_ERROR;
		const url = `${API_URL}/users/exists`;

		WebAPIUtils.sendGET(success, error, url);
	},
}
