import { dispatch } from '../dispatchers/AppDispatcher';
import Config from '../config/Config';
import ActionTypes from '../constants/ActionTypes';
import WebAPIUtils from '../utils/WebAPIUtils';

import QueryString from 'query-string';


export default {

	updateProfile: (data, id) => {
		const success = ActionTypes.UPDATE_PROFILE_SUCCESS;
		const error = ActionTypes.UPDATE_PROFILE_ERROR;
		const url = `${Config.API_URL}/users/${id}`;

		WebAPIUtils.sendPUT(success, error, url, data);
	},

};
