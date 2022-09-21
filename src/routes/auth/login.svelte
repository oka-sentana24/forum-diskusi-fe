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
	// let rememberMe = false;
	let showPassword = false;
	let isSubmitting = false;
	let errorUsername = false;
	let errorPassword = false;
	let fields = { username: '', password: '' };
	let dirty = false;
	let errorMessage = '';
	let validate = '^[0-9]+$';

	async function formSubmit() {
		isSubmitting = true;
		errorMessage = '';

		const response = await fetch(`${variables.basePath}/signin`, {
			method: 'POST',
			credentials: 'same-origin',
			body: JSON.stringify({ ...fields }),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		// isSubmitting = false;
		const body = await response.json();
		// console.info({ body });

		console.log('get message', body);

		if (response.status === 200) {
			localStorage.setItem('token', body.token);
			const decoded: any = jwt_decode(body.token);
			localStorage.setItem('username', decoded.username);
			localStorage.setItem('penggunaId', body.user.id);

			setTimeout(() => {
				if (decoded.role === 'PENGGUNA') {
					window.location.href = '/chat';
				} else if (decoded.role === 'ADMIN') {
					window.location.href = '/admin';
				} else {
					console.log('no user');
				}
			}, 5000);
		} else {
			errorMessage = body.message;
			console.info({ errorMessage });
		}
	}
</script>

<main>
	<div class="py-2">
		<Textfield
			type="text"
			variant="filled"
			bind:dirty
			input$maxlength="10"
			bind:value={fields.username}
			label="Nip/Nim"
			input$pattern={validate}
			bind:invalid={errorUsername}
			updateInvalid
			required
		>
			<svelte:fragment slot="helper">
				{#if fields.username === ''}
					<HelperText validationMsg slot="helper">
						<span class=" absolute flex flex-span-2 items-center gap-2">
							<Icon path={mdiAlertRhombus} size="15" />
							This field is required.
						</span>
					</HelperText>
				{:else if validate}
					<HelperText validationMsg slot="helper">
						<span class=" absolute flex flex-span-2 items-center gap-2">
							<Icon path={mdiAlertRhombus} size="15" />
							The value should be a number.
						</span>
					</HelperText>
				{/if}
			</svelte:fragment>
		</Textfield>
	</div>
	<div class="py-2">
		<Textfield
			type={showPassword ? 'text' : 'password'}
			variant="filled"
			bind:dirty
			input$maxlength="10"
			bind:value={fields.password}
			label="Password"
			bind:invalid={errorPassword}
			updateInvalid
			required
		>
			<IconButton
				class="relative bottom-[1.2rem]"
				slot="trailingIcon"
				on:click={() => (showPassword = !showPassword)}
			>
				<div class="flex items-center">
					<Icon path={showPassword ? mdiEye : mdiEyeOff} />
				</div>
			</IconButton>
			<svelte:fragment slot="helper">
				{#if fields.password === ''}
					<HelperText validationMsg slot="helper">
						<span class="absolute flex flex-span-2 items-center gap-2">
							<Icon path={mdiAlertRhombus} size="15" />
							This field is required.
						</span>
					</HelperText>
				{:else}
					<HelperText slot="helper" />
				{/if}
			</svelte:fragment>
		</Textfield>
	</div>
	{#if errorMessage}
		<div class="flex flex-span-2 items-center gap-2 text-red-500 text-sm">
			<Icon path={mdiAlertRhombus} size="15" />
			{errorMessage}
		</div>
	{/if}
	<div class="font-normal text-teal-400 py-2">Forgot password?</div>
	<!-- <FormField class="flex gap-1 pl-0">
		<Checkbox bind:rememberMe />
		<span slot="label">Remember me.</span>
	</FormField> -->
	<div class="mt-4">
		<Button
			variant="primary"
			click={() => formSubmit()}
			disabled={isSubmitting || fields.username === '' || fields.password === ''}
		>
			{isSubmitting ? 'loading...' : 'Sign In'}
		</Button>
	</div>
</main>
