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

		this.validateForm = this.validateForm.bind(this);
		this.validateField = this.validateField.bind(this);
		this.errorClass = this.errorClass.bind(this);
		this.handleUserInput = this.handleUserInput.bind(this);
		this.handleLoginChange = this.handleLoginChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

		this.state = {
			showForm: true,

			form: {
				email: '',
				password: '',
				errors: {
					email: '',
					password: '',
				},
				valid: {
					email: false,
					password: false,
				},

				formValid: false,

				loading: false,
				errorMsg: false
			}
		};
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

	handleUserInput(e) {
		const name = e.target.name;
		let value = e.target.value;

		let { form } = this.state;
		form[name] = value;
		this.setState({ form }, () => { this.validateField(name, value) });
	}

	validateField(fieldName, value) {
		let validation = Validation(this.state, fieldName, value);
		this.validateForm();
	}

	validateForm() {
		const form = this.state.form;
		let { valid } = form;
		let isValid = true;
		for(let f in valid) {
			if(!valid[f]) isValid = false;
		}
		this.setState({formValid: isValid});
	}

	errorClass(error) {
		return(error.length === 0 ? '' : 'has-error');
	}

	handleLoginChange() {
		const action = AuthStore.getLastAction();
		const error = AuthStore.error;

		if (action && action.type === ActionTypes.REQUEST_LOGIN_USER_SUCCESS) {
			this.setState({
				errorMsg: null,
			})
			if (action.data.respData.user.role === 'ADMIN') {
				this.props.history.push('/admin/servicios');
				return;
			}
			if (action.data.respData.user.sales === 0) {
				this.props.history.push('/areas');
			} else {
				this.props.history.push('/servicios');
			}
		} else if (action && (action.type === ActionTypes.REQUEST_LOGIN_USER_ERROR || action.type === ActionTypes.UNAUTHORIZED_USER) ) {
			this.setState({
				errorMsg: error,
			})
		}

		this.setState({
			loading: false,
		});
	}

	handleSubmit(e) {

		
		e.preventDefault();

		const form = this.state.form;

		if (!this.state.formValid) {
			return;
		}

		this.setState({
			loading: true,
		});


		const { email, password } = form;

		const data = {
			email,
			password,
		}
		LoginPage.doLogin(email, password);
	}


	render() {
		const { form, loading, errorMsg, showForm } = this.state

		return (
			<div className="login-block">
				{this.state.showForm &&
					<div className='container'>
						<h1 className='col-sm-12 text-center heading-1'>{'Ingresa a tu cuenta'}</h1>
						<div className='col-sm-12 form'>
							<form className='' onSubmit={this.handleSubmit}>
								<div className='center'>
									{errorMsg &&
										<div className="text-danger m-b-10">Invalid email or password</div>
									}
									<div className="form-group">
										<div className={`form-group ${this.errorClass(form.errors.email)}`}>
										    <input
										    	type="email"
										    	className="form-control"
										    	placeholder="Email"
												name="email"
												value={form.email}
												onChange={this.handleUserInput}
										   	/>
									   	</div>
									</div>
									<div className="form-group">
										<div className={`form-group ${this.errorClass(form.errors.password)}`}>
										  <input
										  	type="password"
										  	className="form-control"
										  	placeholder="Clave"
										  	name="password"
											value={form.password}
											onChange={this.handleUserInput}
										  />
										</div>
									</div>
									<button type="submit" className="btn btn-success col-100">
										{'Continuar'}
									</button>
									<p className='text-center'>
									 	{'¿Eres nuevo?  '}
									 	<Link to='/signup'>
									 		{'Crea tu cuenta'}
									 	</Link>
									 </p>
									 <p className='text-center t-8'>
									 	<Link to='/forgot'>
									 		{'¿Olvidaste tu clave?'}
									 	</Link>
									 </p>
								</div>
							</form>
						</div>
					</div>
				}
				{!this.state.showForm &&
					<div className='container message'>
						<h1 className='col-sm-12 text-center'>{'¡Has tomado la decisión correcta!'}</h1>
						<div className='col-sm-12 form'>
							<p>{'Te hemos enviado el link para activar tu cuenta. Revisa tu email'}</p>
							<small>{'Si no lo ves en tu inbox, revisa la bandeja de spam'}</small>
						</div>
					</div>
				}
			</div>
		);
	}
}

export default LoginPage;
