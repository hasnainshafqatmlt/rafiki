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
	    this.acceptPost = this.acceptPost.bind(this);
	    this.rejectPost = this.rejectPost.bind(this);

	    this.state = {
	    	user: AuthStore.user.role === 'ADMIN' ? ServiciosStore.getServiceUserDetail : AuthStore.user,
	    	category: ServiciosStore.getSelectedCategory,
	    	service: ServiciosStore.getServiceDescription,
	    	showSuccessAlert: false,
	    	showErrorAlert: false,
	    	userImage: AuthStore.user && AuthStore.user.avatar ? AuthStore.user.avatar : ''
	    };
	}

	componentDidMount() {
		$('html, body').animate({ scrollTop: 0 }, 'fast');
		window.scrollTo(0,0);
		if (_.isEmpty(ServiciosStore.getSelectedCategory) || _.isEmpty(ServiciosStore.getServiceDescription)) {
			this.props.history.push('/areas');
		}
		if (_.isEmpty(AuthStore.user)) {
			this.props.history.push('/login');
		}
		ServiciosStore.addChangeListener(this.onChange);
	}

	componentWillUnmount() {
		ServiciosStore.removeChangeListener(this.onChange);
	}

	onChange() {
		const action = ServiciosStore.getLastAction();
		if (action) {
			if (action.type === ActionTypes.SUBMIT_SERVICE_SUCCESS|| action.type === ActionTypes.UPDATE_SERVICE_SUCCESS) {
				ServiciosStore.clearCategoryService();
				this.props.history.push('/felicitaciones');
			} else if (action.type === ActionTypes.ACCEPT_SERVICE_SUCCESS) {
				this.setState({
					showSuccessAlert: 'This post is active now'
				}, () => {
					$('html,body').animate({
			        scrollTop: $('.alert').offset().top},'slow');
				})
				setTimeout(() => {
					this.setState({
						showSuccessAlert: false
					})	
				}, 5000)
			} else if (action.type === ActionTypes.REJECT_SERVICE_SUCCESS) {
				this.setState({
					showErrorAlert: 'This post is disable now'
				}, () => {
					$('html,body').animate({
			        scrollTop: $('.alert').offset().top},'slow');
				})
				setTimeout(() => {
					this.setState({
						showErrorAlert: false
					})
				}, 5000)
			}
		}
	}

	handleSubmit() {
		const {service, category} = this.state;
		const params = {
			title: service.title,
			description: service.description,
			price: service.price,
			category: {
				title: category.title
			}
		}

		if (category.subCat.length > 0) {
			params.category.sub = category.subCat
		}

		if (this.props.match.params.serviceId) {
			ServiciosActionCreator.updateService(params, this.props.match.params.serviceId);
		} else {
			ServiciosActionCreator.submitService(params);
		}
	}

	acceptPost() {
		const param = {
			status: 'ACTIVE'
		}
		const id = this.props.match.params.serviceId;
		ServiciosActionCreator.acceptService(param, id);
	}

	rejectPost() {
		const param = {
			status: 'INACTIVE'
		}
		const id = this.props.match.params.serviceId;
		ServiciosActionCreator.rejectService(param, id);
	}

	render() {
		const {user, service, category} = this.state;
		const serviceId = this.props.match.params.serviceId ? this.props.match.params.serviceId : '';

		const fullName = user && user.fullName || '';
		const country = user && user.country || '';
		const about = user && user.about || '';
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
						  	<Link to={`/areas/${serviceId}`}>{category.title}</Link>
						  </li>
						  {subcatList}
						</ol>
						{this.state.showSuccessAlert &&
							<div className="alert alert-success float-left col-sm-12">
							  <strong>Accepted!</strong> {this.state.showSuccessAlert} 
							</div>
						}
						{this.state.showErrorAlert &&
							<div className="alert alert-danger float-left col-sm-12">
							  <strong>Rejected!</strong> {this.state.showErrorAlert} 
							</div>
						}
						<div className='info-block float-left col-100'>
							<i className='thumb'>
								{!this.state.userImage &&
									<img src='/images/profile-pic-lg.png' className='icon'/>
								}
								{this.state.userImage &&
									<img src={this.state.userImage} className='icon thumb'/>
								}
							</i>
							<div className='float-left col-100'>
								<h3>{title}</h3>
								<small>
									{`${fullName}, ${country}`}
								</small>
								<price>${price}</price>
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
					
					{AuthStore.user.role === 'ADMIN' &&
						<div className='container'>
							<button
								type='button'
								className='btn btn-secondary sm'
								onClick={this.rejectPost}
							>
								{'Rechazar'}
							</button>
							<button
								type='button'
								className='btn btn-success sm'
								onClick={this.acceptPost}
							>
								{'Publicar'}
							</button>
						</div>
					}
					{AuthStore.user.role === 'USER' &&
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
					}
				</div>

			</div>
		);
	}
}

export default VistaPrevia;

