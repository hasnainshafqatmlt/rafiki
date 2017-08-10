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
					{isAuthenticated && AuthStore.user.role === 'USER' &&
						<ul className='nav'>
							<li>
								<Link to='/servicios'>
									{'Mis Servicios'}
								</Link>
							</li>
							<li>
								<Link to='/ventas'>
									{'Mis Ventas'}
								</Link>
							</li>
							<li>
								<Link to='/perfil'>
									{'Perfil'}
								</Link>
							</li>
							<li className='logout'>
								<span onClick={this.logoutUser}>
									<img src='/images/logout-icon.png'/>
								</span>
							</li>						
						</ul>
					}

					{isAuthenticated && AuthStore.user.role === 'ADMIN' &&
						<ul className='nav'>
							<li>
								<Link to='/admin/servicios'>
									{'Servicios'}
								</Link>
							</li>
							<li>
								<Link to='/admin/usuarios'>
									{'Usuarios'}
								</Link>
							</li>
							<li>
								<Link to='/admin/perfil'>
									{'Perfil'}
								</Link>
							</li>
							<li className='logout'>
								<span onClick={this.logoutUser}>
									<img src='/images/logout-icon.png'/>
								</span>
							</li>						
						</ul>
					}

					{!isAuthenticated &&
						<ul className='nav'>
							<li>
								<Link to='/signup'>
									{'Signup'}
								</Link>
							</li>
						</ul>
					}
				</div>
			</header>
		)
	}
}

export default Header;

