import React, { Component, PropTypes } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Helmet from 'react-helmet';


export default class Startups extends Component {
	render() {
		return (
			<div>
				<Helmet title="Startups" />
				<h3>List Startups here</h3>
			</div>
		)
	}
}
