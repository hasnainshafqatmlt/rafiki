import React, { Component } from 'react';
import Select from 'react-select';
import _ from 'lodash';

import UserStore from '../../stores/UserStore';
import AuthStore from '../../stores/AuthStore';
import UserActionCreator from '../../actions/UserActionCreator';
import ActionTypes from '../../constants/ActionTypes';
import Validation from '../Perfil/Validation';
import {getCountries} from '../../utils/utils';

class Perfil extends Component {

	constructor(props) {
	    super(props);
	    this.onChange = this.onChange.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);
	    this.handleUserInput = this.handleUserInput.bind(this);
	    this.logChange = this.logChange.bind(this);

	    this.state = {
	      user: AuthStore.user,
	      showSuccess: false,
	      selectedCountry: AuthStore.user && AuthStore.user.country ? AuthStore.user.country : null,
	      formErrors: {}
	    };
	}

	componentDidMount() {
		if (_.isEmpty(AuthStore.user) || AuthStore.user.role === 'USER') {
			this.props.history.push('/login');
		}
		window.scrollTo(0,0);
		UserStore.addChangeListener(this.onChange);
	}

	componentWillMount() {
		UserStore.removeChangeListener(this.onChange);
	}

	onChange() {
		const action = UserStore.getLastAction();

		if (action && action.type === ActionTypes.UPDATE_PROFILE_SUCCESS) {
			this.setState({
				user: AuthStore.user,
				showSuccess: true
			});
			const user = action.data.user;
			const data = {
				_id: user._id,
		        userId: user._id,
		        email: user.email,
		        role: this.state.user.role
			}
			AuthStore.updateUser(data);
			window.scrollTo(0,0);
		}
	}

	errorClass(error) {
		if (!_.isEmpty(error)) {
			return(error.length === 0 ? '' : 'has-danger');	
		}
		return '';
	}

	logChange(val) {
  	this.setState({
  		selectedCountry: val ? val.value : val
  	});
	}

	handleUserInput(e) {

		let data;
		if (e) {
			const fieldName = e.target.name;
			const value = e.target.value;

			data = Validation(this.state, fieldName, value);
			this.setState({
				formErrors: data
			})
		} else {
			const formArray = ['email'];
			_.each(formArray, (k) => {
				const v = this.refs[k].value.trim();
				data = Validation(this.state, k, v);
				this.setState({
					formErrors: data
				})
			})
		}
	}

	handleSubmit() {
		
		const email = this.refs.email.value.trim();
		const password = this.refs.password.value.trim();
		const userId = this.state.user._id;
		
		this.handleUserInput()
		
		let isError = false;
		_.find(this.state.formErrors, (val) => {
			if (val.length > 0) {
				isError = true;
			}
			return isError
		})

		const userData = {}

		if (email.length > 0) {
			userData.email = email;
		}
		if (password.length > 0) {
			userData.password = password;
		}

console.log('userData' , userData)
		if (!isError) {
			UserActionCreator.updateProfile(userData, userId);
		}

	}

	render() {
		const {user, selectedCountry, formErrors} = this.state;

		return (
			<div className="perfil-block">
				<div className='container'>
					<h1 className='col-sm-12 text-center heading-1'>{'Mi perfil'}</h1>
					<div className='col-sm-12 form'>
						<div className='center'>
							{this.state.showSuccess &&
								<div className='alert alert-success col-100 m-t-20'>
									{'Profile updated successfully'}
								</div>
							}

							<div className={`form-group ${this.errorClass(formErrors.email)}`}>
							  <input
							  	type="text"
							  	className="form-control text-center"
							  	placeholder="Email"
							  	ref='email'
						    	name='email'
						    	defaultValue={user.email ? user.email : ''}
						    	onKeyUp={this.handleUserInput}
							  />
							  {this.errorClass(formErrors.email) &&
							   	<div className='form-control-feedback'>
							   		{formErrors.email}
							   	</div>
							  }
							</div>
							<div className={`form-group ${this.errorClass(formErrors.password)}`}>
							  <input
							  	type='password'
							  	className="form-control text-center"
							  	placeholder="Clave nueva"
							  	ref='password'
						    	name='password'
							  />
							  {this.errorClass(formErrors.password) &&
							   	<div className='form-control-feedback'>
							   		{formErrors.password}
							   	</div>
							  }
							</div>
							
							
							<button
								type="button"
								className="btn btn-success col-100"
								onClick={() => this.handleSubmit()}
							>
								{'Guardar cambios'}
							</button>
						</div>
					</div>
				</div>

			</div>
		);
	}
}

export default Perfil;

