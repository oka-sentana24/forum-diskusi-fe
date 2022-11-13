import * as yup from 'yup';

// const schema = yup.object().shape({
// 	username: yup
// 		.string()
// 		.min(0, 'Minimal value 0')
// 		.max(30, 'Maximum value 30')
// 		.matches(/^([0]([.][0-9]+)?|[1-9]([0-9]+)?([.][0-9]+)?)$/, {
// 			message: 'Inccorect format. Example 25 or 25.1',
// 			excludeEmptyString: true
// 		})
// 		.required('Username is required'),
// 	email: yup.string().required('Email is required').email('Email is invalid'),
// 	password: yup.string().required('Password is required'),
// 	confirmPassword: yup
// 		.string()
// 		.required('Please confirm your password')
// 		.oneOf([yup.ref('password'), null], 'Passwords do not match'),
// 	hobby: yup.string().required('Hobby is required'),

// 	checkbox: yup
// 		.bool()
// 		.required('Checkbox must be accepted')
// 		.oneOf([true], 'Checkbox must be accepted')
// });

const schema = yup.object().shape({
	name: yup.string().required().max(30).label('Name'),
	email: yup.string().required().email().label('Email address'),
	age: yup
		.number()
		.required()
		.min(18)
		.label('Age')
		.nullable(true)
		.transform((v, o) => (o === '' ? null : v)),
	answer: yup
		.number()
		.required()
		.positive()
		.oneOf([6], 'Answer is wrong')
		.label('Answer')
		.nullable(true)
		.transform((v, o) => (o === '' ? null : v)),
	gender: yup.string().required().label('Gender')
});

export default schema;
