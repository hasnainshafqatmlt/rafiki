import React, { Component } from 'react';

class App extends Component {

	componentDidMount() {
		this.props.history.push('/login')
	}
	render () {
		return (
			<div/>
		);
	}
};

export default App;
