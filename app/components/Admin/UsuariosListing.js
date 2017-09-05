import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import AuthStore from '../../stores/AuthStore';

import UserActionCreator from '../../actions/UserActionCreator';
import UserStore from '../../stores/UserStore';
import ActionTypes from '../../constants/ActionTypes';

class UsuariosListing extends Component {

	constructor(props) {
	    super(props);
	    this.saveSales = this.saveSales.bind(this);

	    this.state = {
	    	users: [],
	    	showSuccessAlert: false,
	    	toggleSorting: 'asc'
	    };
	}

	static propTypes = {
		listingData: React.PropTypes.object,
	  openModal: React.PropTypes.func
	}


	saveSales(id) {
		const sales = this.refs.sales.value.trim() ? this.refs.sales.value.trim() : 0;
		const param = { sales }
		UserActionCreator.updateSales(param, id);
	}

	render() {
		const data = this.props.listingData;
		return (
			<tr>
		      <td>
		      	{data.fullName}
		      </td>
		      <td>
		      	{data.country}
		      </td>
		      <td>{data.email}</td>
		      <td>
		      	<input
		      		type='number'
		      		className='form-control number'
		      		defaultValue={data.sales ? data.sales : ''}
		      		ref='sales'
		      	/>
		      	<img
		      		src='/images/tick-icon.png'
		      		className='icon tick'
		      		onClick={() => this.saveSales(data._id)}
		      	/>
		      </td>
		      <td>
		      	<img
		      		src='/images/del-icon.png'
		      		className='icon'
		      		onClick={() => this.props.openModal(data._id)}
		      	/>
		    </td>
		  </tr>
		);
	}
}

export default UsuariosListing;

