import { dispatch } from '../dispatchers/AppDispatcher';
import { API_URL } from '../config/Config';
import ActionTypes from '../constants/ActionTypes';
import WebAPIUtils from '../utils/WebAPIUtils';


export default {

  setCategories: (selectedCategories) => {
    const action = ActionTypes.SET_AREAS_CATEGORIES;
    dispatch(action, {data: selectedCategories});
  },

}