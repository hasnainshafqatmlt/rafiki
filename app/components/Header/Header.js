import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Dropdown } from 'react-bootstrap'

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

			<header className={ `navBar navbar navbar-default`}>
				<div className='container'>
					<Link
						to="/"
						className='brand-logo'
					>
						<img src="/images/full-black-green.png" className='web' width='170' />
						<img src="/images/a-black-green.png" className='mob' width='21'/>
					</Link>

					<Navbar.Collapse>
						<Nav pullLeft>
							{authenticated &&
								<Link to="/incubatee-pricing" className={'btn btn-primary hidden-md hidden-lg incBtn'}>Incubatee registration</Link>
							}
						</Nav>
						<Nav className='right-nav' pullRight>
							{authenticated &&
								<li>
									<Link to={`/demo-day`} className='navItem'>
									Demo Day
									</Link>
								</li>
							}
							{authenticated &&
								<li role="presentation" className='navItem'>
									<Dropdown id="ourworld-dropdown">
										<Dropdown.Toggle bsStyle="link">
											Our world
										</Dropdown.Toggle>
										<Dropdown.Menu>
											<li>
												<Link to={`/members`}>
													Members
												</Link>
											</li>
											<li>
												<Link to={`/networks`}>
													Networks
												</Link>
											</li>
											<li>
												<Link to={`/startups`}>
													Startups
												</Link>
											</li>
											<li>
												<Link to={`/advisors`}>
													Advisors
												</Link>
											</li>
										</Dropdown.Menu>
									</Dropdown>
								</li>
							}
							{authenticated &&
								<li>
									<Link to={`/opportunities`} className='navItem'>
										Opportunities
									</Link>
								</li>
							}
							{authenticated &&
								<li>
									<Link to={`/discussions`} className='navItem'>
										Lounge Chats
									</Link>
								</li>
							}
							{authenticated && user && user.email ?
								<li role="presentation" className='navItem'>
									<Dropdown id="profile-dropdown">
										<Dropdown.Toggle bsStyle="link">
											<span className='profile'>
												{user.firstName} {user.lastName}
											</span>

											{unreadCount > 0 &&
												<span className='unreadCount'>{unreadCount}</span>
											}

											<img src={`/api/v1/users/${user.id}/avatar`} className='avatar' style={{maxHeight: '2.5rem'}} />
										</Dropdown.Toggle>
										<Dropdown.Menu>
											<li>
												<Link to={`/p/${user.username}`}>
													Profile
												</Link>
											</li>
											<li>
												<Link to={`/messages`}>
													Messages
													{unreadCount > 0 &&
													<span className={'unreadCount menu'}>{unreadCount}</span>
													}
												</Link>
											</li>
											<li>
												<Link to={`/startups/my`}>
													My startups
												</Link>
											</li>
											<li role="separator" className="divider pull-left col-100"></li>
											<li>
												<Link to={`/logout`}>
													Logout
												</Link>
											</li>
										</Dropdown.Menu>
									</Dropdown>
								</li>
								:
								isLoginPage ?
									<li>
										<Link to="/register" className='signup-link'>
											<img src='/images/profile-icon@2x.png'/>
											{'Sign Up'}
										</Link>
									</li>
									:
									<li>
										<Link to="/login" className='signup-link'>
											<img src='/images/profile-icon@2x.png'/>
											{'Login'}
										</Link>
									</li>

							}
						</Nav>
					</Navbar.Collapse>
				</div>
			</header>
		)
	}
}

export default Header;

