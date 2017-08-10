import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import AuthStore from '../../stores/AuthStore';

import UserActionCreator from '../../actions/UserActionCreator';
import UserStore from '../../stores/UserStore';
import ActionTypes from '../../constants/ActionTypes';
import UsuariosListing from './UsuariosListing';

class Usuarios extends Component {

	constructor(props) {
	    super(props);
	    this.onChange = this.onChange.bind(this);
	    this.openModal = this.openModal.bind(this);
	    this.deleteUser = this.deleteUser.bind(this);

	    this.state = {
	    	users: [],
	    	showSuccessAlert: false,
	    	toggleSorting: 'asc',
	    	userId: ''
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
		} else if (action.type === ActionTypes.DELETE_USER_SUCCESS) {
			UserActionCreator.getUsers();
			$('#myModal').modal('hide')
		}
	}

	handleSort(title) {
		let param = title;
		const toggle = this.state.toggleSorting === 'asc' ? 'desc' : 'asc';
		const users = _.orderBy(this.state.users, title, toggle);
		console.log('users >>',  toggle)
		this.setState({
			users,
			toggleSorting: toggle
		});
	}

	deleteUser() {
		const userId = this.state.userId;
		const param = {status: 'INACTIVE'}
		UserActionCreator.deleteUser(param, userId);
	}

	openModal(id) {
		$('#myModal').modal('show')
		this.setState({
			userId: id
		});
	}

	renderAlertModal() {
		return(
			<div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			  <div className="modal-dialog" role="document">
			    <div className="modal-content">
			      <div className="modal-header">
			        <h5 className="modal-title" id="exampleModalLabel">Delete Usuarios?</h5>
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
			        	onClick={this.deleteUser}
			        >Delete</button>
			      </div>
			    </div>
			  </div>
			</div>
		)
	}

	renderUsersList() {
		const users = this.state.users;
		let usersList = [];
		if (!_.isEmpty(users)) {
		users.forEach((data) => {
				if (data.role === 'USER' && data.status === 'ACTIVE') {
					usersList.push(
						<UsuariosListing
							key={data._id}
							listingData={data}
							openModal={this.openModal}
						/>
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
									<th
										onClick={() => this.handleSort('fullName')}
									>
										Usuario 
									</th>
									<th
										onClick={() => this.handleSort('country')}
									>
										Pais 
									</th>
									<th
										onClick={() => this.handleSort('email')}
									>
										Email
									</th>
									<th
										width='170'
										onClick={() => this.handleSort('sales')}
									>
										Ventas
									</th>
									<th width='40'><img src='/images/download-icon.png'/></th>
								</tr>
							</thead>
						  <tbody>
						  	{this.renderUsersList()}
						  </tbody>
						</table>
					</div>
				</div>
				{this.renderAlertModal()}
			</div>
		);
	}
}

export default Usuarios;

