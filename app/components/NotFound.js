import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router-dom';

import AuthStore from '../stores/AuthStore';

export default class NotFound extends Component {

	render() {
		const user = AuthStore.user;
		return (
			<div>
				<h2>Page not found</h2>
				<Link to={`/p/${user.username}`}>Go to profile</Link>
			</div>
		)
	}
}
