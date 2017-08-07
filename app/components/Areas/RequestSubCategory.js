import React, { Component } from 'react';


class SubCategory extends Component {

	constructor(props) {
	    super(props);

	    this.state = {
	    	activeClass: false,
	    	subCatId: this.props.subCatId
	    };
	}

	static propTypes = {
	    id: React.PropTypes.number,
	    name: React.PropTypes.string,
	    selectSubCategory: React.PropTypes.func,
	    subCatId: React.PropTypes.array,
	    categoryId: React.PropTypes.number,
	    selectedCatName: React.PropTypes.string
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			subCatId: nextProps.subCatId,
		})
	}

	handleSubCategory = () => {
		this.props.selectSubCategory(this.props.selectedCatName, this.props.name, this.props.id)
		this.setState({
			activeClass: !this.state.activeClass
		});
	}

	render() {
		const {subCatId, categoryId} = this.props;
		const setActive = this.state.activeClass ? 'active' : '';
		return (
			<li
				key={`sub_${this.props.id}`}
				onClick={() => this.handleSubCategory()}
				className={setActive}
			>
				<i className='rectangle'/>
				<span>{this.props.name}</span>
			</li>
		);
	}
}


export default SubCategory;

