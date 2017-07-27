export default function validateField(state, fieldName, value) {

	let { formErrors, emailValid, firstNameValid, lastNameValid } = state;


	switch(fieldName) {
		case 'email':
			emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
			formErrors.email = emailValid ? '' : ' is invalid';
			break;
		case 'firstName':
			firstNameValid = value.length >= 6;
			formErrors.firstName = firstNameValid ? '': ' is too short';
			break;
		default:
			break;
	}
	console.log('here i am ')

	return {
		formErrors,
		emailValid,
		firstNameValid
	}

}
