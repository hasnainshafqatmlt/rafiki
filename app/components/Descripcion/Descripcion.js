import React, { Component } from 'react';
import AreasStore from '../../stores/AreasStore';
import AuthStore from '../../stores/AuthStore';
import DescripcionActionCreator from '../../actions/DescripcionActionCreator';
import {getCountries} from '../../utils/utils';
import _ from 'lodash';
import Select from 'react-select';


class Description extends Component {

	constructor(props) {
	    super(props);
	    this.logChange = this.logChange.bind(this);
	    this.handleContinue = this.handleContinue.bind(this);

	    this.state = {
	      showForm: true,
	      selectedCategories: AreasStore.getAreas,
	      user: AuthStore.user,
	      selectedCountry: null
	    };
	}

	componentDidMount() {
		window.scrollTo(0,0);
		if (_.isEmpty(this.state.selectedCategories)) {
			//this.props.history.push('/areas');
		}
	}

	logChange(val) {
  	this.setState({
  		selectedCountry: val ? val.value : val
  	});
	}

	handleContinue() {
		const country = this.state.selectedCountry;
		const fullName = this.refs.fullName.value.trim();
		const about = this.refs.about.value.trim();
		const userId = this.state.user._id;
		console.log(country, fullName, about)
		const data = {
			fullName,
			country,
			about
		}
		DescripcionActionCreator.updateProfile(data, userId);
	}

	render() {
		const {user, selectedCountry} = this.state;
		console.log('AreasStore.getAreas>', AreasStore.getAreas, this.state.user)
		const fullNameDisable = user.fullName ? true : false;
		const countryDisable = user.country ? true : false;
		const aboutDisable = user.about ? true : false;
		const aboutText = 'ACERCA DE TI: Por ejemplo años de experiencia, en que área es tu mayor conocimiento,que te apasiona'
console.log('fullNameDisable >>',fullNameDisable)
		return (
			<div className="description-block">
				{this.state.showForm &&
					<div className='container'>
						<h1 className='col-sm-12 text-center heading-1'>{'Describe de tu servicio'}</h1>
						<h2 className='col-sm-12 text-center'>{'Entre más específico seas, más clientes tendrás'}</h2>
						<div className='col-sm-12 form'>
							<div className='center'>
								<div className="form-group">
								    <input
								    	type="text"
								    	className="form-control"
								    	placeholder="TÍTULO:  por ejemplo “Soy tu Social Media Manager”"
								    	ref='title'
								   	/>
								</div>
								<div className="form-group">
								    <textarea
								    	className="form-control"
								    	placeholder="DESCRIPCIÓN: 
										que incluye, que lo hace especial, requisitos,
										tiempo de entrega, etc."
										ref='description'
								   	/>
								</div>
								<div className="form-group">
								  	<div className='col-lg-6 col-md-6 col-sm-12 row'>
									  <input
									  	type="text"
									  	className="form-control sm"
									  	placeholder="Precio en USD $"
									  	ref='price'
									  />
									</div>
								</div>
								<div className="form-group">
								  <input
								  	type="text"
								  	className="form-control"
								  	placeholder={user.fullName ? user.fullName : 'Tu Nombre'}
								  	ref='fullName'
								  	readOnly={fullNameDisable}
								  />
								</div>
								<div className="form-group">
									<Select
									  name="form-field-name"
									  placeholder={user.country ? user.country : 'Tu País'}
									  value={selectedCountry}	
									  options={getCountries()}
									  onChange={this.logChange}
									  disabled={countryDisable}
									/>
								  
								</div>
								<div className="form-group">
								    <textarea
								    	className="form-control"
								    	ref='about'
								    	readOnly={aboutDisable}
								    	placeholder={user.about ? user.about : aboutText}
								   	/>
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

