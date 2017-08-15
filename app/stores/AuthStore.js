import jwtDecode from 'jwt-decode';

import ActionTypes from '../constants/ActionTypes';
import BaseStore from './BaseStore';
import deepCopy from '../utils/deepCopy';
import keyMirror from '../utils/keyMirror';


const USER_DATA = keyMirror(
    {
        IMAGE: null,
        USERNAME: null,
    },
    {
        toLowerCase: true
    },
);

class AuthStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this));

    // Update Store taking data from JWT
    this._autoLogin();

    this._redirectionUrl = null;
  }

  _registerToActions(action) {
    switch (action.type) {
    // LOGIN, REFRESH JWT
    case ActionTypes.REQUEST_LOGIN_USER_SUCCESS:{
      const data = action.data.respData;
      this._jwt = data.token;
      this._user = data.user || null;
      this._error = null;

      //this._setAjaxPrefilter();
      this._login();
      this.emitChange();
      break;
    }

    case ActionTypes.REQUEST_LOGIN_USER_ERROR:
    case ActionTypes.REQUEST_RESET_PASSWORD_ERROR:
    case ActionTypes.UNAUTHORIZED_USER:
      if (action.error) {
        this._error = action.error.message || 'none';
      } else {
        this._error = 'none';
      }
      this.emitChange();
      break;

    case ActionTypes.REQUEST_RESET_PASSWORD_SUCCESS:
      this._error = null;
      this.emitChange();
      break;

    case ActionTypes.SET_AFTER_LOGIN_REDIRECTION_URL:
      this._redirectionUrl = action.data;
      localStorage.setItem('ALRU', action.data);
      break;

    case ActionTypes.RESET_AFTER_LOGIN_REDIRECTION_URL:
      this._redirectionUrl = null;
      localStorage.removeItem('ALRU');
      break;

    case ActionTypes.UPDATE_PROFILE_SUCCESS:
        this._error = null;
        this._success = true;
        this._action = action;
        this.emitChange();
        break;

    // LOGOUT
    case ActionTypes.LOGOUT:
    case ActionTypes.LOGOUT_SUCCESS:
      this._logout();
      break;


    default:
      break;
    }
  }

  _login() {
    const storeIt = {
      header: {
        'kogno-token': this._jwt,
        storeTime: Math.floor(Date.now() / 1000),
      },
      userData: {
        _id: this._user._id,
        userId: this._user._id,
        email: this._user.email,
        fullName: this._user.fullName,
        country: this._user.country,
        about: this._user.about,
        role: this._user.role,
        sales: this._user.sales,
        avatar: this._user.avatar,
      },
    };

    localStorage.setItem('kongo-jwt', JSON.stringify(storeIt));
  }

  _autoLogin() {
    if (typeof (Storage) !== 'undefined') {
      let jwt;
      const jsonJWT = localStorage.getItem('kongo-jwt');

      if (jsonJWT) {
        jwt = JSON.parse(jsonJWT);
      }

      if (jwt && jwt.header) {
        const now = Math.floor(Date.now() / 1000);
        const exp = jwtDecode(jwt.header['kogno-token']).exp;
        const timeFromLastRefresh = (now - jwt.header.storeTime) / 60 / 60;

        if (now >= exp) {
          if (this.isLoggedIn()) {
            this._logout();
            // TODO
            browserHistory.push('/login');
          } else {
            this._clearStore();
            // TODO
            browserHistory.push('/login');
          }
        } else {
          this._jwt = jwt.header['kogno-token'];
          this._user = jwt.userData;

          if (timeFromLastRefresh >= 24) {
            //this._refreshJWT();
          } else {
            this.emitChange();
          }
        }
      }
    }
  }

  _updateUserData(field, data) {
    const jsonJWT = localStorage.getItem('kongo-jwt');
    if (jsonJWT) {
      const jwt = JSON.parse(jsonJWT);
      jwt.userData[field] = data;
      localStorage.setItem('kongo-jwt', JSON.stringify(jwt));
      this._user[field] = data;
    }
  }

  _clearStore() {
    this._user = null;
    this._error = null;
    this._jwt = null;
    if (typeof (Storage) !== 'undefined') {
      localStorage.removeItem('kongo-jwt');
    }
  }

  _logout() {
    this._clearStore();
    this.emitChange();
  }

  /**
   * clearJwtStore: Call when UNAUTHORIZE
   * and din't dispatch automatically to LOGOUT_SUCCESS
   * So clear jwt and store manually, Only calling from Logout component
   */
  clearJwtStore() {
    this._clearStore();
  }

  updateNewData(action) {
    const user = action.data.user;
    const data = {
      _id: user._id,
      userId: user._id,
      email: user.email,
      fullName: user.fullName,
      country: user.country,
      about: user.about,
      role: user.role,
      sales: user.sales
    }
    this.updateUser(data);
  }

  updateUser(data) {
    let jwtData = localStorage.getItem('kongo-jwt');
    if (jwtData) {
      jwtData = JSON.parse(jwtData);
      jwtData.userData = data;
      localStorage.setItem('kongo-jwt', JSON.stringify(jwtData));
      this._user = data;
    }
  }

  

  get user() {
    return deepCopy(this._user);
  }

  get error() {
    return deepCopy(this._error);
  }

  get jwt() {
    return deepCopy(this._jwt);
  }

  get redirection() {
    return {
      ok: !!this._redirectionUrl,
      url: localStorage.getItem('ALRU'),
    };
  }

  isLoggedIn() {
    return !!this._user;
  }
}

export default new AuthStore();
