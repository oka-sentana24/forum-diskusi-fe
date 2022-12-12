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
		{ text: 'Guru', href: '/admin/guru' },
		{ text: 'Update', href: '#' }
	];

	let data = {
		id: '',
		username: '',
		nip: '',
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
		kabupaten: ''
	};
	let active;
	let snackbarSuccess: boolean = false;
	let snackbarError: boolean = false;
	let fetchKelas = [];
	let dataKelas = [];
	const Jenis_kelamin = ['Laki-Laki', 'Perempuan'];
	const Agama = ['Islam', 'Protestan', 'Katolik', 'Hindu', 'Buddha', 'Khonghucu'];

	onMount(() => {
		getFetchSiswa(`${variables.basePath}/guru/list/${$page.params.id}`).then((res) => {
			data = res;
			console.log('debug:', res);
		});

		getFetchKelas(`${variables.basePath}/kelas/list`).then((res) => {
			fetchKelas = res;
			dataKelas = fetchKelas.map((val) => {
				return { name: val.grade + ' ' + `(${val.nama})`, value: val.id };
			});
		});
	});
	async function getFetchSiswa(url) {
		return await fetch(url).then((res) => {
			return res.json();
		});
	}
	async function getFetchKelas(url) {
		return await fetch(url).then((res) => {
			return res.json();
		});
	}

	async function handleSubmit() {
		const headers = {
			'Content-Length': body.length,
			'Content-Type': 'application/json'
		};
		const response = await fetch(`${variables.basePath}/guru/update/${$page.params.id}`, {
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
				window.location.href = '/admin/guru';
			}, 1000);
		} else {
			responseMessage = message.message;
			snackbarError = true;
			window.location.href = '/admin/guru/create';
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
							<div class="grid gap-9">
								<TextField
									filled
									bind:value={data.id}
									readonly
									rules={[
										(v) => !!v || ' This field is required.',
										(v) => v.length <= 10 || 'Max 10 characters',
										(v) => {
											const pattern = /^\d+$/;
											return pattern.test(v) || 'This field is number.';
										}
									]}
									type="text">Nip</TextField
								>
								<TextField
									filled
									bind:value={data.nip}
									rules={[
										(v) => !!v || ' This field is required.',
										(v) => v.length <= 10 || 'Max 10 characters',
										(v) => {
											const pattern = /^\d+$/;
											return pattern.test(v) || 'This field is number.';
										}
									]}
									type="text">Nip</TextField
								>
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
								<Select
									filled
									items={Jenis_kelamin}
									class="main-input dropdown"
									bind:value={data.jenis_kelamin}>Jenis_kelamin</Select
								>
								<TextField
									filled
									bind:value={data.tempat_lahir}
									rules={[
										(v) => !!v || ' This field is required.',
										(v) => {
											const pattern = /^(?=.{1,50}$)[^\W_]+(?: [^\W_]+)*$/;
											return pattern.test(v) || 'Tempat lahir is invalid.';
										}
									]}
									type="text">Tempat Lahir</TextField
								>
								<TextField
									filled
									placeholder="Placeholder"
									class="mr-[13px]"
									type="date"
									bind:value={data.tanggal_lahir}>Tanggal Lahir</TextField
								>
								<Select filled items={Agama} class="main-input dropdown" bind:value={data.agama}
									>Agama</Select
								>
								<TextField
									filled
									bind:value={data.alamat}
									rules={[
										(v) => !!v || ' This field is required.',
										(v) => {
											const pattern = /^(?=.{1,50}$)[^\W_]+(?: [^\W_]+)*$/;
											return pattern.test(v) || 'Alamat is invalid.';
										}
									]}
									type="text">Alamat</TextField
								>
							</div>
						</div>
						<div class="w-full">
							<div class="grid gap-9">
								<TextField
									filled
									bind:value={data.no_tlp}
									rules={[
										(v) => !!v || ' This field is required.',
										(v) => {
											const pattern = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
											return pattern.test(v) || 'Mobile number is invalid.';
										}
									]}
									type="text">Mobile Number</TextField
								>
								<TextField
									filled
									bind:value={data.email}
									rules={[
										(v) => !!v || ' This field is required.',
										(v) => v.length <= 25 || 'Max 25 characters',
										(v) => {
											const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
											return pattern.test(v) || 'E-mail is invalid.';
										}
									]}
									type="text">E-mail</TextField
								>
								<TextField
									filled
									bind:value={data.ktp}
									rules={[
										(v) => !!v || ' This field is required.',
										(v) => {
											const pattern = /^(?=.{1,50}$)[^\W_]+(?: [^\W_]+)*$/;
											return pattern.test(v) || 'Nama ayah is invalid.';
										}
									]}
									type="text">Ktp</TextField
								>
								<TextField
									filled
									bind:value={data.jabatan}
									rules={[
										(v) => !!v || ' This field is required.',
										(v) => {
											const pattern = /^(?=.{1,50}$)[^\W_]+(?: [^\W_]+)*$/;
											return pattern.test(v) || 'Pekerjaan ayah is invalid.';
										}
									]}
									type="text">Jabatan</TextField
								>
								<Select
									filled
									items={dataKelas}
									class="main-input dropdown"
									bind:value={data.kelasId}>Kelas</Select
								>
								<TextField
									filled
									bind:value={data.kewarganegaraan}
									rules={[
										(v) => !!v || ' This field is required.',
										(v) => {
											const pattern = /^(?=.{1,50}$)[^\W_]+(?: [^\W_]+)*$/;
											return pattern.test(v) || 'Kewarganegaraan is invalid.';
										}
									]}
									type="text">Kewarganegaraan</TextField
								>
								<TextField
									filled
									bind:value={data.kecamatan}
									rules={[
										(v) => !!v || ' This field is required.',
										(v) => {
											const pattern = /^(?=.{1,50}$)[^\W_]+(?: [^\W_]+)*$/;
											return pattern.test(v) || 'Kewarganegaraan is invalid.';
										}
									]}
									type="text">Kecamatan</TextField
								>
								<TextField
									filled
									bind:value={data.kabupaten}
									rules={[
										(v) => !!v || ' This field is required.',
										(v) => {
											const pattern = /^(?=.{1,50}$)[^\W_]+(?: [^\W_]+)*$/;
											return pattern.test(v) || 'Kewarganegaraan is invalid.';
										}
									]}
									type="text">Kabupaten</TextField
								>
							</div>
						</div>
					</div>
				</div></Card
			>
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
						data.kewarganegaraan === '' ||
						data.no_tlp === '' ||
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
