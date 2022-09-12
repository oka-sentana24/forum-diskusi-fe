<script lang="ts">
	/* Module */
	import * as yup from 'yup';
	import { Form, Message, isInvalid } from 'svelte-yup';
	import jwt_decode from 'jwt-decode';
	import { variables } from '$lib/variables';
	import FormField from '@smui/form-field';
	import Checkbox from '@smui/checkbox';
	import Button, { Label } from '@smui/button';
	import { Icon } from 'svelte-materialify';
	import IconButton from '@smui/icon-button';
	import { mdiEyeOff, mdiEye } from '@mdi/js';
	import Textfield from '@smui/textfield';

	/* variable */
	let checked = false;
	let show = false;
	let isLoading = false;

	/* validation function */
	let schema = yup.object().shape({
		username: yup
			.number()
			.required()
			.min(8)
			.label('Username')
			.nullable(true)
			.transform((v, o) => (o === '' ? null : v)),
		password: yup
			.number()
			.required()
			.min(18)
			.label('password')
			.nullable(true)
			.transform((v, o) => (o === '' ? null : v))
	});
	let fields = { username: '', password: '' };
	let submitted = false;
	let isValid;
	async function formSubmit() {
		submitted = true;
		isValid = schema.isValidSync(fields);
		if (isValid) {
			const response = await fetch(`${variables.basePath}/signin`, {
				method: 'POST',
				credentials: 'same-origin',
				body: JSON.stringify({ ...fields }),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if (response.status === 200) {
				isLoading = true;
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
	}
	$: invalid = (username) => {
		if (submitted) {
			return isInvalid(schema, username, fields);
		}
		return false;
	};
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
			<IconButton
				class="relative bottom-4 text-sm"
				slot="trailingIcon"
				on:click={() => (show = !show)}
			>
				<div class="flex items-center text-sm">
					<Icon path={show ? mdiEye : mdiEyeOff} />
				</div>
			</IconButton>
		</Textfield>
		<Message name="password" />
	</div>
	<div class="text-sm font-normal text-teal-400 mt-2">Forgot password?</div>
	<FormField class="flex gap-1 mt-4">
		<Checkbox bind:checked />
		<span slot="label" class=" text-sm">Remember me.</span>
	</FormField>
	<div class="mt-4">
		<Button color="secondary" class="w-full h-[45px] normal-case bg-teal-600" variant="raised">
			<Label>
				{isLoading ? 'loading...' : 'Sign In'}
			</Label>
		</Button>
	</div>
</Form>
