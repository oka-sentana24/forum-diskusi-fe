<script>
	import { Card, Button, Icon, Dialog, Snackbar } from 'svelte-materialify';
	import { page } from '$app/stores';
	import { mdiAccountEdit, mdiDelete, mdiAlert, mdiCheckCircle } from '@mdi/js';
	import Header from '$components/Header.svelte';
	let snackbar = false;
	let active;
	let id,
		username,
		nama,
		alamat,
		jenis_kelamin,
		tempat_lahir,
		tanggal_lahir,
		agama,
		no_tlp,
		email,
		jabatan,
		kewarganegaraan,
		kecamatan,
		kabupaten,
		nama_ayah,
		nama_ibu,
		pekerjaan_ibu;
	export let items = [
		{ text: 'Guru', href: '/admin/guru' },
		{ text: 'View', href: '#' }
	];
	// @ts-ignore
	fetch(`http://localhost:3001/guru/list/${$page.params.id}`)
		.then((resp) => resp.json())
		.then((res) => {
			id = res.id;
			username = res.username;
			nama = res.nama;
			alamat = res.alamat;
			jenis_kelamin = res.jenis_kelamin;
			jenis_kelamin = res.jenis_kelamin;
			tempat_lahir = res.tempat_lahir;
			tanggal_lahir = res.tanggal_lahir;
			agama = res.agama;
			no_tlp = res.no_tlp;
			email = res.email;
			jabatan = res.jabatan;
			kewarganegaraan = res.kewarganegaraan;
			kecamatan = res.kecamatan;
			kabupaten = res.kabupaten;
		});
	async function handleSubmit() {
		const response = await fetch(`http://localhost:3001/guru/list/${$page.params.id}`, {
			method: 'DELETE',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (response.status === 200) {
			snackbar = true;
			window.location.href = '/admin/guru';
		}
	}
</script>

<Header {items} />
<main>
	<div class="m-5 relative">
		<!-- create and filter -->
		<div class="flex justify-end py-5">
			<a href="/admin/guru/{id}/update">
				<Button
					class="bg-teal-500 p-5 rounded-md shadow-lg transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300 "
				>
					<div class="normal-case text-sm text-white flex items-center gap-1">
						<Icon path={mdiAccountEdit} size="20px" />
						<span> Update </span>
					</div>
				</Button>
			</a>
		</div>
		<!-- data table -->
		<div class="absolute w-full overflow-auto">
			<Card class="h-full bg-white shadow-none">
				<div class="p-5 flex flex-cols-2 gap-20">
					<div>
						<label for="" class="text-xs text-gray-400">id</label>
						<div class="pb-2">
							{id}
						</div>
						<label for="" class="text-xs text-gray-400">Nisn</label>
						<div class="pb-2">
							{username}
						</div>
						<label for="" class="text-xs text-gray-400">Nama</label>
						<div class="pb-2">
							{nama}
						</div>
						<label for="" class="text-xs text-gray-400">Alamat</label>
						<div class="pb-2">
							{alamat}
						</div>
						<label for="" class="text-xs text-gray-400">Jenis Kelamin</label>
						<div class="pb-2">
							{jenis_kelamin}
						</div>
						<label for="" class="text-xs text-gray-400">Tempat lahir</label>
						<div class="pb-2">
							{tempat_lahir}
						</div>
						<label for="" class="text-xs text-gray-400">Tanggal Lahir</label>
						<div class="pb-2">
							{tanggal_lahir}
						</div>
						<label for="" class="text-xs text-gray-400">Agama</label>
						<div class="pb-2">
							{agama}
						</div>
						<label for="" class="text-xs text-gray-400">No Tlp</label>
						<div class="pb-2">
							{no_tlp}
						</div>
						<label for="" class="text-xs text-gray-400">Email</label>
						<div class="pb-2">
							{email}
						</div>
					</div>
					<div>
						<label for="" class="text-xs text-gray-400">Kewarganegaraan</label>
						<div class="pb-2">
							{kewarganegaraan}
						</div>
						<label for="" class="text-xs text-gray-400">Kecamatan</label>
						<div class="pb-2">
							{kecamatan}
						</div>
						<label for="" class="text-xs text-gray-400">Kabupaten</label>
						<div class="pb-2">
							{kabupaten}
						</div>
					</div>
				</div>
			</Card>
		</div>
	</div>
</main>
