import React, { Component } from 'react';

import RegisterActionCreator from '../../actions/RegisterActionCreator';
import RegistrationStore from '../../stores/RegistrationStore';
import AuthStore from '../../stores/AuthStore';
import ActionTypes from '../../constants/ActionTypes';

class Forgot extends Component {

	constructor(props) {
		super(props);

		this.state = {
			showForm: true,

			form: {
				email: '',
				errors: {
					email: '',
				},
				valid: {
					email: false,
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

		let { valid, errors } = this.state.form;

		valid.email = (/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i).test(value);
		errors.email = valid.email ? '': 'Invalid email';

		console.log('valid, errors', valid, errors)

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

		if (action && action.type === ActionTypes.REQUEST_RESET_PASSWORD_SUCCESS) {
			this.setState({
				showForm: false
			})

		} else if (action && (action.type === ActionTypes.REQUEST_RESET_PASSWORD_ERROR) ) {
			this.setState({
				errorMsg: error,
			})
		}
		console.log('action.type', action.type)
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


		const { email } = form;



		RegisterActionCreator.requestResetPassword({email});
	}

	render() {

		const { form, loading, errorMsg, showForm } = this.state

		return (
			<div className="forgot-block">
				{this.state.showForm &&
					<div className='container'>
						<form onSubmit={this.handleSubmit}>
							<h1 className='col-sm-12 text-center heading-1'>{'Restablece tu contraseña'}</h1>
							<h2 className='col-sm-12 text-center'>{'Te enviaremos un email para restablecerla'}</h2>
							<div className='col-sm-12 form'>
								<div className='center'>
									{errorMsg && <div className="text-danger">{errorMsg}</div>}
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
									<button type="submit" className="btn btn-success col-100">
										{'Enviar'}
									</button>
								</div>
							</div>
						</form>
					</div>
				}
				{!this.state.showForm &&
					<div className='container message'>
						<h1 className='col-sm-12 text-center'>{'Te hemos enviado un link para restablecer tu contraseña'}</h1>
						<div className='col-sm-12 form'>
							<p>{'Revisa tu email'}</p>
							<small>{'Si no lo ves en tu inbox, revisa la bandeja de spam'}</small>
						</div>
					</div>
				}

			</div>
		);
	}
}

export default Forgot;

