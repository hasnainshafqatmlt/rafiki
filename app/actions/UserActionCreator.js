import { dispatch } from '../dispatchers/AppDispatcher';
import Config from '../config/Config';
import ActionTypes from '../constants/ActionTypes';
import WebAPIUtils from '../utils/WebAPIUtils';

import QueryString from 'query-string';


export default {

	getProfile: (username) => {
		const success = ActionTypes.GET_PROFILE_SUCCESS;
		const error = ActionTypes.GET_PROFILE_ERROR;
		const url = `${Config.API_URL}/users/profile/${username}`;

		WebAPIUtils.sendGET(success, error, url);
	},

	getMembers: (q, d, skip=0) => {
		const success = ActionTypes.GET_MEMBERS_SUCCESS;
		const error = ActionTypes.GET_MEMBERS_ERROR;

		const dispositions = (typeof d === 'string') ? `["${d}"]` : d;

		const query = {
			q, dispositions, skip
		}

		const url = `${Config.API_URL}/users?${QueryString.stringify(query)}`;

		WebAPIUtils.sendGET(success, error, url);
	},

	updateProfile: (data, id) => {
		const success = ActionTypes.UPDATE_PROFILE_SUCCESS;
		const error = ActionTypes.UPDATE_PROFILE_ERROR;
		const url = `${Config.API_URL}/users/${id}`;

		WebAPIUtils.sendPUT(success, error, url, data);
	},

	getMyinfo: () => {
		const success = ActionTypes.GET_MYINFO_SUCCESS;
		const error = ActionTypes.GET_MYINFO_ERROR;
		const url = `${Config.API_URL}/users/my_info`;

		WebAPIUtils.sendGET(success, error, url);
	},

	getUsers: () => {
		const success = ActionTypes.GET_USERS_SUCCESS;
		const error = ActionTypes.GET_USERS_ERROR;
		const url = `${Config.API_URL}/users`;

		WebAPIUtils.sendGET(success, error, url);
	},

	updateSales: (data, id) => {
		const success = ActionTypes.UPDATE_SALES_SUCCESS;
		const error = ActionTypes.UPDATE_SALES_ERROR;
		const url = `${Config.API_URL}/users/sales/${id}`;

		WebAPIUtils.sendPUT(success, error, url, data);
	},

	deleteUser: (data, id) => {
		const success = ActionTypes.DELETE_USER_SUCCESS;
		const error = ActionTypes.DELETE_USER_ERROR;
		const url = `${Config.API_URL}/users/status/${id}`;

		WebAPIUtils.sendPUT(success, error, url, data);
	},

};
