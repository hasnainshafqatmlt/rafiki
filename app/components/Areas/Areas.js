import React, { Component } from 'react';
import _ from 'lodash';

import Category from './Category';
import SubCategory from './SubCategory';
import AreasActionCreator from '../../actions/AreasActionCreator';
import AreasStore from '../../stores/AreasStore';
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
	    	categoryId: -1,
	    	subCatId: [],
	    	selectedCatName: '',
	    	selectedData: []
	    };
	}

	componentDidMount() {
		AreasStore.addChangeListener(this.onChange);
	}

	componentWillMount() {
		AreasStore.removeChangeListener(this.onChange);
	}

	onChange = () => {
		const action = AreasStore.getLastAction();

		if (action && action.type === ActionTypes.SET_AREAS_CATEGORIES) {
			this.props.history.push('/descripcion');
		}
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
		AreasActionCreator.setCategories(selectedCat);
	}

	render() {
		
		let categories = [];
		categoryArray.forEach((data, i) => {
			categories.push(
				<div key={`list_${i}`}>
					<Category
						categoryName={data.name}
						id={i}
						categoryId={this.state.categoryId}
						selectCategory={this.selectCategory}
					/>
					<SubCategory
						categoryId={i}
						selectedCatName={this.state.selectedCatName}
						subCat={data}
						selectSubCategory={this.selectSubCategory}
						selectedCategoryId={this.state.categoryId}
						subCatId={this.state.subCatId}
					/>
				</div>
			)
		})
		return (
			<div className="areas-block">
				<div className='container'>
					<div className='row'>
						<h1 className='col-sm-12 text-center heading-1 m-t-60'>{'Elige el área de tu servicio'}</h1>
						<div className='pull-left col-100 form'>
							<div className='center'>
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

