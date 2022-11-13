<script lang="ts">
	// @ts-nocheck
	import { Icon } from 'svelte-materialify';
	import { mdiContentSave, mdiAlertRhombus, mdiCheckCircle } from '@mdi/js';
	import Header from '$components/Header.svelte';
	import { variables } from '$lib/variables';
	import Textfield from '@smui/textfield';
	import Card from '@smui/card/src/Card.svelte';
	import type { SnackbarComponentDev } from '@smui/snackbar';
	// import Snackbar, { Label } from '@smui/snackbar';
	import { Snackbar } from 'svelte-materialify';
	import Button from '$components/Button.svelte';
	import HelperText from '@smui/textfield/helper-text';

	export let items = [
		{ text: 'Jurusan', href: '/admin/jurusan' },
		{ text: 'Create', href: '#' }
	];

	let data = {
		nama: ''
	};
	let snackbarSuccess: boolean = false;
	let snackbarError: boolean = false;
	let isLoading = false;
	let dirty = false;
	let errorNama = false;
	// let snackbar = false;
	let responseMessage = '';
	async function handleSubmit() {
		const response = await fetch(`${variables.basePath}/jurusan`, {
			method: 'POST',
			credentials: 'same-origin',
			body: JSON.stringify({ ...data }),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		let message = await response.json();
		if (response.status === 200 || response.status === 201) {
			isLoading = true;
			responseMessage = message.message;
			snackbarSuccess = true;
			setTimeout(() => {
				window.location.href = '/admin/jurusan';
			}, 5000);
		} else {
			responseMessage = message.message;
			snackbarError = false;
		}
		console.log('return', handleSubmit);
	}
</script>

<Header {items} />
<main class="overflow-auto h-screen">
	<div class="m-5 relative">
		<div class="absolute w-full">
			<Card>
				<div class="p-5">
					<!-- <Title text="Create Jurusan" /> -->
					<div class="w-full">
						<div class="relative py-3">
							<Textfield
								type="text"
								variant="filled"
								bind:dirty
								bind:value={data.nama}
								label="Jurusan"
								input$pattern={'^(?![s-])[w -]+$'}
								bind:invalid={errorNama}
								updateInvalid
								required
							>
								<svelte:fragment slot="helper">
									{#if data.nama === ''}
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
						</div>
					</div>
				</div>
			</Card>
			<div class="flex justify-end py-5">
				<Button type="save" click={() => handleSubmit()} disabled={data.nama === ''}>
					<div class="flex flex-span-1 gap-3 items-center">
						<Icon path={mdiContentSave} />
						save
					</div>
				</Button>
				<Snackbar
					class="bg-white text-green-700 gap-5"
					bind:active={snackbarSuccess}
					top
					center
					timeout={3000}
				>
					<Icon path={mdiCheckCircle} size="15" />
					{responseMessage}
				</Snackbar>
				<Snackbar class="flex-column" bind:active={snackbarError} top center timeout={3000}>
					{responseMessage}
				</Snackbar>
			</div>
		</div>
	</div>
</main>
