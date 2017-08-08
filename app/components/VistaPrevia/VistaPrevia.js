import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import _ from 'lodash';

import AuthStore from '../../stores/AuthStore';
import ServiciosStore from '../../stores/ServiciosStore';
import ServiciosActionCreator from '../../actions/ServiciosActionCreator';
import ActionTypes from '../../constants/ActionTypes';

class VistaPrevia extends Component {

	constructor(props) {
	    super(props);
	    this.handleSubmit = this.handleSubmit.bind(this);
	    this.onChange = this.onChange.bind(this);

	    this.state = {
	    	user: AuthStore.user,
	    	category: ServiciosStore.getSelectedCategory,
	    	service: ServiciosStore.getServiceDescription
	    };
	}

	componentDidMount() {
		window.scrollTo(0,0);
		if (_.isEmpty(ServiciosStore.getSelectedCategory) || _.isEmpty(ServiciosStore.getServiceDescription)) {
			this.props.history.push('/areas');
		}

		ServiciosStore.addChangeListener(this.onChange);
	}

	componentWillMount() {
		ServiciosStore.removeChangeListener(this.onChange);
	}

	onChange() {
		const action = ServiciosStore.getLastAction();

		if (action && action.type === ActionTypes.SUBMIT_SERVICE_SUCCESS) {
			ServiciosStore.clearCategoryService();
			this.props.history.push('/felicitaciones');
		}
	}

	handleSubmit() {
		const {service, category} = this.state;
		const params = {
			title: service.title,
			description: service.description,
			price: service.price,
			category: {
				title: category.title,
				sub: category.subCat
			}
		}
		
		ServiciosActionCreator.submitService(params);
	}

	render() {
		const {user, service, category} = this.state;

		const fullName = user.fullName || '';
		const country = user.country || '';
		const about = user.about || '';
		const title = service.title || '';
		const description = service.description || '';
		const price = service.price || '';

		let subcatList = [];
		if (!_.isEmpty(category)) {
			category.subCat.forEach((name, i) => {
				subcatList.push(
					<li
						key={i}
						className='breadcrumb-item active'
					>
						{name}
					</li>
				);
			})
		}

		return (
			<div className="vista-previa-block">
				<div className='container'>
					<h1 className='col-sm-12 text-center heading-1'>{'Vista previa'}</h1>
					<h2 className='col-sm-12 text-center'>{'Envíanos tu servicio. El equipo de Kogno lo revisará antes de salir al aire'}</h2>					
				</div>
				<hr className='top-horizental-line'/>
				<div className='float-left col-100'>
					<div className='container'>
						<ol className='breadcrumb'>
						  <li className='breadcrumb-item'>
						  	<Link to='/areas'>{category.title}</Link>
						  </li>
						  {subcatList}
						</ol>
						<div className='info-block float-left col-100'>
							<i className='thumb'>
								<img src='/images/profile-pic-lg.png' className='icon'/>
							</i>
							<div className='float-left col-100'>
								<h3>{title}</h3>
								<small>
									{`${fullName}, ${country}`}
								</small>
								<price>{price}</price>
								<p>{description}</p>
								
								<strong>Acerca de mi:</strong>
								<p>{about}</p>
								<a
									href='#'
									className='btn btn-gray'
								>
									{'Comprar'}
								</a>
							</div>
						</div>
					</div>
				</div>
				<hr className='bottom-horizental-line'/>
				<div className='float-left col-100 actions'>
					<div className='container'>
						<button
							type='button'
							className='btn btn-secondary sm'
							onClick={() => this.props.history.push('/descripcion')}
						>
							{'Editar'}
						</button>
						<button
							type='button'
							className='btn btn-success sm'
							onClick={this.handleSubmit}
						>
							{'Enviar'}
						</button>
					</div>	
				</div>

			</div>
		);
	}
}

export default VistaPrevia;

