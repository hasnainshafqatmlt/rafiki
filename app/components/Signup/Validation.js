export default function validateField(state, fieldName, value) {

	let { form } = state;
	let { valid, errors } = form;

	switch(fieldName) {
		case 'email':
			valid.email = (/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i).test(value);
			errors.email = valid.email ? '': 'Invalid email';
			break;
		case 'password':
			valid.password = value.length >= 4;
			errors.password = valid.password ? '': ' is too short';
			break;
		default:
			break;

	}
	form.valid = valid
	form.errors = errors

	return {
		form
	}

}
