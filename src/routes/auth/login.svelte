<script lang="ts">
	// @ts-nocheck
	import brands from '$lib/images/brands.svg';
	import jwt_decode from 'jwt-decode';
	import { variables } from '$lib/variables';
	import { Checkbox, Icon, TextField } from 'svelte-materialify';
	import { mdiAlertRhombus, mdiEye, mdiEyeOff } from '@mdi/js';
	import Button from '$src/components/Button.svelte';

	let show = false;
	let rememberMe = false;
	let isSubmitting = false;
	let username = '';
	let password = '';
	let errorMessage = '';

	async function formSubmit() {
		isSubmitting = true;
		errorMessage = '';

		const response = await fetch(`${variables.basePath}/signin`, {
			method: 'POST',
			credentials: 'same-origin',
			body: JSON.stringify({ username, password }),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		isSubmitting = false;
		const body = await response.json();
		console.info({ body });

		if (response.status === 200) {
			localStorage.setItem('token', body.token);
			const decoded: any = jwt_decode(body.token);
			localStorage.setItem('username', decoded.username);
			localStorage.setItem('penggunaId', body.user.id);

			if (decoded.role === 'PENGGUNA') {
				window.location.href = '/chat';
			} else if (decoded.role === 'ADMIN') {
				window.location.href = '/admin';
			} else {
				console.log('no user');
			}
		} else {
			errorMessage = body.message;
			console.info({ errorMessage });
		}
	}
</script>

<section class="p-5 leading-8">
	<!-- title and description -->
	<div class="text-left">
		<div class="text-2xl font-bold text-black dark:text-white">Log in</div>
		<span> Enter your nisn/nip and password below </span>
	</div>
	<div class="grid gap-9 mt-5">
		<TextField filled rules={[(v) => !!v || ' This field is required. ']} bind:value={username}
			>Nis / Nip</TextField
		>
		<TextField
			filled
			type={show ? 'text' : 'password'}
			rules={[(v) => !!v || ' This field is required. ']}
			bind:value={password}
		>
			Password
			<div
				slot="append"
				on:click={() => {
					show = !show;
				}}
			>
				<Icon path={show ? mdiEyeOff : mdiEye} />
			</div>
		</TextField>
	</div>
	<div>
		{#if errorMessage}
			<div class="flex flex-span-2 items-center gap-2 text-red-500 text-sm text-other-error">
				<Icon path={mdiAlertRhombus} size="15" />
				{errorMessage}
			</div>
		{/if}
	</div>
	<div class="grid gap-9 mt-9">
		<Button login click={() => formSubmit()}>
			{isSubmitting ? 'Memuat...' : 'Masuk'}
		</Button>
	</div>
	<div class="py-3 text-center">
		Reset Password ?
		<span class="text-blue font-semibold">Hubungi bagian IT</span>
	</div>
</section>
