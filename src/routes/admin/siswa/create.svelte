<script>
	// @ts-nocheck
	import { Card, TextField, Select, Button, Icon, Snackbar } from 'svelte-materialify';
	import { mdiContentSave, mdiCheckCircle, mdiCogSyncOutline } from '@mdi/js';
	import '$sass/tailwind.scss';
	import Header from '$lib/components/Header.svelte';
	import { onMount } from 'svelte';

	export let Breadcrumbs = [
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
		kelasId: '',
		jurusanId: '',
		nama_ibu: '',
		pekerjaan_ibu: ''
	};
	let snackbar = false;
	let fetchKelas = [];
	let dataKelas = [];
	let fetchJurusan = [];
	let dataJurusan = [];
	const Jenis_kelamin = ['Laki-Laki', 'Perempuan'];
	const Agama = ['Islam', 'Protestan', 'Katolik', 'Hindu', 'Buddha', 'Khonghucu'];

	onMount(() => {
		getFetchKelas('https://stark-wildwood-45887.herokuapp.com/kelas/list').then((res) => {
			fetchKelas = res;
			console.log('debug:', res);
			dataKelas = fetchKelas.map((val) => {
				return { name: val.grade, value: val.id };
			});
		});

		getFetchJurusan('https://stark-wildwood-45887.herokuapp.com/jurusan/list').then((res) => {
			fetchJurusan = res;
			console.log('debug:', res);
			dataJurusan = fetchJurusan.map((val) => {
				return { name: val.nama, value: val.id };
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
		const response = await fetch('https://stark-wildwood-45887.herokuapp.com/siswa', {
			method: 'POST',
			credentials: 'same-origin',
			body: JSON.stringify({ ...data }),
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${token}`
			}
		});

		if (response.status === 200 || response.status === 201) {
			snackbar = true;
			window.location.href = 'http://localhost:3000/admin/siswa';
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
						<div class="p-3 bg-teal-200">
							<span>Data Diri</span>
						</div>
						<div class="flex flex-cols-2 gap-3">
							<div class="w-full">
								<div class="relative py-4">
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
								<div class="relative py-4">
									<TextField dense filled bind:value={data.nama} rules={[(v) => !!v || 'Required']}
										>Nama</TextField
									>
								</div>
								<div class="relative py-4">
									<Select
										filled
										dense
										items={Jenis_kelamin}
										class="main-input dropdown"
										bind:value={data.jenis_kelamin}>Jenis_kelamin</Select
									>
								</div>
								<div class="relative py-4">
									<TextField dense filled class="main-input text-sm" bind:value={data.tempat_lahir}
										>Tempat_lahir</TextField
									>
								</div>
								<div class="relative py-4">
									<TextField
										dense
										filled
										class="pr-2 main-input text-sm"
										type="date"
										placeholder="date"
										bind:value={data.tanggal_lahir}>Tanggal_lahir</TextField
									>
								</div>
							</div>
							<div class="w-full">
								<div class="relative py-4">
									<Select
										dense
										filled
										items={Agama}
										class="main-input dropdown text-sm"
										bind:value={data.agama}>Agama</Select
									>
								</div>
								<div class="relative py-4">
									<TextField dense filled class="main-input" bind:value={data.no_tlp}
										>No Tlp</TextField
									>
								</div>
								<div class="relative py-4">
									<TextField dense filled class="main-input" bind:value={data.email}
										>Email</TextField
									>
								</div>
								<div class="relative py-4">
									<TextField dense filled class="main-input" bind:value={data.nama_ibu}
										>Nama Ibu</TextField
									>
								</div>
								<div class="relative py-4">
									<TextField dense filled class="main-input" bind:value={data.pekerjaan_ibu}
										>Pekerjaan Ibu</TextField
									>
								</div>
							</div>
						</div>
						<div class="p-3 bg-teal-200">
							<span>Data Alamat</span>
						</div>
						<div class="flex flex-cols-2 gap-3">
							<div class="w-full">
								<div class="relative py-4">
									<TextField
										dense
										filled
										bind:value={data.alamat}
										rules={[(v) => !!v || 'Required']}>Alamat</TextField
									>
								</div>
								<div class="relative py-4">
									<TextField dense filled class="main-input" bind:value={data.kewarganegaraan}
										>Kewarganegaraan</TextField
									>
								</div>
							</div>
							<div class="w-full">
								<div class="relative py-4">
									<TextField dense filled class="main-input" bind:value={data.kecamatan}
										>Kecamatan</TextField
									>
								</div>
								<div class="relative py-4">
									<TextField dense filled class="main-input" bind:value={data.kabupaten}
										>Kabupaten</TextField
									>
								</div>
							</div>
						</div>
						<div class="p-3 bg-teal-200">
							<span>Data Alamat</span>
						</div>
						<div class="flex flex-cols-2 gap-3">
							<div class="w-full">
								<div class="relative py-4">
									<Select dense filled items={dataKelas} bind:value={data.kelasId}>Kelas</Select>
								</div>
							</div>
							<div class="w-full">
								<div class="relative py-4">
									<Select dense filled items={dataJurusan} bind:value={data.jurusanId}
										>Jurusan</Select
									>
								</div>
							</div>
						</div>
					</div>
				</Card>
				<div class="flex justify-end py-[20px]">
					<Button
						class=" bg-purple-500 hover:bg-purple-900 text-white rounded-sm"
						on:click={() => handleSubmit()}
						><Icon path={mdiContentSave} class="text-white" />Save</Button
					>
					<Snackbar class="flex-column" bind:active={snackbar} bottom center timeout={30000}>
						<Icon path={mdiCheckCircle} />
						<span class="mt-1 font-semibold"> Success create Siswa </span>
					</Snackbar>
				</div>
			</div>
		</main>
	</section>
</main>
