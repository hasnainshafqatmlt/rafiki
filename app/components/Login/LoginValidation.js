export default function validateField(state, fieldName, value) {

	let { formErrors, emailValid, passwordValid } = state;

	switch(fieldName) {
		case 'email':
			emailValid = (/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i).test(value);
			formErrors.email = emailValid ? '' : ' is invalid';
			break;
		case 'password':
			passwordValid = value.length >= 2;
			formErrors.password = passwordValid ? '': ' is too short';
			break;
		default:
			break;
	}

	return {
		formErrors,
		emailValid,
		passwordValid
	}

}
