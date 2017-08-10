import React, { Component } from 'react';


class Category extends Component {

	constructor(props) {
	    super(props);

	    this.state = {
	    	activeClass: ''
	    };
	}

	static propTypes = {
		isSelected: React.PropTypes.bool,
	    categoryName: React.PropTypes.string,
	    id: React.PropTypes.number,
	    selectCategory: React.PropTypes.func
	}

	render() {
		const isSelected = this.props.isSelected ? 'active' : '';
		return (
			<li
				key={`cat_${this.props.id}`}
				onClick={() => this.props.selectCategory(this.props.categoryName, this.props.id)}
				className={isSelected}
			>
				<i className='radio'/>
				<span>{this.props.categoryName}</span>
			</li>
		);
	}
}

export default Category;

