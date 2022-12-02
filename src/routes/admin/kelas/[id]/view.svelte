<script lang="ts">
	// @ts-nocheck
	import { variables } from '$lib/variables';
	import { Icon, Dialog, Snackbar } from 'svelte-materialify';
	import Button from '$components/Button.svelte';
	import Card from '$components/Card.svelte';
	import { page } from '$app/stores';
	import { mdiAccountEdit, mdiDelete, mdiAlert, mdiCheckCircle } from '@mdi/js';
	import Header from '$components/Header.svelte';
	let active;
	let id, nama, grade;
	export let items = [
		{ text: 'Kelas', href: '/admin/kelas' },
		{ text: 'View', href: '#' }
	];
	let snackbarSuccess: boolean = false;
	let snackbarError: boolean = false;
	let isLoading;
	// @ts-ignore
	fetch(`${variables.basePath}/kelas/list/${$page.params.id}`)
		.then((resp) => resp.json())
		.then((res) => {
			id = res.id;
			nama = res.nama;
			grade = res.grade;
		});

	async function handleSubmit() {
		const response = await fetch(`${variables.basePath}/kelas/delete/${$page.params.id}`, {
			method: 'DELETE',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (response.status === 200) {
			// isLoading = true;
			// responseMessage = message.message;
			snackbarSuccess = true;
			onClose();
			setTimeout(() => {
				window.location.href = '/admin/kelas';
			}, 1000);
		} else {
			responseMessage = message.message;
			snackbarError = true;
			window.location.href = '/admin/kelas/create';
		}
	}
	function onClose() {
		active = false;
	}
</script>

<Header {items} />
<main>
	<div class="m-5 relative">
		<!-- create and filter -->
		<div class="flex justify-end py-5 gap-5">
			<a href="/admin/kelas/{id}/update">
				<Button update>
					<div class="normal-case text-sm text-white flex items-center gap-1">
						<Icon path={mdiAccountEdit} size="20px" />
						<span> Update </span>
					</div>
				</Button>
			</a>

			<Button remove click={() => (active = true)}>
				<div class="normal-case text-sm text-white flex items-center gap-1">
					<Icon path={mdiDelete} size="20px" />
					<span> Delete </span>
				</div>
			</Button>
			<Dialog class="pa-4 text-center bg-white w-[300px] text-black" bind:active persistent={true}>
				<div class="py-2">
					<Icon path={mdiAlert} size={25} />
				</div>
				<div class="font-bold text-base">Konfirmasi Hapus "{nama}"?</div>
				<div class=" flex flex-span-1 gap-5 items-center justify-center py-5">
					<Button modal click={() => handleSubmit() && onClose()}>Simpan</Button>
					<Button close click={() => onClose()}>Kembali</Button>
				</div>
			</Dialog>
			<Snackbar
				class="bg-other-success text-white gap-5 text-base flex-column"
				bind:active={snackbarSuccess}
				top
				center
				timeout={1000}
			>
				<span class=" flex py-2 gap-5 items-center justify-around"
					><Icon path={mdiCheckCircle} size={25} />
					<span>Data siswa berhasil disimpan</span>
				</span>
			</Snackbar>
			<Snackbar
				class="flex-column bg-other-error text-white gap-5 text-base "
				bind:active={snackbarError}
				top
				center
				timeout={1000}
			>
				<Icon path={mdiAlert} size={25} />
				<span>Data siswa gagal disimpan</span>
			</Snackbar>
		</div>
		<!-- data table -->
		<div class="absolute w-full overflow-auto">
			<Card view>
				<div class="flex gap-5">
					<div class="p-5 grid gap-2">
						<div class="grid">
							<label for="">id</label>
							<span>{id}</span>
						</div>

						<div class="grid">
							<label for="">Nama</label>
							<span>{nama}</span>
						</div>
						<div class="grid">
							<label for="">Grade</label>
							<span>{grade}</span>
						</div>
					</div>
				</div>
			</Card>
		</div>
	</div>
</main>
