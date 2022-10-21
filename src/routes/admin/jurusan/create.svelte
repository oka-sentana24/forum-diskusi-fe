<script lang="ts">
	// @ts-nocheck
	import { Icon } from 'svelte-materialify';
	import { mdiContentSave, mdiAlertRhombus, mdiCheckCircle, mdiAlert } from '@mdi/js';
	import Header from '$components/Header.svelte';
	import { variables } from '$lib/variables';
	import Textfield from '@smui/textfield';
	import Card from '@smui/card/src/Card.svelte';
	import { Dialog, Snackbar } from 'svelte-materialify';
	import Button from '$components/Button.svelte';
	import HelperText from '@smui/textfield/helper-text';

	export let items = [
		{ text: 'Jurusan', href: '/admin/jurusan' },
		{ text: 'Create', href: '#' }
	];

	let data = {
		nama: ''
	};
	let validationText = /^(?=.{3,50}$)[^\W_]+(?: [^\W_]+)*$/;
	let snackbarSuccess: boolean = false;
	let snackbarError: boolean = false;
	let isLoading = false;
	let dirty = false;
	let errorNama = false;
	let active;
	let responseMessage = '';

	function onClose() {
		active = false;
	}
	async function handleSubmit() {
		const response = await fetch(`${variables.basePath}/jurusan`, {
			method: 'POST',
			credentials: 'same-origin',
			body: JSON.stringify({ ...data }),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		let message = await response.json();
		if (response.status === 200 || response.status === 201) {
			isLoading = true;
			responseMessage = message.message;
			onClose();
			snackbarSuccess = true;
			setTimeout(() => {
				window.location.href = '/admin/jurusan';
			}, 1000);
		} else {
			responseMessage = message.message;
			snackbarError = false;
		}
	}
</script>

<Header {items} />
<main class="overflow-auto h-screen">
	<div class="m-5 relative">
		<div class="absolute w-full">
			<Card>
				<div class="p-5">
					<!-- <Title text="Create Jurusan" /> -->
					<div class="w-full">
						<div class="relative py-3">
							<Textfield
								type="text"
								variant="filled"
								bind:dirty
								bind:value={data.nama}
								label="Jurusan"
								bind:invalid={errorNama}
								updateInvalid
								required
							>
								<svelte:fragment slot="helper">
									{#if data.nama === ''}
										<HelperText validationMsg slot="helper">
											<span class="absolute flex flex-span-2 items-center gap-2">
												<Icon path={mdiAlertRhombus} size="15" />
												This field is required.
											</span>
										</HelperText>
									{:else if !data.nama.match(validationText)}
										<HelperText validationMsg slot="helper">
											<span class="absolute flex flex-span-2 items-center gap-2">
												<Icon path={mdiAlertRhombus} size="15" />
												cannot space in front text
											</span>
										</HelperText>
									{:else}
										<HelperText slot="helper" />
									{/if}
								</svelte:fragment>
							</Textfield>
						</div>
					</div>
				</div>
			</Card>
			<div class="flex justify-end py-5">
				<Button
					secondary
					submite={() => (active = true)}
					disabled={data.nama === '' || !data.nama.match(validationText)}
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
						<Button secondary submite={() => handleSubmit()}>Simpan</Button>
						<Button close submite={() => onClose()}>Kembali</Button>
					</div>
				</Dialog>
				<Snackbar
					class="bg-white text-green-500 gap-5 text-base flex-column"
					bind:active={snackbarSuccess}
					top
					center
					timeout={3000}
				>
					<span class=" flex py-2 gap-5 items-center justify-around"
						><Icon path={mdiCheckCircle} size={25} />
						{responseMessage}</span
					>
				</Snackbar>
				<Snackbar
					class="flex-column bg-white text-red-500 gap-5 text-base "
					bind:active={snackbarError}
					top
					center
					timeout={3000}
				>
					<Icon path={mdiAlert} size={25} />
					{responseMessage}
				</Snackbar>
			</div>
		</div>
	</div>
</main>
