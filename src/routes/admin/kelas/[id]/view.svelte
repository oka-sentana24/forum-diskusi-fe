<script lang="ts">
	import { Card, Button, Icon, Snackbar } from 'svelte-materialify';
	import { page } from '$app/stores';
	import { mdiAccountEdit, mdiCheckCircle } from '@mdi/js';
	import Header from '$components/Header.svelte';
	import { variables } from '$lib/variables';
	let id, nama, grade;
	export let items = [
		{ text: 'Kelas', href: '/admin/kelas' },
		{ text: 'View', href: '#' }
	];
	let snackbar = false;
	// @ts-ignore
	fetch(`${variables.basePath}/kelas/list/${$page.params.id}`)
		.then((resp) => resp.json())
		.then((res) => {
			id = res.id;
			nama = res.nama;
			grade = res.grade;
		});
	async function handleSubmit() {
		const response = await fetch(`${variables.basePath}/kelas/list/${$page.params.id}`, {
			method: 'DELETE',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (response.status === 200) {
			snackbar = true;
			window.location.href = '/admin/kelas';
		}
	}
</script>

<Header {items} />
<main>
	<div class="m-5 relative">
		<!-- create and filter -->
		<div class="flex justify-end py-5 gap-2 items-center">
			<a href="/admin/kelas/{id}/update">
				<Button
					class="bg-teal-500 p-5 rounded-md shadow-lg transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300 "
				>
					<div class="normal-case text-sm text-white flex items-center gap-1">
						<Icon path={mdiAccountEdit} size="20px" />
						<span> Update </span>
					</div>
				</Button>
			</a>
			<Button
				class="bg-red-500 p-5 rounded-md shadow-lg transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300 "
				on:click={() => handleSubmit()}
			>
				<div class="normal-case text-sm text-white flex items-center gap-1">
					<Icon path={mdiAccountEdit} size="20px" />
					<span> Delete </span>
				</div>
			</Button>
			<Snackbar class="flex-column bg-teal-700" bind:active={snackbar} bottom center timeout={3000}>
				<Icon path={mdiCheckCircle} />
				<span class="mt-1 font-semibold"> Delete Success </span>
			</Snackbar>
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
						<label for="" class="text-xs text-gray-400 dark:text-gray-300">Grade</label>
						<div class="pb-2">
							{grade}
						</div>
					</div>
				</div>
			</Card>
		</div>
	</div>
</main>
