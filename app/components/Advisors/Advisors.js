import React, { Component, PropTypes } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Helmet from 'react-helmet';


export default class Advisors extends Component {
	render() {
		return (
			<div>
				<Helmet title="Advisors" />
				<h3>Advisors listing</h3>
			</div>
		)
	}
}
