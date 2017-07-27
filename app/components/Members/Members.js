import React, { Component, PropTypes } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { Grid, Row, Col, DropdownButton } from 'react-bootstrap'
import Helmet from 'react-helmet';
import queryString from 'query-string';
import _ from 'lodash';

import UserActionCreator from '../../actions/UserActionCreator';
import AuthStore from '../../stores/AuthStore';
import UserStore from '../../stores/UserStore';
import ActionTypes from '../../constants/ActionTypes';

import Sidebar from '../Sidebar/Sidebar'
import { UserDispositions } from '../../helpers/AppConstants'


class Members extends Component {
	constructor (props) {
		super(props);
		console.log('Super', this.props, this.state)
	}

    state = this.setDefaultState()

    setDefaultState() {
    	let query = {};
    	if(this.props) {
    		const query = queryString.parse(this.props.location.search);
    	}

    	console.log('setDefaultState', this.props)
        query = queryString.parse(this.props.location.search);
		const q = query.q
		const d = query.d || ['ENTREPRENEUR', 'VC', 'BUSINESS_ANGEL', 'ADVISOR', 'CONTRIBUTOR'];

		return {
			query: q,
			dispositions: d,
			//loading: q || d.length < 5,
			loading: true,
			members: []
		}

		//console.log('Super State', this.state)
    }

    componentDidMount() {
        console.log('DID MOUNT MEMBERS', this.props.location.search)
    	UserStore.addChangeListener(this.handleUserStoreChange);

        const query = queryString.parse(this.props.location.search);
        //this.setDefaultState();
        UserActionCreator.getMembers(this.state.query, this.state.dispositions, this.state.members.length)

        // Handle scroll and load more
        window.addEventListener('scroll', this.handleScroll)
    }

    componentWillUnmount() {
    	console.log('MEMBER UNMOUNT');
        UserStore.removeChangeListener(this.handleUserStoreChange);

        // Handle scroll and load more
		window.removeEventListener('scroll', this.handleScroll)
		if (this.unsubscribe) {
			this.unsubscribe()
		}
    }

    componentWillReceiveProps(nextProps) {
		//console.log('REC PROP MEMBERS: nextProps', nextProps)
    	//this.setDefaultState();

        UserActionCreator.getMembers(this.state.query, this.state.dispositions)
    }

	loadMore = () => {
		// console.log('Load More: ', this.state.members.length, this.state)
		this.setState({
        	loading: true
        })
		UserActionCreator.getMembers(this.state.query, this.state.dispositions, this.state.members.length)
	}

    handleUserStoreChange = () => {
        const state = this.state;
        let error = UserStore._error;
        let action = UserStore.getLastAction();
        const currentUser = AuthStore.user;

        if (action.type === ActionTypes.GET_MEMBERS_SUCCESS) {
            const members = UserStore.members

            this.setState({
            	currentUser,
            	members,
            	loading: false,
            	positions: []
            })


        } else if (action.type === ActionTypes.GET_MEMBERS_ERROR) {
            if (error) {
                console.log('Loading error', error)
            }
            this.setState({
            	loading: false
            })
        }
    }

    handleError = (msg) => {
        this.setState({
            showLoader: false
        });
    }

	handleSearch = (evt) => {
		if (evt) {
			evt.preventDefault()
		}

		const query = this.state.query
		const dispositions = _.isString(this.state.dispositions) ? [this.state.dispositions] : this.state.dispositions
		const urlQuery = queryString.parse(this.props.location.search)


		// if already chosen 5 dispositions, and no query, means its notmal listing members
		if (!query && dispositions.length === 5) {
			if (urlQuery.q || urlQuery.d) {
				this.props.history.push(`/members`)
			}
			return
		}

		UserStore.clearMembers();
		this.props.history.push(`/members?${queryString.stringify({ q: query, d: dispositions })}`)
	}

	handleCheckboxChange = (evt) => {
		if (evt.target.checked) {
			this.setState({ dispositions: [evt.target.value].concat(this.state.dispositions) })
		} else {
			this.setState({ dispositions: _.without(this.state.dispositions, evt.target.value) })
		}
	}

	clearSearch = () => {
		this.setState({
			query: ''
		}, () => this.handleSearch())
	}



	render() {

		//console.log('Members Render', this.props, this.state.members.length)
		let { members, currentUser, loading, query } = this.state

		const users = members.map((user) => (
			<div className={'user col-xs-6 col-sm-4 col-md-3'} key={user._id}>
				<Link to={`/p/${user.username}`}>
					<div className={'userAvatar'}>
						<img src={`/api/v1/users/${user._id}/avatar`} />
					</div>
				</Link>
				<Link to={`/p/${user.username}`}>
					<div className={'userName'}>{user.firstName} {user.lastName}</div>
				</Link>
				<div className={'userSlash'}>{user.slash ? user.slash : '-'}</div>
				<div className={'userLocation'}>
					<span className="icon-location-pin" />
					&nbsp;
					{user.location ? user.location : '-'}
				</div>
			</div>
		))

		return (
			<Grid className={'allUsers'} fluid>
				<Helmet title="The global venture booster for INSEAD" />

				<Row>
					<Col xs={12} md={9}>
						<div className={'heading'}>
							<div className={'icon-people'} ></div>
							<div className={'headingText'}>Members</div>
							<div className={'subHeading'}>Stars of the INSEADERS galaxy</div>
						</div>


						<div style={{clear: 'both'}} />

						<hr />

						<div className={'searchBar'}>
							<form onSubmit={this.handleSearch}>
								<input
									type="text"
									className={'form-control col-xs-12 col-sm-4 col-md-4 searchInput'}
									placeholder="Search name, slash, location ..."
									defaultValue={this.props.location.query}
									name="q"
									value={this.state.query}
									onChange={(evt) => this.setState({ query: evt.target.value })}
								/>

								<DropdownButton
									bsStyle="link"
									title="Active mode"
									id="dd-dispositions"
								>
									<li role="presentation" onClick={(evt) => evt.nativeEvent.stopImmediatePropagation()}>
										<a role="menuitem">
											<label style={{ width: '100%' }}>
												<input
													type="checkbox"
													name="d"
													value="ENTREPRENEUR"
													id="d-entrepreneur"
													checked={this.state.dispositions.indexOf('ENTREPRENEUR') >= 0}
													onChange={this.handleCheckboxChange}
												/>
												&nbsp;
												Entrepreneur
											</label>
										</a>
									</li>
									<li role="presentation" onClick={(evt) => evt.nativeEvent.stopImmediatePropagation()}>
										<a role="menuitem">
											<label style={{ width: '100%' }}>
												<input
													type="checkbox"
													name="d"
													value="VC"
													id="d-vc"
													checked={this.state.dispositions.indexOf('VC') >= 0}
													onChange={this.handleCheckboxChange}
												/>
												&nbsp;
												VC
											</label>
										</a>
									</li>
									<li role="presentation" onClick={(evt) => evt.nativeEvent.stopImmediatePropagation()}>
										<a role="menuitem">
											<label style={{ width: '100%' }}>
												<input
													type="checkbox"
													name="d"
													value="BUSINESS_ANGEL"
													id="d-business-angel"
													checked={this.state.dispositions.indexOf('BUSINESS_ANGEL') >= 0}
													onChange={this.handleCheckboxChange}
												/>
												&nbsp;
												Business angel
											</label>
										</a>
									</li>
									<li role="presentation" onClick={(evt) => evt.nativeEvent.stopImmediatePropagation()}>
										<a role="menuitem">
											<label style={{ width: '100%' }}>
												<input
													type="checkbox"
													name="d"
													value="ADVISOR"
													id="d-advisor"
													checked={this.state.dispositions.indexOf('ADVISOR') >= 0}
													onChange={this.handleCheckboxChange}
												/>
												&nbsp;
												Advisor
											</label>
										</a>
									</li>
									<li role="presentation" onClick={(evt) => evt.nativeEvent.stopImmediatePropagation()}>
										<a role="menuitem">
											<label style={{ width: '100%' }}>
												<input
													type="checkbox"
													name="d"
													value="CONTRIBUTOR"
													id="d-contributor"
													checked={this.state.dispositions.indexOf('CONTRIBUTOR') >= 0}
													onChange={this.handleCheckboxChange}
												/>
												&nbsp;
												Contributor
											</label>
										</a>
									</li>
								</DropdownButton>

								<button type="submit" className={'submitBtn btn btn-primary'}>Search</button>
							</form>
						</div>

						<div style={{clear: 'both'}} />

						{members.length !== 0 &&
							<div className={'users row'}>
								{users}
							</div>
						}
						{!loading && members.length === 0 &&
							<div className={'noResult row'}>
								<div className="icon-ghost" />
								<div>There is no result for "{query}"</div>
							</div>
						}
						{!loading && members.length != 0 &&
						<div className="col-md-12 text-center">
							<button className="btn btn-primary" onClick={this.loadMore} > Load More </button>
						</div>
						}
						{loading &&
							<div className={'loading'}>
								<img src="/images/loading.gif" />
							</div>
						}
					</Col>


					<Col xs={12} md={3}>
						<Sidebar navigate active="members">
							{currentUser && currentUser.roles.indexOf('ADMIN') >= 0 &&
								<Sidebar.Item
									text="Invite non-INSEAD member"
									icon="plus"
									to="/add-pt-user"
								/>
							}
							{currentUser && currentUser.roles.indexOf('ADMIN') >= 0 &&
								<Sidebar.Item
									text="Manage permissions"
									icon="lock"
									to="/permissions"
								/>
							}
						</Sidebar>
					</Col>
				</Row>
			</Grid>
		)
	}
}

export default Members;
