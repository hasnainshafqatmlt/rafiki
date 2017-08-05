import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import QueryString from 'query-string';

import Helmet from 'react-helmet'
import RegisterActionCreator from '../../actions/RegisterActionCreator';
import RegistrationStore from '../../stores/RegistrationStore';
import AuthStore from '../../stores/AuthStore';
import ActionTypes from '../../constants/ActionTypes';

import Config from '../../config/Config';

import Validation from './Validation';

class ChangePassword extends Component {

	constructor(props) {
		super(props);

		const query = QueryString.parse(this.props.location.search);
		const id = query.id;
		const code = query.code;

		this.state = {
			id,
			code,
			errorMsg: ''
		};
	}

	static propTypes = {
		id: PropTypes.string.isRequired,
		code: PropTypes.string.isRequired
	}

	componentDidMount() {
		const { code, id } = this.state;
		const isLoggedIn = AuthStore.isLoggedIn();
		RegistrationStore.addChangeListener(this.handleStoreChange);

		if (isLoggedIn) {
			this.props.history.push('/')
		} else {
			RegisterActionCreator.registerStep2(id, code);
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

		if (action && action.type === ActionTypes.SIGNUP_STEP2_SUCCESS) {
			this.props.history.push('/login')

		} else if (action && (action.type === ActionTypes.SIGNUP_STEP2_ERROR) ) {
			this.setState({
				errorMsg: error,
			})
		}
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

export default ChangePassword;

