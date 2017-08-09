import React, { Component } from 'react';
import _ from 'lodash';
import Select from 'react-select';

import UserStore from '../../stores/UserStore';
import AuthStore from '../../stores/AuthStore';
import UserActionCreator from '../../actions/UserActionCreator';
import ActionTypes from '../../constants/ActionTypes';
import Validation from './Validation';
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
		window.scrollTo(0,0);
		UserStore.addChangeListener(this.onChange);
		if (_.isEmpty(AuthStore.user) || AuthStore.user.role === 'ADMIN') {
			this.props.history.push('/login');
		}
	}

	componentWillMount() {
		UserStore.removeChangeListener(this.onChange);
	}

	onChange() {
		const action = UserStore.getLastAction();

		if (action && action.type === ActionTypes.UPDATE_PROFILE_SUCCESS) {
			this.setState({
				showSuccess: true
			});
			const user = action.data.user;
			const data = {
				_id: user._id,
		        userId: user._id,
		        email: user.email,
		        fullName: user.fullName,
		        country: user.country,
		        about: user.about,
		        role: AuthStore.user.role,
		        sales: user.sales
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
			const formArray = ['fullName', 'country', 'about', 'email'];
			_.each(formArray, (k) => {
				let v;
				if (k === 'country') {
					v = this.state.selectedCountry;	
				} else {
					v = this.refs[k].value.trim();
				}
				data = Validation(this.state, k, v);
				this.setState({
					formErrors: data
				})
			})
		}
	}

	handleSubmit() {
		const fullName = this.refs.fullName.value.trim();
		const country = this.state.selectedCountry;		
		const about = this.refs.about.value.trim();
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

		if (fullName.length > 0) {
			userData.fullName = fullName;
		}
		if (country.length > 0) {
			userData.country = country;
		}
		if (about.length > 0) {
			userData.about = about;
		}
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
					<h2 className='col-sm-12 text-center'>{'Aquí puedes actualizar tus datos'}</h2>					
					<div className='col-sm-12 form'>
						<div className='center'>
							{this.state.showSuccess &&
								<div className='alert alert-success col-100 m-t-20'>
									{'Profile updated successfully'}
								</div>
							}
							<div className={`form-group ${this.errorClass(formErrors.fullName)}`}>
								<input
						    	type="text"
						    	className="form-control"
						    	placeholder="Nombre"
						    	ref='fullName'
						    	name='fullName'
						    	defaultValue={user.fullName ? user.fullName : ''}
						    	onKeyUp={this.handleUserInput}
						   	/>
						   	{this.errorClass(formErrors.fullName) &&
							   	<div className='form-control-feedback'>
							   		{formErrors.fullName}
							   	</div>
							  }
							</div>
							<div className={`form-group ${this.errorClass(formErrors.country)}`}>
								<Select
								  name="form-field-name"
								  placeholder={user.country ? user.country : 'Tu País'}
								  value={selectedCountry}	
								  options={getCountries()}
								  onChange={this.logChange}
								/>
								{this.errorClass(formErrors.country) &&
							   	<div className='form-control-feedback'>
							   		{formErrors.country}
							   	</div>
							  }
							  
							</div>
							<div className={`form-group ${this.errorClass(formErrors.about)}`}>
						    <textarea
						    	className="form-control"
						    	placeholder="ACERCA DE TI.  Por ejemplo: 
								-años de experiencia
								-que te apasiona
								-en que area tienes tu mayor conocimiento"
									ref='about'
						    	name='about'
						    	defaultValue={user.about ? user.about : ''}
						    	onKeyUp={this.handleUserInput}
						   	/>
						   	{this.errorClass(formErrors.about) &&
							   	<div className='form-control-feedback'>
							   		{formErrors.about}
							   	</div>
							  }
							</div>
							<div className='upload-pic'>
								<i>
									<img src='/images/profile-pic.png' className='icon'/>
								</i>
								<div className='float-left'>
									<h3>{'Foto de perfil o logo'}</h3>
									<p>{'Tamaño preferido: 200x200 px'}</p>
								</div>
								<span>{'Adjuntar'}</span>
								<input type='file'/>
							</div>

							<div className={`form-group ${this.errorClass(formErrors.email)}`}>
							  <input
							  	type="text"
							  	className="form-control"
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
							  	className="form-control"
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

