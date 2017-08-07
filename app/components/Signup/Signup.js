import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Helmet from 'react-helmet'
import RegisterActionCreator from '../../actions/RegisterActionCreator';
import RegistrationStore from '../../stores/RegistrationStore';
import AuthStore from '../../stores/AuthStore';
import ActionTypes from '../../constants/ActionTypes';

import Config from '../../config/Config';

import Validation from './Validation';

class Signup extends Component {

	constructor(props) {
		super(props);

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

	handleUserInput = (e) => {
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

	componentDidMount() {
		const { location, routes } = this.props;
		const isLoggedIn = AuthStore.isLoggedIn();
		RegistrationStore.addChangeListener(this.handleStoreChange);

		if (isLoggedIn) {
			this.props.history.push('/')
		}
	}

	componentWillUnmount() {
		RegistrationStore.removeChangeListener(this.handleStoreChange);
	}

	handleStoreChange = () => {
		this.setState({
			loading: false,
		});

		const action = RegistrationStore.getLastAction();
		const error = RegistrationStore.error;

		if (action && action.type === ActionTypes.SIGNUP_USER_SUCCESS) {
			this.setState({
				showForm: false
			})

		} else if (action && (action.type === ActionTypes.SIGNUP_USER_ERROR) ) {
			window.scrollTo(0, 0);
			this.setState({
				errorMsg: error,
			})
		}
	}

	handleSubmit = (e) => {
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

		RegisterActionCreator.registerStep1(data);
	}

	render() {

		const { form, loading, errorMsg, showForm } = this.state

		return (
			<div className="signup-block">
				{showForm &&
					<div className='container'>
						<form onSubmit={this.handleSubmit}>
							<h1 className='col-sm-12 text-center heading-1'>{'Abre tu cuenta, es gratis!'}</h1>
							<div className='col-sm-12 form'>
								<div className='center'>
									{errorMsg && <div className='alert alert-danger'>
										{errorMsg}
									</div>
									}
									<div className={`form-group ${this.errorClass(form.errors.email)}`}>
										<input
											type="email"
											placeholder="email@example.com"
											className="form-control"
											name="email"
											value={form.email}
											onChange={this.handleUserInput}
										/>
									</div>
									<div className={`form-group ${this.errorClass(form.errors.password)}`}>
										<input
											type="password"
											placeholder="Clave"
											className="form-control"
											name="password"
											value={form.password}
											onChange={this.handleUserInput}
										/>
									</div>


									<button type="submit"
										className="btn btn-success col-100"
										disabled={loading}
									>
										{'Crear cuenta'}
									</button>
									<p className='text-center'>
									 	{'¿Ya tienes cuenta?  '}
									 	<Link to='/login'>
									 		{'Iniciar sesión'}
									 	</Link>
									 </p>
								</div>
							</div>
						</form>
					</div>
				}
				{!showForm &&
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

export default Signup;

