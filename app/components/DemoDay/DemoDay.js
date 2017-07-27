import React, { Component, PropTypes } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Helmet from 'react-helmet';


export default class DemoDay extends Component {
	render() {
		return (
			<div>
				<Helmet title="Demo Day" />
				<h3>Demo day goes here</h3>
			</div>
		)
	}
}
