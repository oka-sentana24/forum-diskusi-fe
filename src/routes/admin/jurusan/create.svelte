<script lang="ts">
	// @ts-nocheck
	import { Icon } from 'svelte-materialify';
	import { mdiContentSave, mdiCheckCircle, mdiCogSyncOutline } from '@mdi/js';
	import Header from '$components/Header.svelte';
	import { variables } from '$lib/variables';
	import Textfield from '@smui/textfield';
	import Card from '@smui/card/src/Card.svelte';
	import type { SnackbarComponentDev } from '@smui/snackbar';
	// import Snackbar, { Label } from '@smui/snackbar';
	import { Snackbar } from 'svelte-materialify';
	import Button from '$components/Button.svelte';

	export let items = [
		{ text: 'Jurusan', href: '/admin/jurusan' },
		{ text: 'Create', href: '#' }
	];

	let data = {
		nama: ''
	};
	let snackbarSuccess: boolean = false;
	let snackbarError: bollean = false;
	let isLoading = false;
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
							<Textfield variant="filled" label="Nama" type="text" bind:value={data.nama} />
						</div>
					</div>
				</div>
			</Card>
			<div class="flex justify-end py-5">
				<Button type="save" click={() => handleSubmit()}>
					<div class="flex flex-span-1 gap-3 items-center">
						<Icon path={mdiContentSave} />
						{isLoading ? 'loading...' : 'save'}
					</div>
				</Button>
				<Snackbar
					class="flex-column bg-green-500 flex items-center"
					bind:active={snackbarSuccess}
					top
					center
					timeout={3000}
				>
					{responseMessage}
				</Snackbar>
				<Snackbar class="flex-column" bind:active={snackbarError} top center timeout={3000}>
					{responseMessage}
				</Snackbar>
			</div>
		</div>
	</div>
</main>
