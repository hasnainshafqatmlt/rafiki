import _ from 'lodash';
import {isEmail} from '../../utils/utils';

export default function validateField(state, fieldName, value) {

	let { formErrors } = state;
	let titleValid = false;
	let descriptionValid = false;

	switch(fieldName) {
		case 'description':
			descriptionValid = !_.isEmpty(value);
			formErrors.description = descriptionValid ? '': 'Please enter description';			
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
		case 'email':
			formErrors.email = isEmail(value) ? '': 'Please enter valid email';
			break;

		default:
			break;
	}

	return formErrors;

}
