<script lang="ts">
	// @ts-nocheck
	import { variables } from '$lib/variables';
	import { Icon, Dialog, Snackbar } from 'svelte-materialify';
	import Button from '$components/Button.svelte';
	import Card from '$components/Card.svelte';
	import { page } from '$app/stores';
	import { mdiAccountEdit, mdiDelete, mdiAlert, mdiCheckCircle } from '@mdi/js';
	import Header from '$components/Header.svelte';
	import Login from '$src/routes/auth/login.svelte';
	import { onMount } from 'svelte';
	let active;

	let id,
		nisn,
		nama,
		alamat,
		jenis_kelamin,
		tempat_lahir,
		tanggal_lahir,
		agama,
		no_tlp,
		email,
		kewarganegaraan,
		kecamatan,
		kabupaten,
		nama_ayah,
		nama_ibu,
		pekerjaan_ibu,
		pekerjaan_ayah,
		kelas;
	export let items = [
		{ text: 'Siswa', href: '/admin/siswa' },
		{ text: 'View', href: '#' }
	];
	let snackbarSuccess: boolean = false;
	let snackbarError: boolean = false;
	let isLoading;
	// @ts-ignore

	fetch(`${variables.basePath}/siswa/list/${$page.params.id}`)
		.then((resp) => resp.json())
		.then(async (res) => {
			id = res.id;
			nisn = res.nisn;
			nama = res.nama;
			alamat = res.alamat;
			jenis_kelamin = res.jenis_kelamin;
			tempat_lahir = res.tempat_lahir;
			tanggal_lahir = res.tanggal_lahir;
			agama = res.agama;
			no_tlp = res.no_tlp;
			email = res.email;
			kewarganegaraan = res.kewarganegaraan;
			kecamatan = res.kecamatan;
			kabupaten = res.kabupaten;
			nama_ayah = res.nama_ayah;
			nama_ibu = res.nama_ibu;
			pekerjaan_ayah = res.pekerjaan_ayah;
			pekerjaan_ibu = res.pekerjaan_ibu;
			// kelas = res.kelasId.forEach((element) => {
			// 	console.log('elemt', element);
			// });
			// kelas = res.kelasId;
		});
	async function handleSubmit() {
		const response = await fetch(`${variables.basePath}/siswa/delete/${$page.params.id}`, {
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
				window.location.href = '/admin/siswa';
			}, 1000);
		} else {
			responseMessage = message.message;
			snackbarError = true;
			window.location.href = '/admin/siswa/create';
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
				class="bg-green-500 text-white gap-5 text-base flex-column"
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
				class="flex-column bg-red-500 text-white gap-5 text-base "
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
							<label for="">Nisn</label>
							<span>{nisn}</span>
						</div>
						<div class="grid">
							<label for="">Nama</label>
							<span>{nama}</span>
						</div>
						<div class="grid">
							<label for="">Alamat</label>
							<span>{alamat}</span>
						</div>
						<div class="grid">
							<label for="">Jenis Kelamin</label>
							<span>{jenis_kelamin}</span>
						</div>
						<div class="grid">
							<label for="">Tempat lahir</label>
							<span>{tempat_lahir}</span>
						</div>
						<div class="grid">
							<label for="">Tanggal Lahir</label>
							<span>{tanggal_lahir}</span>
						</div>
						<div class="grid">
							<label for="">Agama</label>
							<span>{agama}</span>
						</div>
						<div class="grid">
							<label for="">No Tlp</label>
							<span>{no_tlp}</span>
						</div>
						<div class="grid">
							<label for="">Email</label>
							<span>{email}</span>
						</div>
					</div>
					<div class="p-5 grid gap-2">
						<div class="grid">
							<label for="">Kewarganegaraan</label>
							<span>{kewarganegaraan}</span>
						</div>

						<div class="grid">
							<label for="">Kecamatan</label>
							<span>{kecamatan}</span>
						</div>
						<div class="grid">
							<label for="">Kabupaten</label>
							<span>{kabupaten}</span>
						</div>
						<div class="grid">
							<label for="">Nama Ayah</label>
							<span>{nama_ayah}</span>
						</div>
						<div class="grid">
							<label for="">Pekerjaa Ayah</label>
							<span>{pekerjaan_ayah}</span>
						</div>
						<div class="grid">
							<label for="">Nama Ibu</label>
							<span>{nama_ibu}</span>
						</div>
						<div class="grid">
							<label for="">Pekerjaan Ibu</label>
							<span>{pekerjaan_ibu}</span>
						</div>
					</div>
				</div>
			</Card>
		</div>
	</div>
</main>
