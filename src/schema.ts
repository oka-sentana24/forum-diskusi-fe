import * as yup from 'yup';

const schema = yup.object().shape({
	email: yup.string().required('Email is required').email('Email is invalid'),
	password: yup.string().required('Password is required'),
	confirmPassword: yup
		.string()
		.required('Please confirm your password')
		.oneOf([yup.ref('password'), null], 'Passwords do not match'),
	hobby: yup.string().required('Hobby is required'),

	checkbox: yup
		.bool()
		.required('Checkbox must be accepted')
		.oneOf([true], 'Checkbox must be accepted')
});

export default schema;
