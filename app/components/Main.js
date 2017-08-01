import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';

// Component
import Header from './Header/Header';
import Footer from './Footer/Footer';

import Config from '../config/Config';


class Main extends Component {

	constructor() {
		super();
	}

	static propTypes = {
		children: PropTypes.array.isRequired,
		location: PropTypes.object,
		routes: PropTypes.array,
	}

	componentDidMount() {
		const { location, routes } = this.props;
		this.updateTitle();
	}

	componentDidUpdate() {
		this.updateTitle();	
	}

	updateTitle() {
		console.log('this.props', this.props)
		const pathname = this.props.location.pathname;
		document.title = pathname.split('/')[1];
	}

	render() {
		//console.log('MAIN: this.props.location', this.props.location)
		let bgClass;
		let container;
		if (this.props.location.pathname == '/login') {
			bgClass = 'login-page'
		} else if (this.props.location.pathname == '/register') {
			bgClass = 'register-page'
		} else {
			container = 'container'
		}

		return (
			<div className={`app col-100`}>
				<Helmet {...Config.App.head} />
				<Header pathname={this.props.location.pathname}/>
				<div className={`col-100 h-100 float-left ${bgClass}`}>
					{this.props.children}
				</div>
				<Footer />
			</div>
		);
	}
}

export default Main;

