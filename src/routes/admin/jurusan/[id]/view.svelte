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
	let id, nama;
	let responseMessage = '';
	export let items = [
		{ text: 'Jurusan', href: '/admin/jurusan' },
		{ text: 'View', href: '#' }
	];
	let snackbarSuccess: boolean = false;
	let snackbarError: boolean = false;
	let isLoading;
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

		// if (response.status === 200) {
		// 	// isLoading = true;
		// 	// responseMessage = message.message;
		// 	snackbarSuccess = true;
		// 	onClose();
		// 	setTimeout(() => {
		// 		window.location.href = '/admin/siswa';
		// 	}, 1000);
		// } else {
		// 	responseMessage = message.message;
		// 	snackbarError = true;
		// 	window.location.href = '/admin/siswa/create';
		// }
		let message = await response.json();
		if (response.status === 200) {
			response.json();
			responseMessage = message.message;
			onClose();
			snackbarSuccess = true;
			setTimeout(() => {
				window.location.href = '/admin/jurusan';
			}, 1000);
		} else {
			responseMessage = message.message;
			snackbarError = true;
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
			<a href="/admin/siswa/{id}/update">
				<Button create>
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
					<Button create click={() => handleSubmit() && onClose()}>Simpan</Button>
					<Button close click={() => onClose()}>Kembali</Button>
				</div>
			</Dialog>
			<Snackbar
				class="bg-other-success text-base-white gap-5 text-base flex-column"
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
				<div class="p-5 flex flex-cols-2 gap-20">
					<div>
						<label for="" class="text-xs text-gray-400">id</label>
						<div class="pb-2 text-color-light-body">
							{id}
						</div>
						<label for="" class="text-xs text-gray-400">Nisn</label>
						<div class="pb-2 text-color-light-body">
							{nisn}
						</div>
						<label for="" class="text-xs text-gray-400">Nama</label>
						<div class="pb-2 text-color-light-body">
							{nama}
						</div>
						<label for="" class="text-xs text-gray-400">Alamat</label>
						<div class="pb-2 text-color-light-body">
							{alamat}
						</div>
						<label for="" class="text-xs text-gray-400">Kelas</label>
						<div class="pb-2 text-color-light-body">
							{alamat}
						</div>
						<label for="" class="text-xs text-gray-400">Jenis Kelamin</label>
						<div class="pb-2 text-color-light-body">
							{jenis_kelamin}
						</div>
						<label for="" class="text-xs text-gray-400">Tempat lahir</label>
						<div class="pb-2 text-color-light-body">
							{tempat_lahir}
						</div>
						<label for="" class="text-xs text-gray-400">Tanggal Lahir</label>
						<div class="pb-2 text-color-light-body">
							{tanggal_lahir}
						</div>
						<label for="" class="text-xs text-gray-400">Agama</label>
						<div class="pb-2 text-color-light-body">
							{agama}
						</div>
						<label for="" class="text-xs text-gray-400">No Tlp</label>
						<div class="pb-2 text-color-light-body">
							{no_tlp}
						</div>
						<label for="" class="text-xs text-gray-400">Email</label>
						<div class="pb-2 text-color-light-body">
							{email}
						</div>
					</div>
					<div>
						<label for="" class="text-xs text-gray-400">Kewarganegaraan</label>
						<div class="pb-2 text-color-light-body">
							{kewarganegaraan}
						</div>
						<label for="" class="text-xs text-gray-400">Kecamatan</label>
						<div class="pb-2 text-color-light-body">
							{kecamatan}
						</div>
						<label for="" class="text-xs text-gray-400">Kabupaten</label>
						<div class="pb-2 text-color-light-body">
							{kabupaten}
						</div>
						<label for="" class="text-xs text-gray-400">Nama Ayah</label>
						<div class="pb-2 text-color-light-body">
							{nama_ayah}
						</div>
						<label for="" class="text-xs text-gray-400">Pekerjaan Ayah</label>
						<div class="pb-2 text-color-light-body">
							{pekerjaan_ayah}
						</div>
						<label for="" class="text-xs text-gray-400">Nama Ibu</label>
						<div class="pb-2 text-color-light-body">
							{nama_ibu}
						</div>
						<label for="" class="text-xs text-gray-400">Pekerjaan Ibu</label>
						<div class="pb-2 text-color-light-body">
							{pekerjaan_ibu}
						</div>
					</div>
				</div>
			</Card>
		</div>
	</div>
</main>
