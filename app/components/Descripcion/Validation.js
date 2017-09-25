import _ from 'lodash';

export default function validateField(state, fieldName, value) {

	let { formErrors } = state;
	let titleValid = false;
	let descriptionValid = false;
	let serviceListValid = false;
	let serviceTimeValid = false;

	switch(fieldName) {
		case 'title':
			titleValid = !_.isEmpty(value);
			formErrors.title = titleValid ? '' : 'Please enter title';
			break;
		case 'description':
			descriptionValid = !_.isEmpty(value);
			formErrors.description = descriptionValid ? '': 'Please enter description';			
			break;
		case 'serviceList':
			serviceListValid = !_.isEmpty(value);
			formErrors.serviceList = serviceListValid ? '': 'This field is required';			
			break;
		case 'serviceTime':
			serviceTimeValid = !_.isEmpty(value);
			formErrors.serviceTime = serviceTimeValid ? '': 'Please enter service time';			
			break;
		case 'price':
			formErrors.price = _.isEmpty(value) ? 'Please enter price': '';
			break;
		case 'fullName':
			formErrors.fullName = _.isEmpty(value) ? 'Please enter Name': '';
			break;
		case 'about':
			formErrors.about = _.isEmpty(value) ? 'Please enter about your self': '';
			break;
		case 'country':
			formErrors.country = _.isEmpty(value) ? 'Please select country': '';
			break;

		default:
			break;
	}

	return formErrors;

}
