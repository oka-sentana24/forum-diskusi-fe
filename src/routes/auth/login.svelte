<script lang="ts">
	/* Module */
	import * as yup from 'yup';
	import { Form, Message, isInvalid } from 'svelte-yup';
	import jwt_decode from 'jwt-decode';
	import { variables } from '$lib/variables';
	import FormField from '@smui/form-field';
	import Checkbox from '@smui/checkbox';
	import Button, { Label } from '@smui/button';
	import HelperText from '@smui/textfield/helper-text';
	import { Icon } from 'svelte-materialify';
	import IconButton from '@smui/icon-button';
	import { mdiEyeOff, mdiEye } from '@mdi/js';
	import Textfield from '@smui/textfield';

	/* variable */
	let checked = false;
	let show = false;
	let username = '';
	let password = '';

	/* validation function */
	let schema = yup.object().shape({
		username: yup
			.number()
			.required()
			.min(8)
			.label('Username')
			.nullable(true)
			.transform((v, o) => (o === '' ? null : v)),
		// email: yup.string().required().email().label('Email address'),
		password: yup
			.number()
			.required()
			.min(18)
			.label('password')
			.nullable(true)
			.transform((v, o) => (o === '' ? null : v))
		// answer: yup
		// 	.number()
		// 	.required()
		// 	.positive()
		// 	.oneOf([6], 'Answer is wrong')
		// 	.label('Answer')
		// 	.nullable(true)
		// 	.transform((v, o) => (o === '' ? null : v)),
		// gender: yup.string().required().label('Gender')
	});
	let fields = { username: '', password: '' };
	let submitted = false;
	let isValid;
	function formSubmit() {
		submitted = true;
		isValid = schema.isValidSync(fields);
		if (isValid) {
			handleSubmit();
		}
	}
	$: invalid = (username) => {
		if (submitted) {
			return isInvalid(schema, username, fields);
		}
		return false;
	};

	async function handleSubmit() {
		const response = await fetch(`${variables.basePath}/signin`, {
			method: 'POST',
			credentials: 'same-origin',
			body: JSON.stringify({ ...fields }),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (response.status === 200) {
			let body = await response.json();
			localStorage.setItem('token', body.token);
			var decoded: any = jwt_decode(body.token);
			localStorage.setItem('username', decoded.username);
			localStorage.setItem('jurusan', decoded.jurusan);

			if (decoded.role === 'PENGGUNA') {
				window.location.href = '/chat';
			} else if (decoded.role === 'ADMIN') {
				window.location.href = '/admin';
			} else {
				console.log('no user');
			}
		}
	}
</script>

<Form class="form" {schema} {fields} submitHandler={formSubmit} {submitted} color="#b00020">
	<div class="mb-6">
		<Textfield
			variant="filled"
			label="Username"
			type="text"
			bind:value={fields.username}
			invalid={invalid('username')}
		/>
		<Message name="username" />
	</div>
	<div class="mb-6">
		<Textfield
			variant="filled"
			label="Password"
			bind:value={fields.password}
			invalid={invalid('password')}
			type={show ? 'text' : 'password'}
		>
			<IconButton class="material-icons" slot="trailingIcon" on:click={() => (show = !show)}>
				<div class="flex items-center text-sm">
					<Icon path={show ? mdiEye : mdiEyeOff} />
				</div>
			</IconButton>
		</Textfield>
		<Message name="password" />
	</div>
	<div class="text-xs font-normal text-teal-400 mt-2">Forgot password?</div>
	<FormField class="flex gap-1 mt-4">
		<Checkbox bind:checked />
		<span slot="label" class=" text-xs">Remember me.</span>
	</FormField>
	<div class="mt-4">
		<Button color="secondary" class="w-full h-[45px] normal-case bg-teal-700" variant="raised">
			<Label>Sign In</Label>
		</Button>
	</div>
</Form>
