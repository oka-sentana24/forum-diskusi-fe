<script lang="ts">
	// @ts-nocheck
	/* module */
	import { variables } from '$lib/variables';
	import { page } from '$app/stores';
	import { mdiAccountEdit, mdiDelete, mdiAlert, mdiCheckCircle } from '@mdi/js';
	import Header from '$components/Header.svelte';
	import Card from '@smui/card';
	import { Icon } from 'svelte-materialify';
	import Button from '$components/Button.svelte';
	import { Dialog, Snackbar } from 'svelte-materialify';
	import {} from '@mdi/js';

	let id = '';
	let nama = '';
	let active;
	let snackbarSuccess: boolean = false;
	let snackbarError: boolean = false;
	let responseMessage = '';

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

	function onClose() {
		active = false;
	}

	async function handleSubmit() {
		const response = await fetch(`${variables.basePath}/jurusan/delete/${$page.params.id}`, {
			method: 'DELETE',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		let message = await response.json();
		if (response.status === 200) {
			onClose();
			snackbarSuccess = true;
			setTimeout(() => {
				window.location.href = '/admin/jurusan';
			}, 1000);
			console.log(response.status);
		} else {
			responseMessage = message.message;
			snackbarError = false;
		}
	}
</script>

<Header {items}>View Jurusan</Header>
<main>
	<div class="m-5 relative">
		<div class="flex justify-end py-5 gap-2 items-center">
			<a href="/admin/jurusan/{id}/update">
				<Button secondary>
					<Icon path={mdiAccountEdit} size="24px" />
					Edit
				</Button>
			</a>
			<Button danger submite={() => (active = true)}>
				<Icon path={mdiDelete} size="24px" />
				Hapus
			</Button>
			<Dialog class="pa-4 text-center bg-white w-[300px] text-black" bind:active>
				<div class="py-2">
					<Icon path={mdiAlert} size={25} />
				</div>
				<div class="font-bold text-base">Apakah anda yakin ingin menghapus data ini?</div>
				<div class=" flex flex-span-1 gap-5 items-center justify-center py-5">
					<Button danger submite={() => handleSubmit()}>Hapus</Button>
					<Button secondary submite={() => onClose()}>Kembali</Button>
				</div>
			</Dialog>
			<Snackbar
				class="bg-white text-green-500 gap-5 text-base flex-column"
				bind:active={snackbarSuccess}
				top
				center
				timeout={3000}
			>
				<span class=" flex py-2 gap-5 items-center justify-around"
					><Icon path={mdiCheckCircle} size={25} />
					Data berhasil di hapus</span
				>
			</Snackbar>
			<Snackbar
				class="flex-column bg-white text-red-500 gap-5 text-base "
				bind:active={snackbarError}
				top
				center
				timeout={3000}
			>
				<Icon path={mdiAlert} size={25} />
				{responseMessage}
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
					</div>
				</div>
			</Card>
		</div>
	</div>
</main>
