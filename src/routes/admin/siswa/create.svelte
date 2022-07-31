<script>
	import { variables } from '$lib/variables';
	// @ts-nocheck
	import { Card, TextField, Select, Button, Icon, Snackbar } from 'svelte-materialify';
	import { mdiContentSave, mdiCheckCircle, mdiCogSyncOutline } from '@mdi/js';
	import Header from '$components/Header.svelte';
	import { onMount } from 'svelte';

	let items = [
		{ text: 'Siswa', href: '/admin/siswa' },
		{ text: 'Create', href: '#' }
	];

	let data = {
		username: '',
		nama: '',
		alamat: '',
		jenis_kelamin: '',
		tempat_lahir: '',
		tanggal_lahir: '',
		agama: '',
		no_tlp: '',
		email: '',
		kewarganegaraan: '',
		kecamatan: '',
		kabupaten: '',
		nama_ibu: '',
		nama_ayah: '',
		pekerjaan_ibu: '',
		pekerjaan_ayah: '',
		kelasId: '',
		jurusanId: ''
	};
	let snackbar = false;
	let fetchKelas = [];
	let dataKelas = [];
	let fetchJurusan = [];
	let dataJurusan = [];
	const Jenis_kelamin = ['Laki-Laki', 'Perempuan'];
	const Agama = ['Islam', 'Protestan', 'Katolik', 'Hindu', 'Buddha', 'Khonghucu'];

	onMount(() => {
		getFetchKelas(`${variables.basePath}/kelas/list`).then((res) => {
			fetchKelas = res;
			console.log('debug:', res);
			dataKelas = fetchKelas.map((val) => {
				return { name: val.nama, grade: val.grade, value: val.id };
			});
			console.log('debug:testing', dataKelas);
		});

		getFetchJurusan(`${variables.basePath}/jurusan/list`).then((res) => {
			fetchJurusan = res;
			console.log('debug:', res);
			dataJurusan = fetchJurusan.map((val) => {
				return { name: val.kelas_jurusan, value: val.id };
			});
		});
	});
	async function getFetchKelas(url) {
		return await fetch(url).then((res) => {
			return res.json();
		});
	}

	async function getFetchJurusan(url) {
		return await fetch(url).then((res) => {
			return res.json();
		});
	}
	async function handleSubmit() {
		const token = localStorage.getItem('token');
		const response = await fetch(`${variables.basePath}/siswa`, {
			method: 'POST',
			credentials: 'same-origin',
			body: JSON.stringify({ ...data }),
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${token}`
			}
		});

		if (response.status === 500 || response.status === 201) {
			snackbar = true;
			// window.location.href = '/admin/siswa';
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
			<Card class="h-full block bg-white rounded-none">
				<div class="p-5">
					<div class="p-2 bg-teal-500 text-white  dark:bg-teal-700">
						<span>Data Diri</span>
					</div>
					<div class="flex flex-cols-2 gap-3">
						<div class="w-full">
							<div class="relative py-3">
								<TextField
									dense
									filled
									bind:value={data.username}
									rules={[
										(v) => !!v || 'Required',
										(v) => v.length <= 10 || 'Max 10 characters',
										(v) => {
											const pattern = /^[0-9]*$/;
											return pattern.test(v) || 'Invalid username.';
										}
									]}>Nisn</TextField
								>
							</div>
							<div class="relative py-3">
								<TextField dense filled bind:value={data.nama} rules={[(v) => !!v || 'Required']}
									>Nama</TextField
								>
							</div>
							<div class="relative py-3">
								<Select
									filled
									dense
									items={Jenis_kelamin}
									class="main-input dropdown"
									bind:value={data.jenis_kelamin}>Jenis_kelamin</Select
								>
							</div>
							<div class="relative py-3">
								<TextField dense filled class="main-input text-sm" bind:value={data.tempat_lahir}
									>Tempat_lahir</TextField
								>
							</div>
							<div class="relative py-3">
								<TextField
									dense
									filled
									class="pr-2 main-input text-sm"
									type="date"
									placeholder="date"
									bind:value={data.tanggal_lahir}>Tanggal_lahir</TextField
								>
							</div>
							<div class="relative py-3">
								<Select
									dense
									filled
									items={Agama}
									class="main-input dropdown text-sm"
									bind:value={data.agama}>Agama</Select
								>
							</div>
						</div>
						<div class="w-full">
							<div class="relative py-3">
								<TextField dense filled class="main-input" bind:value={data.no_tlp}
									>No Tlp</TextField
								>
							</div>
							<div class="relative py-3">
								<TextField dense filled class="main-input" bind:value={data.email}>Email</TextField>
							</div>
							<div class="relative py-3">
								<TextField dense filled class="main-input" bind:value={data.nama_ayah}
									>Nama Ayah</TextField
								>
							</div>
							<div class="relative py-3">
								<TextField dense filled class="main-input" bind:value={data.pekerjaan_ayah}
									>Pekerjaan Ayah</TextField
								>
							</div>
							<div class="relative py-3">
								<TextField dense filled class="main-input" bind:value={data.nama_ibu}
									>Nama Ibu</TextField
								>
							</div>
							<div class="relative py-3">
								<TextField dense filled class="main-input" bind:value={data.pekerjaan_ibu}
									>Pekerjaan Ibu</TextField
								>
							</div>
						</div>
					</div>
					<div class="p-2 bg-teal-500 text-white  dark:bg-teal-700">
						<span>Data Alamat</span>
					</div>
					<div class="flex flex-cols-2 gap-3">
						<div class="w-full">
							<div class="relative py-3">
								<TextField dense filled bind:value={data.alamat} rules={[(v) => !!v || 'Required']}
									>Alamat</TextField
								>
							</div>
							<div class="relative py-3">
								<TextField dense filled class="main-input" bind:value={data.kewarganegaraan}
									>Kewarganegaraan</TextField
								>
							</div>
						</div>
						<div class="w-full">
							<div class="relative py-3">
								<TextField dense filled class="main-input" bind:value={data.kecamatan}
									>Kecamatan</TextField
								>
							</div>
							<div class="relative py-3">
								<TextField dense filled class="main-input" bind:value={data.kabupaten}
									>Kabupaten</TextField
								>
							</div>
						</div>
					</div>
					<div class="p-2 bg-teal-500 text-white  dark:bg-teal-700">
						<span>Data Jurusan</span>
					</div>
					<div class="flex flex-cols-2 gap-3">
						<div class="w-full">
							<div class="relative py-3">
								<Select dense filled items={dataKelas} bind:value={data.kelasId}>Kelas</Select>
							</div>
						</div>
						<div class="w-full">
							<div class="relative py-3">
								<Select dense filled items={dataJurusan} bind:value={data.jurusanId}>Jurusan</Select
								>
							</div>
						</div>
					</div>
				</div>
			</Card>
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
