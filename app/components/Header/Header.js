import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import ActionTypes from '../../constants/ActionTypes';
import AuthStore from '../../stores/AuthStore';
import AuthActionCreator from '../../actions/AuthActionCreator';
import {withRouter} from "react-router-dom";


class Header extends Component {

	constructor(props) {
		super(props);

		this.onChange = this.onChange.bind(this);
	}

	static propTypes = {
		pathname: PropTypes.string.isRequired,
		isAuthenticated: PropTypes.bool.isRequired,
	}

	componentDidMount() {
		$(document).ready(function(){
		    $('#menu-open').click(function(){
		      $(this).toggleClass('opened');
		      $('.mobile-menu').toggleClass('opened');
		      $('body').toggleClass('opened');
		    })
		    $('.mobile-menu').click(function() {
		    	$(this).removeClass('opened');
		    	$('.mobile-menu, body').removeClass('opened');
		    })
		})

		AuthStore.addChangeListener(this.onChange);
	}

	componentWillUnmount() {
		AuthStore.removeChangeListener(this.onChange);
	}

	logoutUser = (e) => {
		e.preventDefault();
		AuthActionCreator.logoutUser();
	}

	onChange() {		
		const action = AuthStore.getLastAction();
		console.log('this.props >>', this.props)
		if (action && action.type === ActionTypes.LOGOUT_SUCCESS) {
			this.props.history.push('/login')
		} 
	}

	render() {
		const { isAuthenticated, user } = this.props;

		return (

			<header className='header navbar-light'>
				<div className='container'>
					<button className="navbar-toggler navbar-toggler-right" type="button" id='menu-open'>
				    	<span className="navbar-toggler-icon"></span>
				  	</button>
					<Link
						to='/'
						className='logo'
					>
						<img src='/images/rafiki-logo.png'/>
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
								<Link to='http://www.marketing-digital.rafiki.co/'>
									{'Compra servicios'}
								</Link>
							</li>
							<li>
								<Link to='/login'>
									{'Iniciar sesión'}
								</Link>
							</li>
							<li>	
								<Link to='/signup' className='rounded-link'>
									{'Crea tu cuenta'}
								</Link>
							</li>
						</ul>
					}
				</div>

				<div className="mobile-menu">				  
				  	{isAuthenticated && AuthStore.user.role === 'USER' &&
				  		<div className="list-group">
							<Link to='/servicios' className='list-group-item list-group-item-action'>
								{'Mis Servicios'}
							</Link>
							<Link to='/ventas' className='list-group-item list-group-item-action'>
								{'Mis Ventas'}
							</Link>
							<Link to='/perfil' className='list-group-item list-group-item-action'>
								{'Perfil'}
							</Link>
							<a  href='/' onClick={this.logoutUser} className='list-group-item list-group-item-action'>
								{'Cerrar Sesión'}
							</a>
						</div>
					}

					{isAuthenticated && AuthStore.user.role === 'ADMIN' &&
						<div className="list-group">
							<Link to='/admin/servicios' className='list-group-item list-group-item-action'>
								{'Servicios'}
							</Link>
							<Link to='/admin/usuarios' className='list-group-item list-group-item-action'>
								{'Usuarios'}
							</Link>
							<Link to='/admin/perfil' className='list-group-item list-group-item-action'>
								{'Perfil'}
							</Link>
							<a  href='/' onClick={this.logoutUser} className='list-group-item list-group-item-action'>
								{'Cerrar Sesión'}
							</a>
						</div>
					}

					{!isAuthenticated &&
						<div className="list-group">
							<a href='#' className='list-group-item list-group-item-action'>
								{'Compra servicios'}
							</a>
							<Link to='/login' className='list-group-item list-group-item-action'>
								{'Iniciar sesión'}
							</Link>
							<Link to='/signup' className='list-group-item list-group-item-action'>
								{'Crea tu cuenta'}
							</Link>
						</div>
					}
				</div>
			</header>
		)
	}
}

export default withRouter(Header);

