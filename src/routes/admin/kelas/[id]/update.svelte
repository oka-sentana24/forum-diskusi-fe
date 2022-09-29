<script lang="ts">
	// @ts-nocheck
	import { mdiContentSave, mdiAlertRhombus, mdiCheckCircle, mdiAlert } from '@mdi/js';
	import Header from '$components/Header.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { variables } from '$lib/variables';
	import Card from '@smui/card';
	import Textfield from '@smui/textfield';
	import Button from '$components/Button.svelte';
	import { Dialog, Snackbar, Icon } from 'svelte-materialify';
	import Select, { Option } from '@smui/select';
	export let items = [
		{ text: 'Kelas', href: '/admin/kelas' },
		{ text: 'Update', href: '#' }
	];
	let data = {
		id: '',
		nama: '',
		grade: ''
	};
	const grade = [{ text: 'X' }, { text: 'XI' }, { text: 'XII' }];
	let snackbarSuccess: boolean = false;
	let snackbarError: boolean = false;
	let active;
	let responseMessage = '';
	function onClose() {
		active = false;
	}
	onMount(() => {
		getFetchKelas(`${variables.basePath}/kelas/list/${$page.params.id}`).then((res) => {
			data = res;
			console.log('debug:', res);
		});
	});
	async function getFetchKelas(url) {
		return await fetch(url).then((res) => {
			return res.json();
		});
	}
	async function handleSubmit() {
		console.log('return');

		const response = await fetch(`${variables.basePath}/kelas/update/${$page.params.id}`, {
			method: 'PUT',
			credentials: 'same-origin',
			body: JSON.stringify({ ...data }),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		let message = await response.json();
		if (response.status === 200 || response.status === 201) {
			responseMessage = message.message;
			onClose();
			snackbarSuccess = true;
			setTimeout(() => {
				window.location.href = '/admin/kelas';
			}, 1000);
		} else {
			responseMessage = message.message;
			snackbarError = false;
		}
		// what do you do with a non-redirect?
	}
</script>

<Header {items} />
<main class="overflow-auto h-screen">
	<div class="m-5 relative">
		<!-- data table -->
		<div class="absolute w-full">
			<Card class="bg-white shadow-none dark:bg-gray-800">
				<div class="p-5">
					<div class="flex flex-cols-2 gap-3">
						<div class="w-full dark:text-gray-300">
							<div class="relative py-3">
								<Textfield variant="filled" label="Id" bind:value={data.id} disabled />
							</div>
							<div class="relative py-3">
								<Textfield variant="filled" label="Nama" bind:value={data.nama} />
							</div>
							<div class="relative py-3">
								<Select variant="filled" label="Grade" bind:value={data.grade} class="w-full">
									<Option value="" />
									{#each grade as items}
										<Option value={items.text}>{items.text}</Option>
									{/each}
									<Option />
								</Select>
							</div>
						</div>
					</div>
				</div>
			</Card>
			<div class="flex justify-end py-5">
				<Button primary submite={() => (active = true)}>
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
						<Button primary submite={() => handleSubmit()}>Simpan</Button>
						<Button secondary submite={() => onClose()}>Kembali</Button>
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
						Data berhasil di perbarui</span
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
					Data tidak dapat di perbarui
				</Snackbar>
			</div>
		</div>
	</div>
</main>
