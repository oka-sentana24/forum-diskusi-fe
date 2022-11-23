<script lang="ts">
	// @ts-nocheck
	import { variables } from '$lib/variables';
	import '$sass/tailwind.scss';
	import { TextField, Select, Icon, Dialog, Snackbar } from 'svelte-materialify';
	import Card from '$components/Card.svelte';
	import { mdiContentSave, mdiCheckCircle, mdiAlert } from '@mdi/js';
	import Header from '$components/Header.svelte';
	import { onMount } from 'svelte';
	import Button from '$components/Button.svelte';
	import { page } from '$app/stores';
	export let items = [
		{ text: 'Siswa', href: '/admin/siswa' },
		{ text: 'Update', href: '#' }
	];

	let data = {
		id: '',
		nama: ''
	};
	let active;
	let snackbarSuccess: boolean = false;
	let snackbarError: boolean = false;
	let fetchKelas = [];
	let dataKelas = [];

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
		const headers = {
			'Content-Length': body.length,
			'Content-Type': 'application/json'
		};
		const response = await fetch(`${variables.basePath}/jurusan/update/${$page.params.id}`, {
			method: 'PUT',
			credentials: 'same-origin',
			body: JSON.stringify({ ...data }),
			headers
		});

		// let message = await response.json();
		if (response.status === 200) {
			// isLoading = true;
			// responseMessage = message.message;
			snackbarSuccess = true;
			onClose();
			setTimeout(() => {
				window.location.href = '/admin/jurusan';
			}, 1000);
		} else {
			responseMessage = message.message;
			snackbarError = true;
			window.location.href = '/admin/jurusan/create';
		}
	}
	function onClose() {
		active = false;
	}
</script>

<Header {items} />
<main class=" overflow-auto h-screen bg-root">
	<div class="m-5 relative">
		<!-- data table -->
		<div class="absolute w-full">
			<Card>
				<div class="p-5">
					<div class="flex flex-cols-2 gap-3">
						<div class="w-full">
							<div class="main-input">
								<TextField
									readonly
									filled
									bind:value={data.id}
									rules={[
										(v) => !!v || ' This field is required.',
										(v) => v.length <= 10 || 'Max 10 characters',
										(v) => {
											const pattern = /^\d+$/;
											return pattern.test(v) || 'This field is number.';
										}
									]}
									type="text">Id</TextField
								>
							</div>
							<div class="main-input">
								<TextField
									filled
									bind:value={data.nama}
									rules={[
										(v) => !!v || ' This field is required.',
										(v) => {
											const pattern = /^(?=.{1,50}$)[^\W_]+(?: [^\W_]+)*$/;
											return pattern.test(v) || 'Name is invalid.';
										}
									]}
									type="text">Nama</TextField
								>
							</div>
						</div>
					</div>
				</div>
			</Card>
			<div class="flex justify-end py-5">
				<Button
					create
					disabled={data.username === '' ||
						data.agama === '' ||
						data.alamat === '' ||
						data.email === '' ||
						data.jenis_kelamin === '' ||
						data.kabupaten === '' ||
						data.kecamatan === '' ||
						data.kelasId === '' ||
						(data.kewarganegaraan === '') | (data.nama === '') ||
						data.nama_ayah === '' ||
						data.nama_ibu === '' ||
						data.no_tlp === '' ||
						data.pekerjaan_ayah === '' ||
						data.pekerjaan_ibu === '' ||
						data.tanggal_lahir === '' ||
						data.tempat_lahir === ''}
					click={() => (active = true)}
				>
					<div class="flex flex-span-1 gap-3 items-center">
						<Icon path={mdiContentSave} />
						Simpan
					</div>
				</Button>
				<Dialog class="pa-4 text-center bg-white w-[300px] text-black" bind:active>
					<div class="py-2">
						<Icon path={mdiAlert} size={25} />
					</div>
					<div class="font-bold text-base">Simpan perubahan?</div>
					<div class=" flex flex-span-1 gap-5 items-center justify-center py-5">
						<Button modal click={() => handleSubmit() && onClose()}>Simpan</Button>
						<Button close click={() => onClose()}>Kembali</Button>
					</div>
				</Dialog>
				<Snackbar
					class="bg-green-500 text-base-white gap-5 text-base flex-column"
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
		</div>
	</div>
</main>
