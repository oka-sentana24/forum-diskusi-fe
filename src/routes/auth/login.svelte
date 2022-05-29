<script lang="ts">
	import '$sass/tailwind.scss';
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
		<div class="mb-7">
			<TextField
				filled
				class="main-input"
				bind:value={username}
				bind:error
				rules={[
					(v) => !!v || 'Required',
					(v) => v.length <= 10 || 'Max 10 characters',
					(v) => {
						const pattern = /^[0-9]*$/;
						return pattern.test(v) || 'Invalid username.';
					}
				]}
				validateOnBlur>Username</TextField
			>
		</div>
		<div class="mb-4">
			<TextField
				filled
				class="main-input"
				type={show ? 'text' : 'password'}
				bind:value={password}
				bind:error
			>
				Password
				<div
					slot="append"
					on:click={() => {
						show = !show;
					}}
					class="text-blue-600"
				>
					<Icon path={show ? mdiEyeOff : mdiEye} />
				</div>
			</TextField>
		</div>
		<div class="py-4 flex flex-cols-2 items-center gap-10 justify-between">
			<div class="text-sm ">
				<Checkbox bind:group value="1" type="password" name="password" autocomplete="off"
					>Remember me</Checkbox
				>
			</div>
			<span class="text-sm">
				<a class="text-sm font-medium  dark:text-blue-400 hover:underline" href="./forgot-password">
					Forgot your password?
				</a>
			</span>
		</div>
		<div on:click={() => handleSubmit()} class="cursor-pointer py-4">
			<Button
				class="white white-text w-full h-[5vh] text-sm dark:text-green-100"
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
