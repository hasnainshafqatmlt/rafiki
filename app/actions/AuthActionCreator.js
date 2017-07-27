import { dispatch } from '../dispatchers/AppDispatcher';
import Config from '../config/Config';
import ActionTypes from '../constants/ActionTypes';
import WebAPIUtils from '../utils/WebAPIUtils';



export default {

	loginUser: (email, password) => {
		const success = ActionTypes.REQUEST_LOGIN_USER_SUCCESS;
		const error = ActionTypes.REQUEST_LOGIN_USER_ERROR;
		const url = `${Config.API_URL}/auth/login`;

		const form = {
			email,
			password,
			os: 'WINDOWS', // TODO: Get os
			grant_type: 'password'
		};

		WebAPIUtils.sendPOST(success, error, url, form);
	},

	authenticateUser: () => {
		const success = ActionTypes.REQUEST_LOGIN_USER_SUCCESS;
		const error = ActionTypes.REQUEST_LOGIN_USER_ERROR;
		const url = `${Config.API_URL}/auth/authenticate`;

		const form = {};
		WebAPIUtils.sendPOST(success, error, url, form);
	},

	logoutUser: () => {
		const success = ActionTypes.LOGOUT_SUCCESS;
		const error = ActionTypes.LOGOUT_FAIL;
		const url = `${Config.API_URL}/auth/logout`;
		const form = {};
		WebAPIUtils.sendPOST(success, error, url, form);
	},
}
