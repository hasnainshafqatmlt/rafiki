import axios from 'axios';
import ActionTypes from '../constants/ActionTypes';
import SyncLayer from './SyncLayer';
import AuthStore from '../stores/AuthStore';

class WebAPIUtils {

  sendGET(actionTypeSuccess, actionTypeError, url, headers=WebAPIUtils._addJWT(), json=true) {
    axios.get(url, { headers })
    .then(WebAPIUtils._successCallback.bind(null, SyncLayer.processingQueue, actionTypeSuccess, actionTypeError))
    .catch(WebAPIUtils._errorCallback.bind(null, SyncLayer.processingQueue, actionTypeSuccess, actionTypeError));
  }

  sendPOST(actionTypeSuccess, actionTypeError, url, form, formData, withCredentials=true, body, headers=WebAPIUtils._addJWT(), json=true) {
    axios.post(url, {...form}, {headers})
    .then(WebAPIUtils._successCallback.bind(null, SyncLayer.processingQueue, actionTypeSuccess, actionTypeError))
    .catch(WebAPIUtils._errorCallback.bind(null, SyncLayer.processingQueue, actionTypeSuccess, actionTypeError));
  }

  sendPUT(actionTypeSuccess, actionTypeError, url, form, headers=WebAPIUtils._addJWT(), json=true) {
    request.put({
      uri: url,
      //form: form,
      body: form,
      headers: headers,
      json: json,
    }, WebAPIUtils._responseCallback.bind(null, actionTypeSuccess, actionTypeError, SyncLayer.processingQueue));
    // axios.put(url, {
    //   ...form,
    // })
    // .then(WebAPIUtils._successCallback.bind(null, _queueName, actionTypeSuccess, actionTypeError))
    // .catch(WebAPIUtils._errorCallback.bind(null, _queueName, actionTypeSuccess, actionTypeError));
  }

  sendDELETE(actionTypeSuccess, actionTypeError, url, data, headers=WebAPIUtils._addJWT(), json=true) {
    axios.delete(url, data, {
      headers,
      cache: true,
      timeout: 1800000,
    })
    .then(WebAPIUtils._successCallback.bind(null, SyncLayer.processingQueue, actionTypeSuccess, actionTypeError))
    .catch(WebAPIUtils._errorCallback.bind(null, SyncLayer.processingQueue, actionTypeSuccess, actionTypeError));
  }

  static _responseCallback(actionTypeSuccess, actionTypeError, _queueName, err, response, body) {
    if (err) {
      WebAPIUtils._errorCallback(_queueName, actionTypeSuccess, actionTypeError, err, response, body);
    } else {
      WebAPIUtils._successCallback(_queueName, actionTypeSuccess, actionTypeError, response, body);
    }
  }

  static _successCallback(_queueName, actionTypeSuccess, actionTypeError, response) {
    const statusCode = response.statusCode || response.status;
    if (statusCode !== 200) {
      if (statusCode == 401) {
        SyncLayer.receiveAPIError(_queueName, ActionTypes.UNAUTHORIZED_USER, response.data);
      } else {
        SyncLayer.receiveAPIError(_queueName, actionTypeError, response.data);
      }
    } else {
      SyncLayer.receiveAPISuccess(_queueName, actionTypeSuccess, response.data);
    }
  }

  static _errorCallback(_queueName, actionTypeSuccess, actionTypeError, error) {
  	const response = error.response;

  	if (response.status == 401) {
		SyncLayer.receiveAPIError(_queueName, ActionTypes.UNAUTHORIZED_USER, response.data);
	} else {
		SyncLayer.receiveAPIError(_queueName, actionTypeError, response.data);
	}

  }

  static _addJWT() {
    const jwt = AuthStore.jwt;
    if (AuthStore.isLoggedIn && jwt) {
      return {
        Authorization: 'Bearer ' + jwt,
      };
    } else {
      return { };
    }
  }

}

export default new WebAPIUtils();
