import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet';

import AuthActionCreator from '../../actions/AuthActionCreator';
import AuthStore from '../../stores/AuthStore';
import ActionTypes from '../../constants/ActionTypes';


export default class Logout extends Component {

	componentDidMount() {
		AuthStore.addChangeListener(this.handleLogout);
		AuthActionCreator.logoutUser();
	}

	componentWillUnmount() {
    	AuthStore.removeChangeListener(this.handleLogout);
  	}

	componentWillReceiveProps(nextProps) {
		if (this.props.loading && !nextProps.loading) {
			window.location.href = '/login'
		}
	}

	handleLogout = () => {
		const action = AuthStore.getLastAction();
	    console.log('HANDER LOGOUT', action)
	    if (action) {
	    	if( action.type === ActionTypes.LOGOUT_SUCCESS || action.type === ActionTypes.LOGOUT_FAIL ) {
		    	this.props.history.push('/');
	    	} else {
	    		// action.type === ActionTypes.UNAUTHORIZED_USER
	    		AuthStore.clearJwtStore();
		    	this.props.history.push('/');
	    	}
	    }
	}


	render() {
		return (
			<div>
				<Helmet title="Logging out" />
				<h3>Logging out...</h3>
				<div className='loading'>
					<img src="/images/loading.gif" />
				</div>
			</div>
		)
	}
}
