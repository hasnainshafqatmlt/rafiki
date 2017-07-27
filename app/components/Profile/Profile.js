import React, { Component, PropTypes } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import Helmet from 'react-helmet'

import UserActionCreator from '../../actions/UserActionCreator';
import AuthStore from '../../stores/AuthStore';
import UserStore from '../../stores/UserStore';
import ActionTypes from '../../constants/ActionTypes';

import Sidebar from '../Sidebar/Sidebar'

import { getDisposition } from '../../helpers/Helper'


class Profile extends Component {
	constructor () {
		super();
	}

    state = this.setDefaultState()

    setDefaultState() {
        return {
            isCurrentUser: false,
            loading: true,
            user: UserStore.user
        }
    }

    componentDidMount() {
    	UserStore.addChangeListener(this.handleUserStoreChange);

        const { username } = this.props.match.params;
        UserActionCreator.getProfile(username);
    }

    componentWillUnmount() {
        UserStore.removeChangeListener(this.handleUserStoreChange);
    }

    componentWillReceiveProps(nextProps) {
    	this.setState(this.setDefaultState());

        const { username } = nextProps.match.params;
        UserActionCreator.getProfile(username);
    }

    handleUserStoreChange = () => {
        const state = this.state;
        const currentUser = AuthStore.user;
        let error = UserStore._error;
        let action = UserStore.getLastAction();
        let isCurrentUser = false;

        if (action.type === ActionTypes.GET_PROFILE_SUCCESS) {
            var user = UserStore.user

            if (user._id === currentUser._id) {
                isCurrentUser = true;
            }


            this.setState({
            	user,
            	currentUser,
            	isCurrentUser,
            	loading: false,
            	positions: []
            })


        } else if (action.type === ActionTypes.GET_PROFILE_ERROR) {
            if (error) {
                if (typeof error === 'object') {
                    if (error.statusCode === 404) {
                        Link.changeLocation('/404');
                    } else {
                        Link.changeLocation('/error'); //some other error
                    }
                } else { //unknown error, must be boolean
                    Link.changeLocation('/error'); //some other error
                }
            }
        }
    }

    handleError = (msg) => {
        this.setState({
            showLoader: false
        });
        console.log('ERROR in PROFILE: ', msg);;
    }

    toggleMessageNotification() {
	    this.props.setMessageNotification(!this.state.user.receiveNotification)
	}

	messageUser() {
		// TODO: Socket sending messages!
	}

	canAccessInvestorLounge = () => {
		const roles = this.state.currentUser.roles
		return roles.indexOf('ADMIN') >= 0 || roles.indexOf('MENTOR') >= 0 || roles.indexOf('INVESTOR') >= 0
	}



	render() {

		const { username } = this.props.match.params;
		const { currentUser, isCurrentUser } = this.state;
		let { user } = this.state

		if (this.state.loading || !this.state.user) {
			return <div />
		}


		user.dispositions = user.dispositions || []

		const updatedAt = new Date(user.updatedAt).getTime()

		const dispositions = user.dispositions.map((dp) => (
			<li className='disposition' key={dp}>
				{getDisposition(dp)}
			</li>
		))

		const positions = this.state.positions.map((po) => {

			const { Company: company, Position: position } = po

			return (
				<div className='positionContainer media' key={po.id}>
					<div className='logo media-left'>
						<Link to={`/c/${company.slug}`}>
							<img className="media-object" src={`/api/v1/companies/${company.id}/logo`} />
						</Link>
					</div>

					<div className='media-body'>
						<div>
							<span className='position'>{position.name}</span> at
						</div>

						<div className='companyName'>
							<Link to={`/c/${company.slug}`}>
								{company.name}
							</Link>
						</div>

						<div className='companyUrl'>
							<Link to={`/c/${company.slug}`}>
								app.inseaders.vc/c/{company.slug}
							</Link>
						</div>

						<div className='companyDesc'>
							{company.description}
						</div>
					</div>
				</div>
			)
		})

		let back = null

		if (window.previousLocation && window.previousLocation.pathname === '/members') {
			back = (
				<div className='back' onClick={() => this.props.goBack()}>
					<span className='icon-arrow-left-circle' />
					<span>Back to Members</span>
				</div>
			)
		}

		return (
			<Grid className='profile' fluid>
				<Helmet title="The global venture booster for INSEAD" />

				<Row>
					<Col xs={12} md={9}>
						{back}

						<div className='card'>
							<img src={`/api/v1/users/${user.id}/avatar?upd=${updatedAt}`} className='avatar' />

							<div className='fullName'>
								{user.firstName} {user.lastName}
							</div>

							<div className='slashContainer'>
								<span>INSEADER / </span>
								<span className='slash'>{user.slash}</span>
							</div>

							<div className='location'>
								<span className='icon-location-pin mapIcon' />
								{user.location ? user.location : '-'}
							</div>

							<div className='url'>
								app.inseaders.vc/p/{username}
							</div>

							<div className='desc'>
								{user.bio}
							</div>

							<ul className='dispositions'>
								{dispositions}
							</ul>

							<hr />

							<div className='prof'>
								Professional information
							</div>

							{this.state.positions.length > 0 ?
								positions
								:
								<div>No positions added yet</div>
							}
						</div>
					</Col>

					<Col xs={12} md={3}>

						<Sidebar navigate paddingTop={back !== null}>
							{isCurrentUser &&
								<Sidebar.Item
									text="Edit my profile"
									icon="note"
									to={`/p/${username}/edit`}
								/>
							}
							{isCurrentUser &&
								<Sidebar.Item
									text={`Turn ${user.receiveNotification ? 'off' : 'on'} message notification`}
									icon="note"
									handleClick={this.toggleMessageNotification.bind(this)}
								/>
							}
							{!isCurrentUser &&
								<Sidebar.Item
									text="Message member"
									icon="bubbles"
									handleClick={this.messageUser.bind(this)}
								/>
							}
							{currentUser.roles.indexOf('ADMIN') >= 0 &&
								<Sidebar.Item
									text="Submit demo day"
									icon="rocket"
									to="/demo-day/admin"
								/>
							}
							{this.canAccessInvestorLounge() &&
								<Sidebar.Item
									text="Investor lounge"
									icon="rocket"
									to="/investor-lounge"
								/>
							}
						</Sidebar>

					</Col>
				</Row>
			</Grid>
		)

	}
}

export default Profile;
