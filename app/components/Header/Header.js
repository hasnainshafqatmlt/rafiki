import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';

import AuthStore from '../../stores/AuthStore';



class Header extends Component {

	constructor(props) {
		super(props);
	}

	static propTypes = {
		pathname: PropTypes.string.isRequired,
		isAuthenticated: PropTypes.bool.isRequired,
	}

	componentDidMount() {
		//console.log('Header DID Mount', this.props)
	}

	componentWillReceiveProps(props) {
		//console.log('Header Rec Props', this.props)
	}

	logoutUser = () => {
		AuthStore.logoutUser();
	}

	render() {


		const { isAuthenticated, user } = this.props;

		return (

			<header className='header'>
				<div className='container'>
					<Link
						to='/'
						className='logo'
					>
						<img src='/images/kogno-logo.png'/>
					</Link>
					<ul className='nav'>

						{isAuthenticated && <li>
							<Link to='/servicios'>
								{'Mis Servicios'}
							</Link>
						</li>
						}
						{isAuthenticated &&
						<li>
							<Link to='/ventas'>
								{'Mis Ventas'}
							</Link>
						</li>
						}
						{isAuthenticated &&
						<li>
							<Link to='/perfil'>
								{'Perfil'}
							</Link>
						</li>
						}

						{isAuthenticated &&
						<li className='/logout'>
							<span onClick={this.logoutUser}>
								<img src='/images/logout-icon.png'/>Logout
							</span>
						</li>
						}

						{!isAuthenticated &&
						<li className='/logout'>
							<Link to='/signup'>
								<img src='/images/logout-icon.png'/>
							</Link>
						</li>
						}
					</ul>
				</div>
			</header>
		)
	}
}

export default Header;

