<script>
	// @ts-nocheck
	import { Card, TextField, Select, Button, Icon, Snackbar } from 'svelte-materialify';
	import { mdiContentSave, mdiCheckCircle, mdiCogSyncOutline } from '@mdi/js';
	import '$sass/tailwind.scss';
	import Header from '$lib/components/Header.svelte';

	export let Breadcrumbs = [
		{ text: 'Kelas', href: '/admin/kelas' },
		{ text: 'Create', href: '#' }
	];

	let data = {
		nama: '',
		grade: ''
	};
	let snackbar = false;
	
	async function handleSubmit() {
		const response = await fetch('http://localhost:3001/kelas', {
			method: 'POST',
			credentials: 'same-origin',
			body: JSON.stringify({ ...data }),
			headers: {
				'Content-Type': 'application/json',
			}
		});

		if (response.status === 200 || response.status === 201) {
			snackbar = true;
			window.location.href = '/admin/kelas';
		}
		// what do you do with a non-redirect?

		console.log('return', handleSubmit);
	}
</script>

<main class="h-full overflow-y-auto">
	<Header items={Breadcrumbs} />
	<section class="h-full">
		<main class="h-full overflow-y-auto">
			<div class="relative top-[6rem] px-5">
				<Card class="dark:bg-gray-800 h-[84vh] bg-white shadow-none">
					<div class="p-5">
						<div class="flex flex-cols-2 gap-3">
							<div class="w-full">
								<div class="relative py-4">
									<TextField
										dense
										filled
										bind:value={data.nama}
										>Nama</TextField
									>
								</div>
								<div class="relative py-4">
									<TextField dense filled bind:value={data.grade}
										>Grade</TextField
									>
								</div>
							</div>
						</div>
					</div></Card
				>
				<div class="flex justify-end py-[20px]">
					<Button
						class=" bg-purple-500 hover:bg-purple-900 text-white rounded-sm"
						on:click={() => handleSubmit()}
						><Icon path={mdiContentSave} class="text-white" />Save</Button
					>
					<Snackbar class="flex-column" bind:active={snackbar} bottom center timeout={3000}>
						<Icon path={mdiCheckCircle} />
						<span class="mt-1 font-semibold"> Success </span>
					</Snackbar>
				</div>
			</div>
		</main>
	</section>
</main>
