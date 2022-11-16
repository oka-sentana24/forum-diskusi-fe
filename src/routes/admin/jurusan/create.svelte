<script lang="ts">
	// @ts-nocheck
	import '$sass/tailwind.scss';
	import { variables } from '$lib/variables';
	import { TextField, Icon, Dialog, Snackbar } from 'svelte-materialify';
	import Card from '$components/Card.svelte';
	import { mdiContentSave, mdiCheckCircle, mdiAlert } from '@mdi/js';
	import Header from '$components/Header.svelte';
	import Button from '$components/Button.svelte';

	let items = [
		{ text: 'Siswa', href: '/admin/siswa' },
		{ text: 'Create', href: '#' }
	];

	let data = {
		nama: ''
	};
	let snackbarSuccess: boolean = false;
	let snackbarError: boolean = false;
	let active;
	let responseMessage = '';

	function onClose() {
		active = false;
	}
	async function handleSubmit() {
		const headers = {
			'Content-Length': body.length,
			'Content-Type': 'application/json'
		};
		const response = await fetch(`${variables.basePath}/jurusan`, {
			method: 'POST',
			credentials: 'same-origin',
			body: JSON.stringify({ ...data }),
			headers
		});

		let message = await response.json();
		if (response.status === 200 || response.status === 201) {
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
				</div></Card
			>
			<div class="flex justify-end py-5">
				<Button create disabled={data.nama === ''} click={() => (active = true)}>
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
						<span>{responseMessage}</span>
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
					<span>{responseMessage}</span>
				</Snackbar>
			</div>
		</div>
	</div>
</main>
