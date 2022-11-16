<script lang="ts">
	// @ts-nocheck
	import '$sass/tailwind.scss';
	import { variables } from '$lib/variables';
	import { TextField, Select, Icon, Dialog, Snackbar } from 'svelte-materialify';
	import Card from '$components/Card.svelte';
	import { mdiContentSave, mdiCheckCircle, mdiAlert } from '@mdi/js';
	import Header from '$components/Header.svelte';
	import { onMount } from 'svelte';
	import Button from '$components/Button.svelte';

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
		kelasId: ''
	};
	let snackbarSuccess: boolean = false;
	let snackbarError: boolean = false;
	let active;
	let responseMessage = '';
	let fetchKelas = [];
	let dataKelas = [];
	let isLoading = false;
	const Jenis_kelamin = ['Laki-Laki', 'Perempuan'];
	const Agama = ['Islam', 'Protestan', 'Katolik', 'Hindu', 'Buddha', 'Khonghucu'];

	onMount(() => {
		getFetchKelas(`${variables.basePath}/kelas/list`).then((res) => {
			fetchKelas = res;
			dataKelas = fetchKelas.map((val) => {
				return { name: val.grade + ' ' + `(${val.nama})`, value: val.id };
			});
		});
	});
	async function getFetchKelas(url) {
		return await fetch(url).then((res) => {
			return res.json();
		});
	}

	function onClose() {
		active = false;
	}
	async function handleSubmit() {
		const headers = {
			'Content-Type': 'application/json'
		};
		const response = await fetch(`${variables.basePath}/siswa`, {
			method: 'POST',
			credentials: 'same-origin',
			body: JSON.stringify({ ...data }),
			headers
		});

		let message = await response.json();
		if (response.status === 201) {
			response.json();
			isLoading = true;
			responseMessage = message.message;
			onClose();
			snackbarSuccess = true;
			console.log('testing', snackbarSuccess);

			setTimeout(() => {
				window.location.href = '/admin/siswa';
			}, 500);
		} else {
			responseMessage = message.message;
			snackbarError = true;
		}
	}
</script>

<Header {items} />
<main class=" overflow-auto h-screen bg-main-light-secondary dark:bg-main-dark-secondary">
	<div class="m-5 relative">
		<!-- data table -->
		<div class="absolute w-full">
			<Card>
				<div class="p-5">
					<div class="flex flex-cols-2 gap-3">
						<div class="w-full">
							<div class="main-input">
								<TextField
									filled
									bind:value={data.username}
									rules={[
										(v) => !!v || ' This field is required.',
										(v) => v.length <= 10 || 'Max 10 characters',
										(v) => {
											const pattern = /^\d+$/;
											return pattern.test(v) || 'This field is number.';
										}
									]}
									type="text">Nisn</TextField
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
							<div class="main-input">
								<Select
									filled
									items={Jenis_kelamin}
									class="main-input dropdown"
									bind:value={data.jenis_kelamin}>Jenis_kelamin</Select
								>
							</div>
							<div class="main-input">
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
							</div>
							<div class="main-input">
								<TextField
									filled
									placeholder="Placeholder"
									class="mr-[13px]"
									type="date"
									bind:value={data.tanggal_lahir}>Tanggal Lahir</TextField
								>
							</div>
							<div class="main-input">
								<Select filled items={Agama} class="main-input dropdown" bind:value={data.agama}
									>Agama</Select
								>
							</div>
						</div>
						<div class="w-full">
							<div class="main-input">
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
							</div>
							<div class="main-input">
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
							</div>
							<div class="main-input">
								<TextField
									filled
									bind:value={data.nama_ayah}
									rules={[
										(v) => !!v || ' This field is required.',
										(v) => {
											const pattern = /^(?=.{1,50}$)[^\W_]+(?: [^\W_]+)*$/;
											return pattern.test(v) || 'Nama ayah is invalid.';
										}
									]}
									type="text">Nama Ayah</TextField
								>
							</div>
							<div class="main-input">
								<TextField
									filled
									bind:value={data.pekerjaan_ayah}
									rules={[
										(v) => !!v || ' This field is required.',
										(v) => {
											const pattern = /^(?=.{1,50}$)[^\W_]+(?: [^\W_]+)*$/;
											return pattern.test(v) || 'Pekerjaan ayah is invalid.';
										}
									]}
									type="text">Pekerjaan Ayah</TextField
								>
							</div>
							<div class="main-input">
								<TextField
									filled
									bind:value={data.nama_ibu}
									rules={[
										(v) => !!v || ' This field is required.',
										(v) => {
											const pattern = /^(?=.{1,50}$)[^\W_]+(?: [^\W_]+)*$/;
											return pattern.test(v) || 'Pekerjaan ayah is invalid.';
										}
									]}
									type="text">Nama Ibu</TextField
								>
							</div>
							<div class="main-input">
								<TextField
									filled
									bind:value={data.pekerjaan_ibu}
									rules={[
										(v) => !!v || ' This field is required.',
										(v) => {
											const pattern = /^(?=.{1,50}$)[^\W_]+(?: [^\W_]+)*$/;
											return pattern.test(v) || 'Pekerjaan Ibu is invalid.';
										}
									]}
									type="text">Pekerjaan Ibu</TextField
								>
							</div>
						</div>
					</div>
					<div class="flex flex-cols-2 gap-3">
						<div class="w-full">
							<div class="main-input">
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
							<div class="main-input">
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
							</div>
						</div>
						<div class="w-full">
							<div class="main-input">
								<TextField
									filled
									bind:value={data.kecamatan}
									rules={[
										(v) => !!v || ' This field is required.',
										(v) => {
											const pattern = /^(?=.{1,50}$)[^\W_]+(?: [^\W_]+)*$/;
											return pattern.test(v) || 'Kecamatan is invalid.';
										}
									]}
									type="text">Kecamatan</TextField
								>
							</div>
							<div class="main-input">
								<TextField
									filled
									bind:value={data.kabupaten}
									rules={[
										(v) => !!v || ' This field is required.',
										(v) => {
											const pattern = /^(?=.{1,50}$)[^\W_]+(?: [^\W_]+)*$/;
											return pattern.test(v) || 'Kabupaten is invalid.';
										}
									]}
									type="text">Kabupaten</TextField
								>
							</div>
						</div>
					</div>
					<div class="flex flex-cols-2 gap-3">
						<div class="w-full">
							<div class="main-input">
								<Select
									filled
									items={dataKelas}
									class="main-input dropdown"
									bind:value={data.kelasId}>Kelas</Select
								>
							</div>
						</div>
						<div class="w-full">
							<!-- <div class="main-input">
								<Select
									filled
									items={dataGrade}
									class="main-input dropdown"
									bind:value={data.kelasId}>Grade</Select
								>
							</div> -->
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
				<Dialog
					class="pa-4 text-center bg-white w-[300px] text-black"
					bind:active
					persistent={true}
				>
					<div class="py-2">
						<Icon path={mdiAlert} size={25} />
					</div>
					<div class="font-bold text-base">Simpan perubahan?</div>
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
		</div>
	</div>
</main>
