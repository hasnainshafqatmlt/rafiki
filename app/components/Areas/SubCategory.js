import React, { Component } from 'react';
import RequestSubCategory from './RequestSubCategory';

class SubCategory extends Component {

	constructor(props) {
	    super(props);

	    this.state = {
	    	showSubCategory: ''
	    };
	}

	static propTypes = {
		selectedCatName: React.PropTypes.string,
	    subCat: React.PropTypes.object,
	    selectSubCategory: React.PropTypes.func,
	    subCatId: React.PropTypes.array,
	    selectedCategoryId: React.PropTypes.number,
	    categoryId: React.PropTypes.number
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.categoryId === nextProps.selectedCategoryId) {
			this.setState({
				showSubCategory: 'active'
			})
		} else {
			this.setState({
				showSubCategory: ''
			})
		}
	}

	render() {
		const subCat = this.props.subCat;
		const colClass = subCat.title1 ? 'col-sm-5' : 'col-sm-12';
		let subCategory = [];
		let subCategory2 = [];
		if (subCat.subCategory) {
			subCat.subCategory.forEach((name, i) => {
				if (subCat.title1 && i < 7) {
					subCategory.push(
						<RequestSubCategory
							key={`sublist_${i}`}
							id={i}
							name={name}
							categoryId={this.props.categoryId}
							selectSubCategory={this.props.selectSubCategory}
							selectedCategoryId={this.props.selectedCategoryId}
							subCatId={this.props.subCatId}
							selectedCatName={this.props.selectedCatName}
						/>
					)
				} else if (subCat.title1 && i > 6) {
					subCategory2.push(
						<RequestSubCategory
							key={`sublist_${i}`}
							id={i}
							name={name}
							categoryId={this.props.categoryId}
							selectSubCategory={this.props.selectSubCategory}
							selectedCategoryId={this.props.selectedCategoryId}
							subCatId={this.props.subCatId}
							selectedCatName={this.props.selectedCatName}
						/>
					)
				} else {
					subCategory.push(
						<RequestSubCategory
							key={`sublist_${i}`}
							id={i}
							name={name}
							categoryId={this.props.categoryId}
							selectSubCategory={this.props.selectSubCategory}
							selectedCategoryId={this.props.selectedCategoryId}
							subCatId={this.props.subCatId}
							selectedCatName={this.props.selectedCatName}
						/>
					)
				}
			})
		}
		return (
			<div className={`subcategory col-100 float-left ${this.state.showSubCategory}`}>
				<div className={`${colClass} float-left`}>
					{subCat.title1 &&
						<h3>{subCat.title1}</h3>
					}
					<ul className='list'>
						{subCategory}
					</ul>
				</div>
				{subCat.title2 &&
					<div className='col-sm-7 float-left'>
						<h3>{subCat.title1}</h3>
						<ul className='list'>
							{subCategory2}
						</ul>
					</div>
				}
			</div>
		);
	}
}


export default SubCategory;

