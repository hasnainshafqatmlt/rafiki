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
	    	serviceId: null,
	    	showLoader: true
	    };
	}

	componentDidMount() {
		if (_.isEmpty(AuthStore.user) || AuthStore.user.role === 'ADMIN') {
			this.props.history.push('/login');
		}
		ServiciosActionCreator.getServices();
		ServiciosStore.addChangeListener(this.onChange);
	}

	componentWillUnmount() {
		ServiciosStore.removeChangeListener(this.onChange);
	}

	onChange() {
		const action = ServiciosStore.getLastAction();
		if (action && action.type === ActionTypes.GET_SERVICES_SUCCESS) {
			this.setState({
				services: ServiciosStore.getServices.services,
				showLoader: false
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
			      	{data.title}
			      </td>
			    </tr>
			);
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
					{this.state.showLoader &&
						<div className='float-left w-100 m-t-40'>
							<div className="sk-cube-grid">
							  <div className="sk-cube sk-cube1"></div>
							  <div className="sk-cube sk-cube2"></div>
							  <div className="sk-cube sk-cube3"></div>
							  <div className="sk-cube sk-cube4"></div>
							  <div className="sk-cube sk-cube5"></div>
							  <div className="sk-cube sk-cube6"></div>
							  <div className="sk-cube sk-cube7"></div>
							  <div className="sk-cube sk-cube8"></div>
							  <div className="sk-cube sk-cube9"></div>
							</div>
						</div>
					}
					{this.state.services.length > 0 &&
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
					}
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
							<span>Agregar	servicio</span>
						</Link>
					</div>
				</div>
				{this.renderAlertModal()}
			</div>
		);
	}
}

export default Servicios;

