import {dispatch}from '../dispatchers/AppDispatcher';


export default {

	receiveAPIData: (actionType, data) => {
		dispatch(actionType, {data: data});
	},

	receiveAPIError: (actionType, error) => {
		dispatch(actionType, {error: error});
	},

	receiveProcessError: (actionType, error) => {
		dispatch(actionType, {processError: error});
	},

}
