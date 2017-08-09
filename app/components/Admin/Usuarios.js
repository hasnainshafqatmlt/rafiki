import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import AuthStore from '../../stores/AuthStore';

import UserActionCreator from '../../actions/UserActionCreator';
import UserStore from '../../stores/UserStore';
import ActionTypes from '../../constants/ActionTypes';

class Usuarios extends Component {

	constructor(props) {
	    super(props);
	    this.onChange = this.onChange.bind(this);
	    this.renderUsersList = this.renderUsersList.bind(this);
	    this.deleteUser = this.deleteUser.bind(this);
	    this.saveSales = this.saveSales.bind(this);

	    this.state = {
	    	users: [],
	    	showSuccessAlert: false
	    };
	}

	componentDidMount() {
		if (_.isEmpty(AuthStore.user) || AuthStore.user.role === 'USER') {
			this.props.history.push('/login');
		}
		UserActionCreator.getUsers();
		UserStore.addChangeListener(this.onChange);
	}

	componentWillMount() {
		UserStore.removeChangeListener(this.onChange);
	}

	onChange() {
		const action = UserStore.getLastAction();
		if (action && action.type === ActionTypes.GET_USERS_SUCCESS) {
			this.setState({
				users: action.data.users
			});
		} else if (action.type === ActionTypes.UPDATE_SALES_SUCCESS) {
			this.setState({
				showSuccessAlert: 'Sales point updated successfully'
			}, () => {
				$('html,body').animate({
		        scrollTop: $('.alert').offset().top},'slow');
			});
			setTimeout(() => {
				this.setState({
					showSuccessAlert: false
				})	
			}, 5000);
		}
	}

	saveSales(id) {
		const sales = this.refs.sales.value.trim() ? this.refs.sales.value.trim() : 0;
		const param = { sales }
		UserActionCreator.updateSales(param, id);
	}

	deleteUser() {

	}

	renderUsersList() {
		const users = this.state.users;
		let usersList = [];
		console.log(' in in ', users)
		if (!_.isEmpty(users)) {
		users.forEach((data) => {
				if (data.role === 'USER') {
					usersList.push(
						<tr key={data._id}>
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
				      		//onClick={this.deleteUser(data._id)}
				      	/>
				      </td>
				    </tr>
					);
				}
			})
		}
		console.log(' users', usersList)
		return usersList;
	}

	render() {
		return (
			<div className="admin-usuarios">
				<div className='container'>
					<h1 className='col-sm-12 text-center heading-1'>						
						{'Usuarios'}
					</h1>
					{this.state.showSuccessAlert &&
						<div className="alert alert-success float-left col-sm-12">
						  <strong>Accepted!</strong> {this.state.showSuccessAlert} 
						</div>
					}
					<div className='float-left col-100'>
						<table className='table'>
							<thead>
								<tr>
									<th> Usuario </th>
									<th> Pais </th>
									<th>Email</th>
									<th width='170'> Ventas</th>
									<th width='40'><img src='/images/download-icon.png'/></th>
								</tr>
							</thead>
						  <tbody>
						  	{this.renderUsersList()}
						  </tbody>
						</table>
					</div>
				</div>
			</div>
		);
	}
}

export default Usuarios;

