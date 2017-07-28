import React, { Component, PropTypes } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Helmet from 'react-helmet'

import AuthActionCreator from '../../actions/AuthActionCreator';
import AuthStore from '../../stores/AuthStore';
import ActionTypes from '../../constants/ActionTypes';

import Validation from './LoginValidation';


class LoginPage extends Component {
	constructor () {
		super();
		this.state = {
			email: '',
			password: '',
			formErrors: {email: '', password: ''},
			emailValid: false,
			passwordValid: false,
			formValid: false,
			loading: false,
			errorMsg: false
		}
	}


	handleUserInput = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		this.setState({[name]: value}, () => { this.validateField(name, value) });
	}

	validateField(fieldName, value) {
		let validation = Validation(this.state, fieldName, value);

		this.setState({ ...validation }, this.validateForm);
	}

	validateForm() {
		this.setState({formValid: this.state.emailValid && this.state.passwordValid});
	}

	errorClass(error) {
		return(error.length === 0 ? '' : 'has-error');
	}

	static doLogin (email, password) {
		AuthActionCreator.loginUser(email, password);
	}

	componentDidMount() {
		const isLoggedIn = AuthStore.isLoggedIn();
		AuthStore.addChangeListener(this.handleLoginChange);
		if (isLoggedIn) {
			this.props.history.push('/')
		}
	}

	componentWillUnmount() {
		AuthStore.removeChangeListener(this.handleLoginChange);
	}

	handleLoginChange = () => {
		const action = AuthStore.getLastAction();
		const error = AuthStore.error;

		if (action && action.type === ActionTypes.REQUEST_LOGIN_USER_SUCCESS) {
			this.props.history.push('/')

		} else if (action && (action.type === ActionTypes.REQUEST_LOGIN_USER_ERROR || action.type === ActionTypes.UNAUTHORIZED_USER) ) {
			this.setState({
				errorMsg: error,
			})
		}

		this.setState({
			loading: false,
		});
	}

	handleSubmit = (e) => {

		e.preventDefault();

		if (this.state.formValid) {
			//this.showLoader();
			this.setState({
				loading: true,
			});

			const { email, password } = this.state;
			LoginPage.doLogin(email, password);
		}
	}


	render() {
		const { errorMsg, loading, email, password, formErrors } =  this.state;

		return (
			<div className="login-block">
				<Helmet title="Login" />
			</div>
		);
	}
}

export default LoginPage;
