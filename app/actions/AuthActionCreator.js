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
			password
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
		const action = ActionTypes.LOGOUT_SUCCESS;
		dispatch(action);
	},
}
