import React, { Component } from 'react';
import _ from 'lodash';
import Select from 'react-select';

import ServiciosStore from '../../stores/ServiciosStore';
import AuthStore from '../../stores/AuthStore';
import ServiciosActionCreator from '../../actions/ServiciosActionCreator';
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

	    this.state = {
	      showForm: true,
	      user: AuthStore.user,
	      selectedCountry: AuthStore.user && AuthStore.user.country ? AuthStore.user.country : null,
	      formErrors: {},
	      service: ServiciosStore.getServiceDescription
	    };
	}

	componentDidMount() {
		window.scrollTo(0,0);
		if (_.isEmpty(ServiciosStore.getSelectedCategory)) {
			this.props.history.push('/areas');
		}
		ServiciosStore.addChangeListener(this.onChange);
	}

	componentWillMount() {
		ServiciosStore.removeChangeListener(this.onChange);
	}

	onChange() {
		const action = ServiciosStore.getLastAction();

		if (action && action.type === ActionTypes.SET_SERVICE_DESCRIPTION) {
			this.props.history.push('/vistaPrevia');
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
			const formArray = ['title', 'description', 'price', 'fullName', 'country', 'about'];
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
		const price = this.refs.price.value.trim();
		
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

		if (!isError) {
			if (_.isEmpty(user)) {
				ServiciosActionCreator.updateProfile(userData, userId);
			}

			const serviceData = {
				title,
				description,
				price
			}
			ServiciosActionCreator.setServiceDescription(serviceData);
		}
	}

	errorClass(error) {
		if (!_.isEmpty(error)) {
			return(error.length === 0 ? '' : 'has-danger');	
		}
		return '';
		
	}

	render() {
		const {user, selectedCountry, formErrors, service} = this.state;
		const fullNameDisable = user.fullName ? true : false;
		const countryDisable = user.country ? true : false;
		const aboutDisable = user.about ? true : false;

		return (
			<div className="description-block">
				{this.state.showForm &&
					<div className='container'>
						<h1 className='col-sm-12 text-center heading-1'>{'Describe de tu servicio'}</h1>
						<h2 className='col-sm-12 text-center'>{'Entre más específico seas, más clientes tendrás'}</h2>
						<div className='col-sm-12 form'>
							<div className='center'>
								<div className={`form-group ${this.errorClass(formErrors.title)}`}>
								    <input
								    	type="text"
								    	className={`form-control`}
								    	placeholder="TÍTULO:  por ejemplo “Soy tu Social Media Manager”"
								    	defaultValue={service ? service.title : ''}
								    	ref='title'
								    	name='title'
								    	onKeyUp={this.handleUserInput}
								   	/>
								   	{this.errorClass(formErrors.title) &&
									   	<div className='form-control-feedback'>
									   		{formErrors.title}
									   	</div>
									  }
								</div>
								<div className={`form-group ${this.errorClass(formErrors.description)}`}>
								    <textarea
								    	className={`form-control`}
								    	placeholder="DESCRIPCIÓN: 
										que incluye, que lo hace especial, requisitos,
										tiempo de entrega, etc."
											defaultValue={service ? service.description : ''}
											ref='description'
											name='description'
											onKeyUp={this.handleUserInput}

								   	/>
								   	{this.errorClass(formErrors.description) &&
									   	<div className='form-control-feedback'>
									   		{formErrors.description}
									   	</div>
									  }
								</div>
								<div className={`form-group ${this.errorClass(formErrors.price)}`}>
								  	<div className='col-lg-6 col-md-6 col-sm-12 row'>
									  <input
									  	type='number'
									  	className={`form-control sm `}
									  	placeholder="Precio en USD $"
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
								  <input
								  	type="text"
								  	className={`form-control`}
								  	placeholder='Tu Nombre'
								  	defaultValue={user.fullName}
								  	ref='fullName'
								  	name='fullName'
								  	onKeyUp={this.handleUserInput}
								  	readOnly={fullNameDisable}
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
									  disabled={countryDisable}
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
								    	ref='about'
								    	name='about'
								    	className={`form-control`}
								    	readOnly={aboutDisable}
								    	placeholder='ACERCA DE TI: Por ejemplo años de experiencia, en que área es tu mayor conocimiento,que te apasiona'
								    	defaultValue={user.about}
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

