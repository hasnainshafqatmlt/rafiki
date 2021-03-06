import React, { Component } from 'react';
import _ from 'lodash';
import Select from 'react-select';

import ServiciosStore from '../../stores/ServiciosStore';
import AuthStore from '../../stores/AuthStore';
import ServiciosActionCreator from '../../actions/ServiciosActionCreator';
import UserActionCreator from '../../actions/UserActionCreator';
import UserStore from '../../stores/UserStore';
import ActionTypes from '../../constants/ActionTypes';
import {getCountries} from '../../utils/utils';
import Validation from './Validation';



class Description extends Component {

	constructor(props) {
	    super(props);
	    this.logChange = this.logChange.bind(this);
	    this.handleContinue = this.handleContinue.bind(this);
	    this.onChange = this.onChange.bind(this);
	    this.handleUserInput = this.handleUserInput.bind(this);
	    this.onAuthChange = this.onAuthChange.bind(this);
	    this.selectImage = this.selectImage.bind(this);
	    this.onUserChange = this.onUserChange.bind(this);
	    this.selectVisible = this.selectVisible.bind(this);

	    this.state = {
	      showForm: true,
	      showError: false,
	      postService: '',
	      user: AuthStore.user,
	      selectedCountry: AuthStore.user && AuthStore.user.country ? AuthStore.user.country : null,
	      formErrors: {},
	      service: ServiciosStore.getServiceDescription,
	      showImageSizeError: false,
	      imageLoading: false,
	      userImage: AuthStore.user && AuthStore.user.avatar ? AuthStore.user.avatar : '',
	      userImageError: '',
	      visibleValue: this.props.match.params.serviceId ? ServiciosStore.getServiceDescription.visible : 'visible'
	    };
	}

	componentDidMount() {
		window.scrollTo(0,0);
		if (_.isEmpty(ServiciosStore.getSelectedCategory)) {
			this.props.history.push('/areas');
		}
		if (_.isEmpty(AuthStore.user) || AuthStore.user.role === 'ADMIN') {
			this.props.history.push('/login');
		}
		ServiciosStore.addChangeListener(this.onChange);
		AuthStore.addChangeListener(this.onAuthChange);
		UserStore.addChangeListener(this.onUserChange);
	}

	componentWillUnmount() {
		ServiciosStore.removeChangeListener(this.onChange);
		AuthStore.removeChangeListener(this.onAuthChange);
		UserStore.removeChangeListener(this.onUserChange);
	}

	onChange() {
		const action = ServiciosStore.getLastAction();

		if (action && action.type === ActionTypes.SET_SERVICE_DESCRIPTION) {
			if (this.props.match.params.serviceId) {
				this.props.history.push(`/vistaPrevia/${this.props.match.params.serviceId}`);
			} else {
				this.props.history.push('/vistaPrevia');
			}			
		}
	}

	onAuthChange() {
		const action = AuthStore.getLastAction();
		if (action && action.type === ActionTypes.UPDATE_PROFILE_SUCCESS) {
			AuthStore.updateNewData(action);
			setTimeout(() => {
				ServiciosActionCreator.setServiceDescription(this.state.postService);
			}, 10);
		}
	}

	onUserChange() {
		const action = AuthStore.getLastAction();
		if (action) {
			if (action.type === ActionTypes.UPLOAD_USER_IMAGE_SUCCESS) {
				this.setState({
					userImage: action.data.user.avatar,
					imageLoading: false,
					userImageError: ''
				})
				AuthStore._updateUserData('avatar', action.data.user.avatar);
			} else if (action.type === ActionTypes.UPLOAD_USER_IMAGE_ERROR) {
				this.setState({
					showError: action.error.message,
					imageLoading: false
				});
			}
		}
	}

	logChange(val) {
	  	this.setState({
	  		selectedCountry: val ? val.value : val
	  	});
	}

	handleUserInput(e) {
		const user = this.state.user;

		const title = this.refs.title.value.trim();
		const description = this.refs.description.value.trim();
		const serviceList = this.refs.serviceList.value.trim();
		const serviceTime = this.refs.serviceTime.value.trim();
		const price = this.refs.price.value.trim();

		const fullName = this.refs.fullName.value.trim();
		const country = this.state.selectedCountry;		
		const about = this.refs.about.value.trim();
		let data;
		if (e) {
			const fieldName = e.target.name;
			const value = e.target.value;

			data = Validation(this.state, fieldName, value);
			this.setState({
				formErrors: data
			})
		} else {
			const formArray = ['title', 'description','serviceList', 'serviceTime', 'price', 'fullName', 'country', 'about', 'url'];
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

	handleContinue() {
		const user = this.state.user;
		let formErrors = this.state.formErrors;

		const country = this.state.selectedCountry;
		const fullName = this.refs.fullName.value.trim();
		const about = this.refs.about.value.trim();
		const userId = this.state.user._id;
		const title = this.refs.title.value.trim();
		const description = this.refs.description.value.trim();
		const serviceList = this.refs.serviceList.value.trim();
		const serviceTime = this.refs.serviceTime.value.trim();
		const price = this.refs.price.value.trim();
		const url = this.refs.url.value.trim();
		const visible = this.state.visibleValue;

		const userData = {
			fullName,
			country,
			about
		}
		this.handleUserInput()

		let isError = false;
		_.find(this.state.formErrors, (val) => {
			if (val.length > 0) {
				isError = true;
			}
			return isError
		})

		let imageError = false;
		if (this.state.userImage === '') {
			imageError = true;
			this.setState({
				userImageError: 'Please select Image'
			});
		} else {
			this.setState({
				userImageError: ''
			});
		}

		if (!isError && !imageError) {
			const serviceData = {
				title,
				description,
				price,
				serviceList,
				serviceTime,
				url,
				visible
			}

			if (_.isEmpty(user.fullName) || _.isEmpty(user.country) || _.isEmpty(user.about) || user.fullName !== fullName || user.country !== country || user.about !== about) {
				UserActionCreator.updateProfile(userData, userId);
				this.setState({
					postService: serviceData
				});
			} else {
				ServiciosActionCreator.setServiceDescription(serviceData);
			}
		}
	}

	errorClass(error) {
		if (!_.isEmpty(error)) {
			return(error.length === 0 ? '' : 'has-danger');	
		}
		return '';		
	}

	selectVisible(e) {
		this.setState({
			visibleValue: e.target.value
		});
	}

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
		            	console.log('upload image')
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
		const {user, selectedCountry, formErrors, service} = this.state;
		let isVisible = service.visible === 'visible' ? true : false;
		const isInVisible = service.visible === 'invisible' ? true : false;
		if (!this.props.match.params.serviceId) {
			isVisible = this.state.visibleValue;
		}

		// const fullNameDisable = user && user.fullName ? true : false;
		// const countryDisable = user && user.country ? true : false;
		// const aboutDisable = user && user.about ? true : false;

		const fullNameDisable = false;
		const countryDisable = false;
		const aboutDisable = false;

		const userImage = this.state.userImage ? this.state.userImage : '/images/profile-pic.png';

		return (
			<div className="description-block">
				{this.state.showForm &&
					<div className='container'>
						<h1 className='col-sm-12 text-center heading-1'>{'Describe tu servicio'}</h1>
						<h2 className='col-sm-12 text-center'>{'Entre más específico seas, más clientes tendrás'}</h2>
						<div className='col-sm-12 form'>
							<div className='center'>
								<div className={`form-group ${this.errorClass(formErrors.title)}`}>
								    <label>
								    	{`TÍTULO:  por ejemplo “Aumento tus ventas, o Genero más seguidores en FB,  o Posiciono tu sitio en Google con SEO Y SEM”`}
								    </label>
								    <input
								    	type="text"
								    	className={`form-control`}
								    	defaultValue={service ? service.title : ''}
								    	ref='title'
								    	name='title'
								    	onKeyUp={this.handleUserInput}
								    	maxLength='70'
								   	/>
								   	{this.errorClass(formErrors.title) &&
									   	<div className='form-control-feedback'>
									   		{formErrors.title}
									   	</div>
									  }
								</div>
								<div className={`form-group ${this.errorClass(formErrors.description)}`}>
								    <label>
								    	{'DESCRIPCIÓN: por ejemplo que es, que lo hace especial, requisitos'}
								    </label>
								    <textarea
								    	className={`form-control`}
										defaultValue={service ? service.description : ''}
										ref='description'
										name='description'
										onKeyUp={this.handleUserInput}
										maxLength='3000'
								   	/>
								   	{this.errorClass(formErrors.description) &&
									   	<div className='form-control-feedback'>
									   		{formErrors.description}
									   	</div>
									  }
								</div>
								<div className={`form-group ${this.errorClass(formErrors.serviceList)}`}>
								    <label>
								    	{`LISTA TODO LO QUE INCLUYE:  por ejemplo “Entrego 5 Facebook posts, 10 campañas AdWords, 5 Landing Pages, 1 reporte semanal” `}
								    </label>
								    <textarea
								    	className={`form-control`}
										defaultValue={service ? service.serviceList : ''}
										ref='serviceList'
										name='serviceList'
										onKeyUp={this.handleUserInput}
										maxLength='3000'
								   	/>
								   	{this.errorClass(formErrors.serviceList) &&
									   	<div className='form-control-feedback'>
									   		{formErrors.serviceList}
									   	</div>
									  }
								</div>
								<div className={`form-group ${this.errorClass(formErrors.serviceTime)}`}>
								    <label>
								    	{'POR CUANTO TIEMPO: por ejemplo “brindo este servicio por 1 mes”'}
								    </label>
								    <input
								    	type="text"
								    	className={`form-control`}
								    	defaultValue={service ? service.serviceTime : ''}
								    	ref='serviceTime'
								    	name='serviceTime'
								    	onKeyUp={this.handleUserInput}
								    	maxLength='70'
								   	/>
								   	{this.errorClass(formErrors.serviceTime) &&
									   	<div className='form-control-feedback'>
									   		{formErrors.serviceTime}
									   	</div>
									  }
								</div>
								<div className={`form-group ${this.errorClass(formErrors.price)}`}>
								  	<div className='col-lg-6 col-md-6 col-sm-12 row'>
									  <label>{'Precio en USD $'}</label>
									  <input
									  	type='number'
									  	className={`form-control sm `}
									  	defaultValue={service ? service.price : ''}
									  	ref='price'
									  	name='price'
									  	onKeyUp={this.handleUserInput}
									  />
									  {this.errorClass(formErrors.price) &&
									   	<div className='form-control-feedback'>
									   		{formErrors.price}
									   	</div>
									  }
									</div>
								</div>
								<div className={`form-group ${this.errorClass(formErrors.fullName)}`}>
								  <label>{'Tu Nombre'}</label>
								  <input
								  	type="text"
								  	className={`form-control`}
								  	defaultValue={user && user.fullName ? user.fullName : ''}
								  	ref='fullName'
								  	name='fullName'
								  	onKeyUp={this.handleUserInput}
								  	readOnly={fullNameDisable}
								  	maxLength='30'
								  />
								  {this.errorClass(formErrors.fullName) &&
								   	<div className='form-control-feedback'>
								   		{formErrors.fullName}
								   	</div>
								  }
								</div>
								<div className={`form-group ${this.errorClass(formErrors.country)}`}>
									<label>{'Tu País'}</label>
									<Select
									  name="form-field-name"
									  placeholder={user && user.country ? user.country : 'Tu País'}
									  value={selectedCountry}	
									  options={getCountries()}
									  onChange={this.logChange}
									  disabled={countryDisable}
									/>
									{this.errorClass(formErrors.country) &&
								   	<div className='form-control-feedback'>
								   		{formErrors.country}
								   	</div>
								  }
								  
								</div>
								<div className={`form-group ${this.errorClass(formErrors.about)}`}>
								    <label>{'ACERCA DE TI: Por ejemplo años de experiencia, en que área es tu mayor conocimiento, estudios'}</label>
								    <textarea
								    	className="form-control"
								    	ref='about'
								    	name='about'
								    	className={`form-control`}
								    	defaultValue={user && user.about ? user.about : ''}
								    	onKeyUp={this.handleUserInput}
								    	readOnly={aboutDisable}
								   	/>
								   	{this.errorClass(formErrors.about) &&
									   	<div className='form-control-feedback'>
									   		{formErrors.about}
									   	</div>
									  }
								</div>

								<div className={`form-group ${this.errorClass(formErrors.url)}`}>
								    <label>{'URL de tu perfil de LinkedIn o tu sitio web'}</label>
								    <input
								    	type="text"
								    	className={`form-control`}
								    	defaultValue={service ? service.url : ''}
								    	ref='url'
								    	name='url'
								    	onKeyUp={this.handleUserInput}
								   	/>
								   	{this.errorClass(formErrors.url) &&
									   	<div className='form-control-feedback'>
									   		{formErrors.url}
									   	</div>
									  }
								</div>

								<div className={`form-group`}>
									<div className='form-check form-check-inline'>
										<label className="form-check-label">
											<input
											className="form-check-input"
											type="radio"
											name="visible" 
											ref='visible'
											value="visible"
											defaultChecked={isVisible}
											onClick={this.selectVisible}
											/>
											{' Visible a clientes'}
										</label>
									</div>
									<div className='form-check form-check-inline'>
										<label className="form-check-label">
											<input
											className="form-check-input"
											type="radio"
											name="visible" 
											ref='visible'
											value="invisible"
											defaultChecked={isInVisible}
											onClick={this.selectVisible}
											/>
											{' Invisible / privado'}
										</label>
									</div>
								</div>

								<div className={`form-group upload-pic ${this.state.userImageError ? 'has-danger' : ''}`}>
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
										{this.state.userImage &&
											<h3>{'Tu foto ha sido adjuntada'}</h3>
										}
										{!this.state.userImage &&
											<div>
												<h3>{'Foto de perfil o logo'}</h3>
											</div>
										}
									</div>
									<span>{'Adjuntar'}</span>
									<input
										type='file'
										onChange={this.selectImage}
										accept='image/x-png,image/gif,image/jpeg'
									/>
									{this.state.userImageError &&
										<div className='form-control-feedback float-left w-100'>{this.state.userImageError}</div>
									}
								</div>
								{this.state.showImageSizeError &&
									<div className='form-group has-danger'>
									   	<div className='form-control-feedback'>
									   		{this.state.showImageSizeError}
									   	</div>
									</div>
								}
								<button
									type="button"
									className="btn btn-success col-100"
									onClick={this.handleContinue}
								>
									{'Continuar'}
								</button>
							</div>
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

export default Description;

