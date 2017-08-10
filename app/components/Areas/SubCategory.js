import React, { Component } from 'react';
import RequestSubCategory from './RequestSubCategory';
import _ from 'lodash';

class SubCategory extends Component {

	constructor(props) {
	    super(props);

	    this.state = {

	    };
	}

	static propTypes = {
		selectedCat: React.PropTypes.object,
		selectedCatName: React.PropTypes.string,
	    subCat: React.PropTypes.object,
	    selectSubCategory: React.PropTypes.func,
	    showSubCategory: React.PropTypes.bool
	}

	render() {
		const selectedCat = this.props.selectedCat;
		const subCat = this.props.subCat;
		const colClass = subCat.title1 ? 'col-sm-5' : 'col-sm-12';
		const showSubCategory = this.props.showSubCategory ? 'active' : '';
		let subCategory = [];
		let subCategory2 = [];
		//console.log('selectedCat', selectedCat)
		if (subCat.subCategory) {
			subCat.subCategory.forEach((name, i) => {
				let isSelected = false;			
				if (selectedCat && selectedCat.subCat.length > 0) {
					const isFound = _.find(selectedCat.subCat, function(o) {
						//console.log('0', o, '<>', name)
						return o === name;
					});
					if (isFound) {isSelected = true;}
					//console.log('isFound >>', isFound, '==', isSelected)
				}				

				if (subCat.title1 && i < 7) {
					subCategory.push(
						<RequestSubCategory
							key={`sublist_${i}`}
							isSelected={isSelected}
							id={i}
							name={name}
							selectSubCategory={this.props.selectSubCategory}
							selectedCatName={this.props.selectedCatName}
						/>
					)
				} else if (subCat.title1 && i > 6) {
					subCategory2.push(
						<RequestSubCategory
							key={`sublist_${i}`}
							isSelected={isSelected}
							id={i}
							name={name}
							selectSubCategory={this.props.selectSubCategory}
							selectedCatName={this.props.selectedCatName}
						/>
					)
				} else {
					subCategory.push(
						<RequestSubCategory
							key={`sublist_${i}`}
							isSelected={isSelected}
							id={i}
							name={name}
							selectSubCategory={this.props.selectSubCategory}
							selectedCatName={this.props.selectedCatName}
						/>
					)
				}
			})
		}
		return (
			<div className={`subcategory col-100 float-left ${showSubCategory}`}>
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
						<h3>{subCat.title2}</h3>
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

