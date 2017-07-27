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

};
