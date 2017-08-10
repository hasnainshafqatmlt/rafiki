import React, { Component } from 'react';


class SubCategory extends Component {

	constructor(props) {
	    super(props);

	    this.state = {
	    	activeClass: false,
	    };
	}

	static propTypes = {
	    id: React.PropTypes.number,
	    isSelected: React.PropTypes.bool,
	    name: React.PropTypes.string,
	    selectSubCategory: React.PropTypes.func,
	    selectedCatName: React.PropTypes.string
	}

	handleSubCategory = () => {
		this.props.selectSubCategory(this.props.selectedCatName, this.props.name, this.props.id)
		this.setState({
			activeClass: !this.state.activeClass
		});
	}

	render() {
		const isSelected = this.props.isSelected ? 'active' : '';
		return (
			<li
				key={`sub_${this.props.id}`}
				onClick={() => this.handleSubCategory()}
				className={isSelected}
			>
				<i className='rectangle'/>
				<span>{this.props.name}</span>
			</li>
		);
	}
}


export default SubCategory;

