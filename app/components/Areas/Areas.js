import React, { Component } from 'react';
import _ from 'lodash';

import AuthStore from '../../stores/AuthStore';
import Category from './Category';
import SubCategory from './SubCategory';
import ServiciosActionCreator from '../../actions/ServiciosActionCreator';
import ServiciosStore from '../../stores/ServiciosStore';
import ActionTypes from '../../constants/ActionTypes';

const categoryArray = [
	{
		name: 'Social Media',
		title1: '¿En qué Redes?',
		title2: '¿Qué Servicios?',
		subCategory: [
			'Facebook',
			'Instagram',
			'Twitter',
			'LinkedIn',
			'YouTube',
			'G+',
			'Pinterest',
			'Conseguir más seguidores / fans / likes',
			'Promoción a miles o millones de fans',
			'Creación / Manejo de Cuenta',
			'Social Media Manager',
			'Campaña de Paid Ads',
			'Consulting / Analytics',
			'Otro'
		]
	},
	{
		name: 'SEO, Generación de tráfico',
		subCategory: [
			'Backlinks',
			'Optimización de sitios web',
			'Análisis de sitios web',
			'Mejora de posición en Google',
			'Estudio de keywords o competidores',
			'Consultoría / Analytics',
			'Otro'
		]
	},
	{
		name: 'SEM, AdWords',
		subCategory: [
			'Campañas:  creación o administración',
			'Estrategia',
			'Remarketing',
			'Consultoría / Analytics',
			'Otro'
		]
	},
	{
		name: 'Email Marketing',
		subCategory: [
			'Campañas:  creación o administración',
			'MailChimp, GetResponse',
			'Plantillas de Emails',
			'Otro'
		]
	},
	{
		name: 'Inbound Marketing, Contenidos',
		subCategory: [
			'Creación de contenidos',
			'Promoción de contenidos',
			'Consultoría, estrategia',
			'Otro'
		]
	},
	{
		name: 'Retargeting, Display Programático',
		subCategory: [
			'Campañas:  creación o administración',
			'Retargeting en Web o Facebook',
			'AdWords Remarketing',
			'Consultoría, estrategia',
			'Otro'
		]
	},
	{
		name: 'Influenciadores',
		title1: '¿En qué Redes?',
		title2: '¿Qué Servicios?',
		subCategory: [
			'Facebook',
			'Instagram',
			'Twitter',
			'LinkedIn',
			'YouTube',
			'G+',
			'Pinterest',
			'Conseguir más seguidores / fans / likes',
			'Promoción a miles o millones de fans',
			'Promociones o Shoutouts',
			'Consultoría, estrategia',
			'Otro'
		]
	},
	{
		name: 'Video Ads, YouTube',
		subCategory: [
			'Campañas de Video Ads',
			'Conseguir más tráfico / views / likes',
			'Creación de videos',
			'Consultoría, estrategia',
			'Otro'
		]
	},
	{
		name: 'Mobile Marketing',
		subCategory: [
			'Campañas de Mobile ads',
			'Promoción de Apps',
			'Otro'
		]
	},
	{
		name: 'Otros'
	},
]

class Areas extends Component {

	constructor(props) {
	    super(props);

	    this.state = {
	    	showError: false,
	    	categoryId: -1,
	    	subCatId: [],
	    	selectedCatName: '',
	    	selectedData: []
	    };
	}

	componentDidMount() {
		if (_.isEmpty(AuthStore.user) || AuthStore.user.role === 'ADMIN') {
			this.props.history.push('/login');
		}
		ServiciosStore.addChangeListener(this.onChange);
		if (this.props.match.params.serviceId) {
			if (this.props.match.params.serviceId === 'edit' || this.props.match.params.edit === 'edit') {
				this.updateCatSubCatState();
			} else {
				ServiciosActionCreator.getServiceById(this.props.match.params.serviceId);
			}
			
		}
	}

	componentWillUnmount() {
		ServiciosStore.removeChangeListener(this.onChange);
	}

	onChange = () => {
		const action = ServiciosStore.getLastAction();
		if (action && action.type === ActionTypes.SET_AREAS_CATEGORIES) {
			if (this.props.match.params.serviceId) {
				this.props.history.push(`/descripcion/${this.props.match.params.serviceId}`);	
			} else {
				this.props.history.push('/descripcion');
			}
			
		} else if (action.type === ActionTypes.GET_SERVICES_BYID_SUCCESS) {
			let saveData = [];
			const category = action.data.service.category;
			const title = action.data.service.title;
			const price = action.data.service.price;
			const description = action.data.service.description;
			const serviceList = action.data.service.service_list;
			const serviceTime = action.data.service.service_time;
			const serviceData = {
				title,
				price,
				description,
				serviceList,
				serviceTime
			}
			const catData = {
				title: category.title,
				subCat: category.sub,
				selected: true
			}
			saveData.push(catData);
			setTimeout(() => {
				ServiciosActionCreator.setServiceDescription(serviceData);
			}, 10);

			this.setState({
				selectedCatName: category.title,
				selectedData: saveData
			});
		}
	}

	updateCatSubCatState = () => {
		const selectedCategory = ServiciosStore.getSelectedCategory;
		const serviceDescription = ServiciosStore.getServiceDescription;

		if (_.isEmpty(selectedCategory) ) {
			this.props.history.push('/areas');
			return;
		}
		let saveData = [];
		const category = selectedCategory;

		const title = serviceDescription.title;
		const price = serviceDescription.price;
		const description = serviceDescription.description;
		const serviceData = {
			title,
			price,
			description
		}			
		const catData = {
			title: category.title,
			subCat: category.subCat,
			selected: true
		}
		saveData.push(catData);
		setTimeout(() => {
			ServiciosActionCreator.setServiceDescription(serviceData);
		}, 10);

		this.setState({
			selectedCatName: category.title,
			selectedData: saveData
		});
	}

	selectCategory = (catName, id) => {
		let tempArray = this.state.selectedData;
		let isCat = false;
		tempArray.forEach((data) => {
			if (data.title === catName) {
				isCat = true;
				data.selected = true;
			} else {
				data.selected = false;
				data.subCat = []
			}
		})

		const catData = {
			selected: true,
			subCat: []
		};
		if (!isCat) {
			catData.title = catName;
			tempArray.push(catData)
			this.setState({
				selectedCatName: catName,
				categoryId: id,
				selectedData: tempArray
			})
		} else {
			this.setState({
				selectedCatName: catName,
				categoryId: id,
				selectedData: tempArray
			})
		}
	}

	selectSubCategory = (catName, subCatNewname, subCatId) => {
		let selectedData = this.state.selectedData;
		selectedData.forEach((data) => {
			if (data.title === catName) {
				if (data.subCat.length > 0) {
					let push = true;
					data.subCat.forEach((oldSubCatName, i) => {
						if (oldSubCatName === subCatNewname) {
							const index = data.subCat.indexOf(oldSubCatName);
							data.subCat.splice(index, 1);
							push = false;
						}
					})
					if (push) {
						data.subCat.push(subCatNewname);	
					}
				} else {
					data.subCat.push(subCatNewname);
				}				
			}
		})

		this.setState({
			selectedData: selectedData
		});
	}

	handleContinue = () => {		
		const selectedCat = _.find(this.state.selectedData, {selected: true})
		if (this.state.selectedData.length < 1 ) {
			this.setState({
				showError: 'Please Select Category'
			})
			window.scrollTo(0,0);
		} 
		// else if (_.isEmpty(selectedCat.subCat) && selectedCat.title !== 'Otros') {
		// 	this.setState({
		// 		showError: 'Please Select Subcategories'
		// 	})
		// 	window.scrollTo(0,0);
		// }
		 else {
			ServiciosActionCreator.setCategories(selectedCat);
		}
	}

	render() {
		const selectedCat = _.find(this.state.selectedData, {selected: true})
		let categories = [];
		categoryArray.forEach((data, i) => {
			let isSelected = false;			
			if (selectedCat && selectedCat.title === data.name) {
				isSelected = true;
			}
			categories.push(
				<div key={`list_${i}`}>
					<Category
						id={i}
						isSelected={isSelected}
						categoryName={data.name}
						selectCategory={this.selectCategory}
					/>
					{/*<SubCategory
						showSubCategory={isSelected}
						selectedCat={selectedCat}
						selectedCatName={this.state.selectedCatName}
						subCat={data}
						selectSubCategory={this.selectSubCategory}
					/>*/}
				</div>
			)
		})
		return (
			<div className="areas-block">
				<div className='container'>
					<div className='row'>
						<h1 className='col-sm-12 text-center heading-1 m-t-60'>{'Publica un servicio'}</h1>
						<h2 className='col-sm-12 text-center'>
							{'después podrás publicar más   : )'}
						</h2>
						<h2 className='col-sm-12 text-center m-t-30'>
							{'Elige 1 área'}
						</h2>
						<div className='pull-left col-100 form col-sm-12'>
							<div className='center'>
								{this.state.showError &&
									<div className='alert alert-danger text-center m-t-30 m-b-0'>
										{this.state.showError}
									</div>
								}
								<ul
									className='category-list'
								>
									{categories}
								</ul>
								<div className='float-left col-100 next'>
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
					</div>
				</div>
			</div>
		);
	}
}

export default Areas;

