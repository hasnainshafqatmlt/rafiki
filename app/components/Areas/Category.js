import React, { Component } from 'react';


class Category extends Component {

	constructor(props) {
	    super(props);

	    this.state = {
	    	activeClass: ''
	    };
	}

	static propTypes = {
	    categoryName: React.PropTypes.string,
	    id: React.PropTypes.number,
	    selectCategory: React.PropTypes.func,
	    categoryId: React.PropTypes.number
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.id === nextProps.categoryId) {
			this.setState({
				activeClass: 'active'
			})
		} else {
			this.setState({
				activeClass: ''
			})
		}
	}

	render() {
		return (
			<li
				key={`cat_${this.props.id}`}
				onClick={() => this.props.selectCategory(this.props.categoryName, this.props.id)}
				className={this.state.activeClass}
			>
				<i className='radio'/>
				<span>{this.props.categoryName}</span>
			</li>
		);
	}
}

export default Category;

