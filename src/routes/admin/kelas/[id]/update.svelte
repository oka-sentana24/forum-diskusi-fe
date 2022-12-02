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
		{ text: 'Kelas', href: '/admin/Kelas' },
		{ text: 'Update', href: '#' }
	];

	let data = {
		id: '',
		nama: '',
		grade: ''
	};
	let active;
	let snackbarSuccess: boolean = false;
	let snackbarError: boolean = false;
	let fetchKelas = [];
	let dataKelas = [];

	onMount(() => {
		getFetchSiswa(`${variables.basePath}/kelas/list/${$page.params.id}`).then((res) => {
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
		const response = await fetch(`${variables.basePath}/kelas/update/${$page.params.id}`, {
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
<main class=" overflow-auto h-screen bg-root">
	<div class="m-5 relative">
		<!-- data table -->
		<div class="absolute w-full">
			<Card>
				<div class="p-5">
					<div class="grid gap-9">
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
						<TextField
							filled
							bind:value={data.grade}
							rules={[
								(v) => !!v || ' This field is required.',
								(v) => {
									const pattern = /^(?=.{1,50}$)[^\W_]+(?: [^\W_]+)*$/;
									return pattern.test(v) || 'Name is invalid.';
								}
							]}
							type="text">Grade</TextField
						>
					</div>
				</div>
			</Card>
			<div class="flex justify-end py-5">
				<Button
					create
					disabled={data.nama === '' || data.grade === ''}
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
					class=" bg-other-success text-base-white gap-5 text-base flex-column"
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
