<script>
	// @ts-nocheck
	import { Icon } from 'svelte-materialify';
	import { mdiContentSave, mdiCheckCircle, mdiCogSyncOutline } from '@mdi/js';
	import Header from '$components/Header.svelte';
	import { variables } from '$lib/variables';
	import Textfield from '@smui/textfield';
	import Card from '@smui/card/src/Card.svelte';
	import Button, { Label } from '@smui/button';

	export let items = [
		{ text: 'Jurusan', href: '/admin/jurusan' },
		{ text: 'Create', href: '#' }
	];

	let data = {
		nama: ''
	};
	let snackbar = false;
	async function handleSubmit() {
		const response = await fetch(`${variables.basePath}/jurusan`, {
			method: 'POST',
			credentials: 'same-origin',
			body: JSON.stringify({ ...data }),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (response.status === 200 || response.status === 201) {
			snackbar = true;
			window.location.href = '/admin/jurusan';
		} else {
			console.log('no data');
		}
		// what do you do with a non-redirect?

		console.log('return', handleSubmit);
	}
</script>

<Header {items} />
<main class=" overflow-auto h-screen">
	<div class="m-5 relative">
		<div class="absolute w-full">
			<Card>
				<div class="p-5">
					<div class="p-2 bg-teal-400 text-white">
						<span>Buat Jurusan</span>
					</div>
					<div class="w-full">
						<div class="relative py-3">
							<Textfield variant="filled" label="Nama" type="text" bind:value={data.nama} />
						</div>
					</div>
				</div>
			</Card>
			<div class="flex justify-end py-5">
				<Button variant="raised" on:click={() => handleSubmit()} class="bg-teal-700">
					<Label class=" flex flex-span-2 only:items-center justify-center gap-2">
						<Icon path={mdiContentSave} size="20" />
						<span class="normal-case">Save</span>
					</Label>
				</Button>
			</div>
		</div>
	</div>
</main>
