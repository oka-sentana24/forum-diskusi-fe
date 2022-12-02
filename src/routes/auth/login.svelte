<script lang="ts">
	// @ts-nocheck
	import Description from '$components/Description.svelte';
	import { TextField, Icon, Checkbox } from 'svelte-materialify';
	import { mdiEyeOff, mdiEye, mdiAlertRhombus } from '@mdi/js';
	import Button from '$components/Button.svelte';
	import Title from '$components/Title.svelte';
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
		<Title text="Masuk" />
		<Description text="Tidak punya akun?">Hubungi administrasi</Description>
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
		<Button login click={() => formSubmit()}>
			{isSubmitting ? 'Memuat...' : 'Masuk'}
		</Button>
	</div>
</div>
