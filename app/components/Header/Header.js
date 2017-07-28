import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';

import AuthStore from '../../stores/AuthStore';



class Header extends Component {

	constructor(props) {
		super(props);
	}

	static propTypes = {
		pathname: PropTypes.string.isRequired
	}

	state = {
		unreadCount: 0
	}

	componentDidMount() {
		//console.log('Header DID Mount', this.props)
	}

	componentWillReceiveProps(props) {
		//console.log('Header Rec Props', this.props)
	}

	render() {


		let authenticated = false;
		const user = AuthStore.user;

		if(user) {
			authenticated = true;
		}

		const { unreadCount } = this.state

		let isLoginPage = true;
		if(this.props.pathname.indexOf('/register') === 0) {
			isLoginPage = false;
		}

		return (

			<header className='header'>
				<div className='container'>
					<a
						href='#'
						className='logo'
					>
						<img src='/images/kogno-logo.png'/>
					</a>
					<ul className='nav'>
						<li>
							<a href=''>
								{'Mis Servicios'}
							</a>
						</li>
						<li>
							<a href=''>
								{'Mis Ventas'}
							</a>
						</li>
						<li>
							<a href=''>
								{'Perfil'}
							</a>
						</li>
						<li className='logout'>
							<Link to='signup'>
								<img src='/images/logout-icon.png'/>
							</Link>
						</li>
					</ul>
				</div>
			</header>
		)
	}
}

export default Header;

