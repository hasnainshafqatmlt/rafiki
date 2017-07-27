export default function validateField(state, fieldName, value) {

	let { formErrors, emailValid, passwordValid } = state;

	switch(fieldName) {
		case 'email':
			emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
			formErrors.email = emailValid ? '' : ' is invalid';
			break;
		case 'password':
			passwordValid = value.length >= 6;
			formErrors.password = passwordValid ? '': ' is too short';
			break;
		default:
			break;
	}
	console.log('here i am ')

	return {
		formErrors,
		emailValid,
		passwordValid
	}

}
