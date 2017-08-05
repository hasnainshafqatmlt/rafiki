import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import QueryString from 'query-string';

import Helmet from 'react-helmet'
import RegisterActionCreator from '../../actions/RegisterActionCreator';
import RegistrationStore from '../../stores/RegistrationStore';
import AuthStore from '../../stores/AuthStore';
import ActionTypes from '../../constants/ActionTypes';

import Config from '../../config/Config';

import Validation from './Validation';

class SignupStep2 extends Component {

	constructor(props) {
		super(props);

		const query = QueryString.parse(this.props.location.search);
		const id = query.id;
		const code = query.code;

		this.state = {
			id,
			code,
			errorMsg: ''
		};
	}

	static propTypes = {
		id: PropTypes.string.isRequired,
		code: PropTypes.string.isRequired
	}

	componentDidMount() {
		const { code, id } = this.state;
		const isLoggedIn = AuthStore.isLoggedIn();
		RegistrationStore.addChangeListener(this.handleStoreChange);

		if (isLoggedIn) {
			this.props.history.push('/')
		} else {
			RegisterActionCreator.registerStep2(id, code);
		}
	}

	componentWillUnmount() {
		RegistrationStore.removeChangeListener(this.handleStoreChange);
	}

	handleStoreChange = () => {
		this.setState({
			loading: false,
		});

		const action = RegistrationStore.getLastAction();
		const error = RegistrationStore.error;

		if (action && action.type === ActionTypes.SIGNUP_STEP2_SUCCESS) {
			this.props.history.push('/login')

		} else if (action && (action.type === ActionTypes.SIGNUP_STEP2_ERROR) ) {
			this.setState({
				errorMsg: error,
			})
		}
	}

	render() {

		const { form, loading, errorMsg, showForm } = this.state

		return (
			<div className="signup-block">
				<div className='container message'>
					<h1 className='col-sm-12 text-center'>{this.state.errorMsg}</h1>
					<div className='col-sm-12 form'>
						{!this.state.errorMsg && <small>verifying....</small>}
					</div>

					{this.state.errorMsg && <p className='text-center'>
					 	{'¿Eres nuevo?  '}
					 	<Link to='/signup'>
					 		{'Crea tu cuenta'}
					 	</Link>
					 </p>
					}
					{this.state.errorMsg &&
					 <p className='text-center t-8'>
					 	<Link to='/forgot'>
					 		{'¿Olvidaste tu clave?'}
					 	</Link>
					 </p>
					}
				</div>

			</div>
		);
	}
}

export default SignupStep2;

