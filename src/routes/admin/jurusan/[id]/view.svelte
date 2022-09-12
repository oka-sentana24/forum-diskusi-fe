<script lang="ts">
	/* module */
	import { variables } from '$lib/variables';
	import { page } from '$app/stores';
	import { mdiAccountEdit, mdiDelete } from '@mdi/js';
	import Header from '$components/Header.svelte';
	import Card from '@smui/card';
	import { Icon } from 'svelte-materialify';
	import Button, { Label } from '@smui/button';

	let id, nama;

	export let items = [
		{ text: 'Jurusan', href: '/admin/jurusan' },
		{ text: 'View', href: '#' }
	];
	// @ts-ignore
	fetch(`${variables.basePath}/jurusan/list/${$page.params.id}`)
		.then((resp) => resp.json())
		.then((res) => {
			id = res.id;
			nama = res.nama;
		});

	async function handleSubmit() {
		const response = await fetch(`${variables.basePath}/jurusan/delete/${$page.params.id}`, {
			method: 'DELETE',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (response.status === 200) {
			window.location.href = '/admin/jurusan';
		}
	}
</script>

<Header {items} />
<main>
	<div class="m-5 relative">
		<div class="flex justify-end py-5 gap-2 items-center">
			<Button href="/admin/jurusan/{id}/update" class="bg-teal-500 p-5 rounded-md shadow-lg">
				<Label class="normal-case text-sm text-white flex items-center gap-1">
					<Icon path={mdiAccountEdit} size="15px" />
					<span> Update </span>
				</Label>
			</Button>
			<Button class="bg-red-500 p-5 rounded-md shadow-lg" on:click={() => handleSubmit()}>
				<Label class="normal-case text-sm text-white flex items-center gap-1">
					<Label>
						<Icon path={mdiDelete} size="15px" />
						Delete
					</Label>
				</Label>
			</Button>
		</div>
		<!-- data table -->
		<div class="absolute w-full overflow-auto">
			<Card class="bg-white shadow-none dark:bg-gray-800">
				<div class="p-5 flex flex-cols-2 gap-20">
					<div>
						<label for="" class="text-xs text-gray-400 dark:text-gray-300">id</label>
						<div class="pb-2">
							{id}
						</div>
						<label for="" class="text-xs text-gray-400 dark:text-gray-300">Nama</label>
						<div class="pb-2">
							{nama}
						</div>
					</div>
				</div>
			</Card>
		</div>
	</div>
</main>
