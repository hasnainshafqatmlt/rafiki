import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import AuthStore from '../../stores/AuthStore';

import UserStore from '../../stores/UserStore';
import UserActionCreator from '../../actions/UserActionCreator';
import ActionTypes from '../../constants/ActionTypes';

class Ventas extends Component {

	constructor(props) {
	    super(props);
	    this.onChange = this.onChange.bind(this);

	    this.state = {
	    	mySale: ''
	    };
	}

	componentDidMount() {
		window.scrollTo(0,0);
		UserActionCreator.getMyinfo();
		UserStore.addChangeListener(this.onChange);
		if (_.isEmpty(AuthStore.user) || AuthStore.user.role === 'ADMIN') {
			this.props.history.push('/login');
		}
	}

	componentWillMount() {
		UserStore.removeChangeListener(this.onChange);
	}

	onChange() {
		const action = UserStore.getLastAction();
		if (action && action.type === ActionTypes.GET_MYINFO_SUCCESS) {
			this.setState({
				mySale: action.data.user.sales ? action.data.user.sales : ''
			});
		}
	}

	render() {
		return (
			<div className="ventas-block">
				<div className='container'>
					<h1 className='col-sm-12 text-center heading-1'>						
						{'Mis Ventas'}
					</h1>
					<h2 className='col-sm-12 text-center'>						
						{'Total de tus ventas hasta hoy'}
					</h2>
					
					<div className='float-left col-100 price text-center'>
						${this.state.mySale}
					</div>

					<div className='float-left col-100 text-center'>
						<Link
							to='/descripcion'
							className='add-btn'
						>
							<i className='plus-icon' />
							<span>Aumenta tus ventas incluyendo más servicios</span>
						</Link>
					</div>
				</div>
			</div>
		);
	}
}

export default Ventas;

