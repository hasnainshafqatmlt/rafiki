import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import AuthStore from '../../stores/AuthStore';

import ServiciosActionCreator from '../../actions/ServiciosActionCreator';
import ServiciosStore from '../../stores/ServiciosStore';
import ActionTypes from '../../constants/ActionTypes';

class Servicios extends Component {

	constructor(props) {
	    super(props);
	    this.onChange = this.onChange.bind(this);
	    this.renderServiceList = this.renderServiceList.bind(this);
	    this.deleteService = this.deleteService.bind(this);
	    this.gotToPreview = this.gotToPreview.bind(this);

	    this.state = {
	    	services: [],
	    	serviceId: null
	    };
	}

	componentDidMount() {
		if (_.isEmpty(AuthStore.user) || AuthStore.user.role === 'USER') {
			this.props.history.push('/login');
		}
		ServiciosActionCreator.getAdminServices();
		ServiciosStore.addChangeListener(this.onChange);
	}

	componentWillMount() {
		ServiciosStore.removeChangeListener(this.onChange);
	}

	onChange() {
		const action = ServiciosStore.getLastAction();

		if (action && action.type === ActionTypes.GET_SERVICES_SUCCESS) {
			this.setState({
				services: ServiciosStore.getServices.services
			});
		} else if (action.type === ActionTypes.DELETE_SERVICE_SUCCESS) {
			ServiciosActionCreator.getAdminServices();
			$('#myModal').modal('hide')
		}
	}

	generateId(id) {
		let ids = '';
		ids += id.substring(0, 3);
		ids += id.substr(id.length - 5);
		return ids;
	}

	deleteService(id) {
		const param = {status: 'DELETED'}
		ServiciosActionCreator.deleteServices(param, id);
	}

	gotToPreview(e, data) {
		e.preventDefault();
		const selectedCat = {
			subCat: data.category.sub,
			title: data.category.title
		}
		const serviceData = {
			title: data.title,
			description: data.description,
			price: data.price
		}
		const userData = {
			fullName: data.createdBy.fullName,
			country: data.createdBy.country,
			about: data.createdBy.about
		}
		ServiciosActionCreator.setCategories(selectedCat);
		ServiciosActionCreator.setServiceDescription(serviceData);
		ServiciosActionCreator.setServiceUserData(userData);
		this.props.history.push(`/admin/vistaPrevia/${data._id}`);
	}

	renderServiceList() {
		const services = this.state.services;
		let servicesList = [];
		services.forEach((data) => {
			if (data.status !== 'DELETED') {
				servicesList.push(
					<tr key={data._id}>
			      <td width='40px'>
			      	<i className={`status-icon green ${data.status}`}/>
			      </td>
			      <td>
			      	{this.generateId(data._id)}
			      </td>
			      <td>
			      	{data.category.title}
			      </td>
			      <td>
			      	<a href={`/admin/vistaPrevia/${data._id}`}
			      		onClick={(e) => this.gotToPreview(e, data)}
			      	>
			      		{data.title}
			      	</a>
			      </td>
			      <td>
			      	{data.createdBy.fullName}
			      </td>
			      <td>
			      	<img
			      		src='/images/del-icon.png'
			      		className='icon'
			      		data-toggle="modal"
			      		data-target="#myModal"
			      		onClick={() => this.setState({serviceId: data._id})}
			      	/>
			      </td>
			    </tr>
					
				);
			}
		})
		return servicesList;
	}

	renderAlertModal() {
		return(
			<div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			  <div className="modal-dialog" role="document">
			    <div className="modal-content">
			      <div className="modal-header">
			        <h5 className="modal-title" id="exampleModalLabel">Delete Servicio?</h5>
			        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
			          <span aria-hidden="true">&times;</span>
			        </button>
			      </div>
			      <div className="modal-body">
			        {'Are you sure you want to delete?'}
			      </div>
			      <div className="modal-footer">
			        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
			        <button
			        	type="button"
			        	className="btn btn-danger"
			        	onClick={() => this.deleteService(this.state.serviceId)}
			        >Delete</button>
			      </div>
			    </div>
			  </div>
			</div>
		)
	}

	render() {
		return (
			<div className="admin-servicios">
				<div className='container'>
					<h1 className='col-sm-12 text-center heading-1'>						
						{'Servicios'}
					</h1>
					<div className='float-left col-100'>
						<table className='table'>
							<thead>
								<tr>
									<th> Status 
										<div className='filter-status'>
												<i className='status-icon red'/>
												<i className='status-icon green'/>
												<i className='status-icon yellow'/>
										</div>
									</th>
									<th> ID </th>
									<th>Categoria</th>
									<th> Servicio</th>
									<th>Usuario</th>
									<th><img src='/images/download-icon.png'/></th>
								</tr>
							</thead>
						  <tbody>
						    {this.renderServiceList()}
						  </tbody>
						</table>
					</div>
				</div>
				{this.renderAlertModal()}
			</div>
		);
	}
}

export default Servicios;

