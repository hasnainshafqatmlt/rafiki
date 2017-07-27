import React, { Component, PropTypes } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Helmet from 'react-helmet';


export default class Opportunities extends Component {
	render() {
		return (
			<div>
				<Helmet title="Opportunities" />
				<h3>Every Opportunities in the company or individual goes here</h3>
			</div>
		)
	}
}
