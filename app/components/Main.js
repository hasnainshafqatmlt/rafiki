import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';

// Component
import Header from './Header/Header';
import Footer from './Footer/Footer';

import AuthStore from '../stores/AuthStore';

import Config from '../config/Config';


class Main extends Component {

	constructor() {
		super();

		// this.state = {
		// 	isAuthenticated: !!AuthStore.user,
		// 	user: AuthStore.user
		// }
	}

	static propTypes = {
		children: PropTypes.array.isRequired,
		location: PropTypes.object,
		routes: PropTypes.array,
	}


	componentDidMount() {
		const { location, routes } = this.props;
		this.updateTitle();

		console.log('HEADER MOUNT')
		// AuthStore.addChangeListener(this.handleChange);
	}

	componentDidUpdate() {
		console.log('HEADER UPDATE')
		this.updateTitle();
	}

	componentWillUnmount() {
		console.log('HEADER UN-MOUNT')
		//AuthStore.removeChangeListener(this.handleChange);
	}

	updateTitle() {
		const pathname = this.props.location.pathname;
		document.title = pathname.split('/')[1];
	}

	// handleChange = () => {

	// 	let isAuthenticated = false;
	// 	const user = this.state.user;
	// 	if(user) {
	// 		this.setState({
	// 			isAuthenticated: true,
	// 			user
	// 		});
	// 	} else {
	// 		if(
	// 			this.props.location.pathname != '/login' &&
	// 			this.props.location.pathname != '/signup' &&
	// 			this.props.location.pathname != '/forgot'
	// 		) {
	// 			window.location = "/";
	// 		}
	// 	}

	// }


	render() {
		//console.log('MAIN: this.props.location', this.props.location)
		let bgClass;
		let container;
		// if (this.props.location.pathname == '/login') {
		// 	bgClass = 'login-page'
		// } else if (this.props.location.pathname == '/register') {
		// 	bgClass = 'register-page'
		// } else {
		// 	container = 'container'
		// }

		let isAuthenticated = false;
		const user = AuthStore.user;

		if(user) {
			isAuthenticated = true;
		}

		//const { user, isAuthenticated } = this.state;


		return (
			<div className={`app col-100`}>
				<Helmet {...Config.App.head} />
				<Header pathname={this.props.location.pathname} isAuthenticated={isAuthenticated} user={user}/>
				<div className={`col-100 h-100 float-left ${bgClass}`}>
					{this.props.children}
				</div>
				<Footer />
			</div>
		);
	}
}

export default Main;

