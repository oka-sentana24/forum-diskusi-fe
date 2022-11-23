<script lang="ts">
	// @ts-nocheck
	import '../../style/tailwind.scss';
	import jwt_decode from 'jwt-decode';
	import { variables } from '$lib/variables';
	import Button from '$components/Button.svelte';
	import { mdiAlertRhombus } from '@mdi/js';
	import { TextField, Icon, Checkbox } from 'svelte-materialify';
	import { mdiEyeOff, mdiEye } from '@mdi/js';

	/* variable */
	let rememberMe = false;
	let show = false;
	let errorMessage = '';
	let isSubmitting = false;
	let username = '';
	let password = '';

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

<main>
	<div class="main-input">
		<TextField
			filled
			bind:value={username}
			rules={[(v) => !!v || ` This field is required.`]}
			type="text">Nisn/Nip</TextField
		>
	</div>
	<div class="main-input">
		<TextField
			filled
			type={show ? 'text' : 'password'}
			bind:value={password}
			rules={[(v) => !!v || ' This field is required. ']}
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

	<div class="flex col-span-2 my-4 items-center justify-start">
		<Checkbox bind:rememberMe />
		<span class="text-white">Ingat saya.</span>
	</div>
	<div class="mt-4">
		<Button
			login
			click={() => formSubmit()}
			disabled={isSubmitting || username === '' || password === ''}
		>
			{isSubmitting ? 'Memuat...' : 'Masuk'}
		</Button>
	</div>
</main>
