import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
	    	services: []
	    };
	}

	componentDidMount() {
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
			      		onClick={() => this.deleteService(data._id)}
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
			</div>
		);
	}
}

export default Servicios;

