<script>
	// @ts-nocheck
	import { Card, TextField, Select, Button, Icon, Snackbar } from 'svelte-materialify';
	import { mdiContentSave, mdiCheckCircle, mdiCogSyncOutline } from '@mdi/js';
	import Header from '$components/Header.svelte';
	import { onMount } from 'svelte';
	import { variables } from '$lib/variables';

	export let items = [
		{ text: 'Jurusan', href: '/admin/jurusan' },
		{ text: 'Create', href: '#' }
	];

	let data = {
		nama: '',
		kelas_jurusan: ''
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
		}
		// what do you do with a non-redirect?

		console.log('return', handleSubmit);
	}
</script>

<Header {items} />
<main class=" overflow-auto h-screen">
	<div class="m-5 relative">
		<!-- data table -->
		<div class="absolute w-full">
			<Card class="bg-white shadow-none dark:bg-gray-800">
				<div class="p-5">
					<!-- <div class="flex flex-cols-2 gap-3"> -->
					<div class="w-full">
						<div class="relative py-3">
							<TextField dense filled bind:value={data.nama}>Nama</TextField>
						</div>
					</div>
					<div class="w-full">
						<div class="relative py-3">
							<TextField dense filled bind:value={data.kelas_jurusan}>kelas jurusan</TextField>
						</div>
					</div>
					<!-- </div> -->
				</div></Card
			>
			<div class="flex justify-end py-5">
				<Button
					class="bg-teal-500 p-5 rounded-md shadow-lg transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300"
					on:click={() => handleSubmit()}
				>
					<div class="flex items-center gap-2 text-white">
						<Icon path={mdiContentSave} />
						<span class="normal-case">Save</span>
					</div>
				</Button>
				<Snackbar
					class="flex-column bg-teal-700"
					bind:active={snackbar}
					bottom
					center
					timeout={3000}
				>
					<Icon path={mdiCheckCircle} />
					<span class="mt-1 font-semibold"> Success </span>
				</Snackbar>
			</div>
		</div>
	</div>
</main>
