<script lang="ts">
	import '$sass/tailwind.scss';
	import { TextField, Button, Icon, Checkbox } from 'svelte-materialify';
	import { mdiEyeOff, mdiEye } from '@mdi/js';
	import jwt_decode from 'jwt-decode';

	let show = false;
	let group = ['2'];
	let username = '';
	let password = '';
	let isLoading = false;
	$: value = '';
	let error = null;


	async function handleSubmit() {
		const response = await fetch('http://localhost:3001/signin', {
			method: 'POST',
			credentials: 'same-origin',
			body: JSON.stringify({ username, password }),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (response.status === 200) {
			let body = await response.json();
			localStorage.setItem('token', body.token)

			var decoded: any = jwt_decode(body.token);
			isLoading = true;

			if (decoded.role === 'PENGGUNA') {
				window.location.href = '/landing';
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
		<div class="relative py-4">
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
				]}
				>Username</TextField
			>
		</div>
		<div class="relative py-4">
			<TextField
			filled
			dense
			type={show ? 'text' : 'password'}
			bind:value={password}
			rules={[
				(v) => !!v || 'Required',
			]}
			>
				Password
				<div
					slot="append"
					on:click={() => {
						show = !show;
					}}
					class="text-purple-500"
				>
					<Icon path={show ? mdiEyeOff : mdiEye} />
				</div>
			</TextField>
			<div class="mt-6">
				<span class="text-sm">
					<a class="text-gray-600 hover:underline" href="./forgot-password">
						Forgot your password?
					</a>
				</span>
			</div>
		</div>
		<div class="text-sm text-gray-600">
			<Checkbox bind:group value="1" type="password" name="password" autocomplete="off" class="bg-transparent"
				>Remember me</Checkbox
			>
		</div>
		<div on:click={() => handleSubmit()} class="cursor-pointer py-4">
			<Button
				class="w-full h-[5vh] text-sm text-white bg-purple-900"
				disabled={!value || error}
			>
				{#if isLoading}
					loading...
				{:else}
					Login
				{/if}
			</Button>
		</div>
	</form>
</section>
