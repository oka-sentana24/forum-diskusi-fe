<script lang="ts">
	import { TextField, Button, Icon, Checkbox } from 'svelte-materialify';
	import { mdiEyeOff, mdiEye } from '@mdi/js';
	import jwt_decode from 'jwt-decode';
	import { variables } from '$lib/variables';

	let show = false;
	let group = ['2'];
	let username = '';
	let password = '';
	let isLoading = false;
	$: value = '';
	let error = null;

	async function handleSubmit() {
		const response = await fetch(`${variables.basePath}/signin`, {
			method: 'POST',
			credentials: 'same-origin',
			body: JSON.stringify({ username, password }),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (response.status === 200) {
			let body = await response.json();
			localStorage.setItem('token', body.token);

			var decoded: any = jwt_decode(body.token);
			isLoading = true;

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

<section>
	<form>
		<div class="relative py-3">
			<TextField
				dense
				filled
				bind:value={username}
				rules={[
					(v) => !!v || 'Required',
					(v) => v.length <= 10 || 'Max 10 characters',
					(v) => {
						const pattern = /^[0-9]*$/;
						return pattern.test(v) || 'Invalid username.';
					}
				]}>Username</TextField
			>
		</div>
		<div class="relative py-3">
			<TextField
				filled
				dense
				type={show ? 'text' : 'password'}
				bind:value={password}
				rules={[(v) => !!v || 'Required']}
			>
				Password
				<div
					slot="append"
					on:click={() => {
						show = !show;
					}}
					class="text-teal-500"
				>
					<Icon path={show ? mdiEyeOff : mdiEye} />
				</div>
			</TextField>
			<div class="mt-3">
				<span>
					<a class="text-gray-600 hover:underline hover:text-teal-500" href="./forgot-password">
						Forgot your password?
					</a>
				</span>
			</div>
		</div>
		<div class="text-gray-600">
			<Checkbox
				bind:group
				value="1"
				type="password"
				name="password"
				autocomplete="off"
				class="bg-transparent">Remember me</Checkbox
			>
		</div>
		<div class="cursor-pointer py-4">
			<Button
				size="large"
				class="w-full bg-teal-800 hover:bg-teal-700 white-text"
				on:click={() => handleSubmit()}
			>
				<span class="normal-case">
					{#if isLoading}
						loading...
					{:else}
						Login
					{/if}
				</span>
			</Button>
		</div>
	</form>
</section>
