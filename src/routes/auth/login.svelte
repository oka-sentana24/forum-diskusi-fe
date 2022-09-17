<script lang="ts">
	// @ts-nocheck
	/* Module */
	import jwt_decode from 'jwt-decode';
	import { variables } from '$lib/variables';
	import FormField from '@smui/form-field';
	import Checkbox from '@smui/checkbox';
	import IconButton from '@smui/icon-button';
	import { mdiEyeOff, mdiEye } from '@mdi/js';
	import Textfield from '@smui/textfield';
	import Button from '$components/Button.svelte';
	import HelperText from '@smui/textfield/helper-text';
	import { mdiAlertRhombus } from '@mdi/js';
	import { Icon } from 'svelte-materialify';

	/* variable */
	let checked = false;
	let show = false;
	let isLoading = false;
	let errorUsername = false;
	let errorPassword = false;
	let fields = { username: '', password: '' };
	let dirty = false;

	async function formSubmit() {
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

			console.log('body', body);

			localStorage.setItem('token', body.token);
			var decoded: any = jwt_decode(body.token);
			localStorage.setItem('username', decoded.username);
			localStorage.setItem('penggunaId', body.user.id);

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

<main>
	<Textfield
		type="text"
		variant="filled"
		bind:dirty
		input$maxlength="10"
		bind:value={fields.username}
		label="Nip/Nim"
		input$pattern={'^[0-9]+$'}
		bind:invalid={errorUsername}
		updateInvalid
		required
	>
		<svelte:fragment slot="helper">
			{#if fields.username === ''}
				<HelperText validationMsg slot="helper">
					<span class="flex flex-span-2 items-center gap-2">
						<Icon path={mdiAlertRhombus} size="15" />
						This field is required.
					</span>
				</HelperText>
			{:else}
				<HelperText slot="helper" class="py-2" />
			{/if}
		</svelte:fragment>
	</Textfield>
	<Textfield
		type={show ? 'text' : 'password'}
		variant="filled"
		bind:dirty
		input$maxlength="10"
		bind:value={fields.password}
		label="Password"
		input$pattern={'^[0-9]+$'}
		bind:invalid={errorPassword}
		updateInvalid
		required
	>
		<IconButton
			class="relative bottom-[1.2rem]"
			slot="trailingIcon"
			on:click={() => (show = !show)}
		>
			<div class="flex items-center">
				<Icon path={show ? mdiEye : mdiEyeOff} />
			</div>
		</IconButton>
		<svelte:fragment slot="helper">
			{#if fields.username === fields.password}
				<HelperText validationMsg slot="helper">
					<span class="flex flex-span-2 items-center gap-2">
						<Icon path={mdiAlertRhombus} size="15" />
						Invalid password
					</span>
				</HelperText>
			{:else}
				<HelperText slot="helper" class="py-2" />
			{/if}
		</svelte:fragment>
	</Textfield>
	<div class="font-normal text-indigo-500 py-2">Forgot password?</div>
	<FormField class="flex gap-1 mt-4">
		<Checkbox bind:checked />
		<span slot="label">Remember me.</span>
	</FormField>
	<div class="mt-4">
		<Button type="primary" click={() => formSubmit()}>
			{isLoading ? 'loading...' : 'Sign In'}
		</Button>
	</div>
</main>
