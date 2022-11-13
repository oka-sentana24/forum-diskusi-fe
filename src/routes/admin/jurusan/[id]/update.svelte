<script lang="ts">
	// @ts-nocheck
	import { Icon } from 'svelte-materialify';
	import { mdiContentSave } from '@mdi/js';
	import Header from '$components/Header.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { variables } from '$lib/variables';
	import Card from '@smui/card';
	import Textfield from '@smui/textfield';
	import Button from '$components/Button.svelte';
	export let items = [
		{ text: 'Jurusan', href: '/admin/jurusan' },
		{ text: 'Update', href: '#' }
	];
	let data = {
		id: '',
		nama: ''
	};
	let snackbar = false;
	onMount(() => {
		getFetchSiswa(`${variables.basePath}/jurusan/list/${$page.params.id}`).then((res) => {
			data = res;
			console.log('debug:', res);
		});
	});
	async function getFetchSiswa(url) {
		return await fetch(url).then((res) => {
			return res.json();
		});
	}
	async function handleSubmit() {
		const response = await fetch(`${variables.basePath}/jurusan/update/${$page.params.id}`, {
			method: 'PUT',
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
	}
</script>

<Header {items} />
<main class="overflow-auto h-screen">
	<div class="m-5 relative">
		<!-- data table -->
		<div class="absolute w-full">
			<Card class="bg-white shadow-none dark:bg-gray-800">
				<div class="p-5">
					<div class="flex flex-cols-2 gap-3">
						<div class="w-full dark:text-gray-300">
							<div class="relative py-3">
								<Textfield variant="filled" label="Id" bind:value={data.id} disabled />
							</div>
							<div class="relative py-3">
								<Textfield variant="filled" label="Nama" bind:value={data.nama} />
							</div>
						</div>
					</div>
				</div>
			</Card>
			<div class="flex justify-end py-5">
				<Button type="save" click={() => handleSubmit()}>
					<div class="flex flex-span-1 gap-3 items-center">
						<Icon path={mdiContentSave} />
						save
					</div>
				</Button>
			</div>
		</div>
	</div>
</main>
