<script lang="ts">
	// @ts-nocheck
	import { TextField, Icon, Button, Checkbox } from 'svelte-materialify';
	import { mdiEyeOff, mdiEye, mdiAlertRhombus } from '@mdi/js';
	import jwt_decode from 'jwt-decode';
	import { variables } from '$lib/variables';

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

<div class="p-8">
	<div class="py-5 text-left ">
		<h1 class="text-2xl font-bold mb-2 text-light-text-title dark:text-dark-text-title">Masuk</h1>
		<span class="text-dark-text-body_1"
			>Tidak punya akun? <a href="#" class="text-light-link-purple dark:text-dark-link-blue">
				Hubungi administrasi</a
			></span
		>
	</div>
	<div class="grid gap-9">
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
	<div class="py-5">
		<Checkbox bind:rememberMe value="1" class="my-5">
			<span class="text-light-text-body_1">Ingat saya.</span></Checkbox
		>
		<Button
			block
			size="x-large"
			class="bg-light-primary-50 dark:bg-dark-primary-50 rounded-sm text-base-white"
			on:click={() => formSubmit()}
			><span class="normal-case">
				{isSubmitting ? 'Memuat...' : 'Masuk'}
			</span></Button
		>
	</div>
</div>
