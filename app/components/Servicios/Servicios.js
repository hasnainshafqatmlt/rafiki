import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
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

	    this.state = {
	    	services: [],
	    	serviceId: null
	    };
	}

	componentDidMount() {
		if (_.isEmpty(AuthStore.user) || AuthStore.user.role === 'ADMIN') {
			this.props.history.push('/login');
		}
		ServiciosActionCreator.getServices();
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
			ServiciosActionCreator.getServices();
			$('#myModal').modal('hide')
		}
	}

	deleteService(id) {
		const param = {status: 'DELETED'}
		ServiciosActionCreator.deleteServices(param, id);
	}

	renderServiceList() {
		const services = this.state.services;
		let servicesList = [];
		services.forEach((data) => {
			if (data.status !== 'DELETED') {
				servicesList.push(
					<tr key={data._id}>
			      <td width='40px'>
			      	<Link to={`/areas/${data._id}`}>
				      	<img
				      		src='/images/edit-icon.png'
				      		className='icon'
				      	/>
			      	</Link>
			      </td>
			      <td width='40px'>
			      	<img
			      		src='/images/del-icon.png'
			      		className='icon'
			      		data-toggle="modal"
			      		data-target="#myModal"
			      		onClick={() => this.setState({serviceId: data._id})}
			      	/>
			      </td>
			      <td width='40px'>
			      	<i className={`status-icon green ${data.status}`}/>
			      </td>
			      <td>
			      	<Link to='/vistaPrevia'>
			      		{data.title}
			      	</Link>
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
			<div className="servicios-block">
				<div className='container'>
					<h1 className='col-sm-12 text-center heading-1'>						
						{'Mis Servicios'}
					</h1>
					<ul className='status'>
						<li>
							<i className='green'/>
							<span> Al aire</span>
						</li>
						<li>
							<i className='red'/>
							<span> Rechazado</span>
						</li>
						<li>
							<i className='yellow'/>
							<span> En revisión</span>
						</li>
					</ul>
					<div className='float-left col-100'>
						<table className='table'>
						  <tbody>
						  	{this.renderServiceList()}
						  </tbody>
						</table>
					</div>

					<div className='float-left col-100 text-center'>
						<Link
							to='/areas'
							className='add-btn'
						>
							<i className='plus-icon' />
							<span>Agregar otro servicio</span>
						</Link>
					</div>
				</div>
				{this.renderAlertModal()}
			</div>
		);
	}
}

export default Servicios;

