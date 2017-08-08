import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import QueryString from 'query-string';

import Helmet from 'react-helmet'
import RegisterActionCreator from '../../actions/RegisterActionCreator';
import RegistrationStore from '../../stores/RegistrationStore';
import AuthStore from '../../stores/AuthStore';
import ActionTypes from '../../constants/ActionTypes';

import Config from '../../config/Config';

//import Validation from './Validation';

class ForgotStep2 extends Component {

	constructor(props) {
		super(props);

		const query = QueryString.parse(this.props.location.search);
		console.log('query', query)
		const id = query.id;
		const code = query.code;

		this.state = {
			id,
			code,

			form: {
				password: '',
				errors: {
					password: '',
				},
				valid: {
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

		let { form } = this.state;
		let { valid, errors } = form;

		switch(fieldName) {			
			case 'password':
				valid.password = value.length >= 1;
				errors.password = valid.password ? '': ' is too short';
				break;
			default:
				break;

		}
		form.valid = valid
		form.errors = errors

		let isValid = true;
		for(let f in valid) {
			if(!valid[f]) isValid = false;
		}
		this.setState({formValid: isValid});
	}

	errorClass(error) {
		if (!error) return;
		return(error.length === 0 ? '' : 'has-error');
	}

	// static propTypes = {
	// 	id: PropTypes.string.isRequired,
	// 	code: PropTypes.string.isRequired
	// }

	componentDidMount() {
		const { code, id } = this.state;
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

		console.log('ActionTypes', ActionTypes)
		const action = RegistrationStore.getLastAction();
		const error = RegistrationStore.error;

		if (action && action.type === ActionTypes.RESET_PASSWORD_SUCCESS) {
			this.props.history.push('/login')

		} else if (action && (action.type === ActionTypes.RESET_PASSWORD_ERROR) ) {
			this.setState({
				errorMsg: error,
			})
		}
	}

	handleSubmit = (e) => {
		e.preventDefault();

		if (!this.state.formValid) {
			this.setState({
				errorMsg: "Please enter password",
			})
			return;
		}

		this.setState({
			loading: true,
		});

		const { code, id, form } = this.state;
		const data = {	
			code,		
			password: form.password
		}

		RegisterActionCreator.resetPassword(id, data);
	}

	render() {

		const { form, loading, errorMsg, showForm } = this.state

		return (
			<div className="signup-block">
				<div className='container'>
					<form onSubmit={this.handleSubmit}>
						<h1 className='col-sm-12 text-center heading-1'>{'Restablece tu contraseña'}</h1>
						<h2 className='col-sm-12 text-center'>{''}</h2>
						<div className='col-sm-12 form'>
							<div className='center'>
								{errorMsg && <div className="text-danger">{errorMsg}</div>}
								<div className="form-group">
									<div className={`form-group ${this.errorClass(form.errors.password)}`}>
										<input
											type="password"
											className="form-control"
											placeholder="password"
											name="password"
											value={form.password}
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

			</div>
		);
	}
}

export default ForgotStep2;

