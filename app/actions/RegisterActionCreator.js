import {dispatch} from '../dispatchers/AppDispatcher';
import Config from '../config/Config';
import ActionTypes from '../constants/ActionTypes';
import WebAPIUtils from '../utils/WebAPIUtils';


export default {

	registerStep1: (form) => {
		const success = ActionTypes.SIGNUP_USER_SUCCESS;
		const error = ActionTypes.SIGNUP_USER_ERROR;
		const url = `${Config.API_URL}/users`;

		WebAPIUtils.sendPOST(success, error, url, form);
	},

	registerStep2: (id, code) => {
		const success = ActionTypes.SIGNUP_STEP2_SUCCESS;
		const error = ActionTypes.SIGNUP_STEP2_ERROR;
		const url = `${Config.API_URL}/users/${id}/confirm`;

		WebAPIUtils.sendPUT(success, error, url, {code});
	},

	requestResetPassword: (form) => {
		const success = ActionTypes.REQUEST_RESET_PASSWORD_SUCCESS;
		const error = ActionTypes.REQUEST_RESET_PASSWORD_ERROR;
		const url = `${Config.API_URL}/users/request_reset_password`;

		WebAPIUtils.sendPOST(success, error, url, form);
	},

	resetPassword: (id, form) => {
		const success = ActionTypes.RESET_PASSWORD_SUCCESS;
		const error = ActionTypes.RESET_PASSWORD_ERROR;
		const url = `${Config.API_URL}/users/reset_password/${id}`;

		WebAPIUtils.sendPOST(success, error, url, form);
	},	

	checkEmail: (phoneNo,username) => {
		const success = ActionTypes.SIGNUP_EMAIL_AVAILABLE_SUCCESS;
		const error = ActionTypes.SIGNUP_EMAIL_AVAILABLE_ERROR;
		const url = `${API_URL}/users/exists`;

		WebAPIUtils.sendGET(success, error, url);
	},
}
