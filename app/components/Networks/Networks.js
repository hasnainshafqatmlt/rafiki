import React, { Component, PropTypes } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Helmet from 'react-helmet';


export default class Networks extends Component {
	render() {
		return (
			<div>
				<Helmet title="Networks" />
				<h3>All Networks/Companies</h3>
			</div>
		)
	}
}
