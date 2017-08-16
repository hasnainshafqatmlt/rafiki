import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';

// Component
import Header from './Header/Header';
import Footer from './Footer/Footer';

import AuthStore from '../stores/AuthStore';

import Config from '../config/Config';


class Main extends Component {

	static propTypes = {
		children: PropTypes.array.isRequired,
		location: PropTypes.object,
		routes: PropTypes.array,
	}


	componentDidMount() {
		const { location, routes } = this.props;
		this.updateTitle();

		console.log('HEADER MOUNT')
	}

	componentDidUpdate() {
		console.log('HEADER UPDATE')
		this.updateTitle();
	}

	toTitleCase(str) {
	    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	}

	updateTitle() {
		const pathname = this.props.location.pathname;
		document.title = `Kogno - ${this.toTitleCase(pathname.split('/')[1])}`;
	}


	render() {
		let isAuthenticated = false;
		const user = AuthStore.user;

		if(user) {
			isAuthenticated = true;
		}

		return (
			<div className={`app col-100 h-100`}>
				<Helmet {...Config.App.head} />
				<Header pathname={this.props.location.pathname} isAuthenticated={isAuthenticated} user={user} />
				<div className={`col-100 float-left main-wrap`}>
					{this.props.children}
				</div>
				{(isAuthenticated && AuthStore.user.role === 'USER' || this.props.location.pathname === '/') &&
					<Footer />
				}
			</div>
		);
	}
}

export default Main;

