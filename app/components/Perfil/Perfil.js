import React, { Component } from 'react';
import _ from 'lodash';
import Select from 'react-select';

import AuthStore from '../../stores/AuthStore';
import UserStore from '../../stores/UserStore';
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
	    this.selectImage = this.selectImage.bind(this);

	    this.state = {
	      user: AuthStore.user,
	      showSuccess: false,
	      showError: false,
	      selectedCountry: AuthStore.user && AuthStore.user.country ? AuthStore.user.country : null,
	      formErrors: {},
	      showImageSizeError: false,
	      imageLoading: false,
	      userImage: AuthStore.user && AuthStore.user.avatar ? AuthStore.user.avatar : ''
	    };
	}

	componentDidMount() {
		window.scrollTo(0,0);
		UserStore.addChangeListener(this.onChange);
		if (_.isEmpty(AuthStore.user) || AuthStore.user.role === 'ADMIN') {
			this.props.history.push('/login');
		}
	}

	componentWillUnmount() {
		UserStore.removeChangeListener(this.onChange);
	}

	onChange() {
		const action = UserStore.getLastAction();

		if (action && action.type === ActionTypes.UPDATE_PROFILE_SUCCESS) {
			this.setState({
				showSuccess: true
			});
			AuthStore.updateNewData(action);
			window.scrollTo(0,0);
		} else if (action.type === ActionTypes.UPLOAD_USER_IMAGE_SUCCESS) {
			this.setState({
				userImage: action.data.user.avatar,
				imageLoading: false
			})
			AuthStore._updateUserData('avatar', action.data.user.avatar);
		} else if (action.type === ActionTypes.UPLOAD_USER_IMAGE_ERROR) {
			this.setState({
				showError: action.error.message,
				imageLoading: false
			});
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

		if (!isError) {
			UserActionCreator.updateProfile(userData, userId);
		}

	}
//const imagePath = URL.createObjectURL(e.target.files[0]);
	selectImage(e) {
		const image = e.target.files[0];
		var _URL = window.URL || window.webkitURL;		
		let file, img;
		let sizeError = false;
		if (image) {
			this.setState({
				imageLoading: true
			});
		    if ((file = e.target.files[0])) {
		        img = new Image();
		        img.onload = function () {
		            if (parseInt(this.width) === 200 && parseInt(this.height) === 200) {
		            } else {
		            	sizeError = true;	            	
		            }
		        };
		        img.src = _URL.createObjectURL(file);
		        setTimeout(() => {
		        	// if (sizeError) {
			        // 	this.setState({
		         //    		showImageSizeError: 'Image size should be 200 x 200',
		         //    		imageLoading: false
		         //    	})
			        // } else {			        	
			        // }
			        this.setState({
	            		showImageSizeError: false
	            	})
	            	UserActionCreator.uploadUserImage(image);
		        }, 500);
		    }
		}
	}

	

	render() {
		const {user, selectedCountry, formErrors} = this.state;
		const userImage = this.state.userImage ? this.state.userImage : '/images/profile-pic.png';

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

							{this.state.showError &&
								<div className='alert alert-danger col-100 m-t-20'>
									{this.state.showError}
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
									{!this.state.imageLoading &&
										<img src={userImage} className={`icon ${this.state.userImage ? 'thumb' : ''}`}/>
									}
									{this.state.imageLoading &&
										<div className="spinner">
										  <div className="rect1"></div>
										  <div className="rect2"></div>
										  <div className="rect3"></div>
										  <div className="rect4"></div>
										  <div className="rect5"></div>
										</div>
									}
								</i>
								<div className='float-left'>
									<h3>{'Foto de perfil o logo'}</h3>
									{/*<p>{'Tamaño preferido: 200x200 px'}</p>*/}
								</div>
								<span>{'Adjuntar'}</span>
								<input
									type='file'
									onChange={this.selectImage}
									accept="image/x-png,image/gif,image/jpeg"
								/>
							</div>
							{this.state.showImageSizeError &&
								<div className='form-group has-danger'>
								   	<div className='form-control-feedback'>
								   		{this.state.showImageSizeError}
								   	</div>
								</div>
							}
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

