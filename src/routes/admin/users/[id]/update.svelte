<script>
	import { username } from './../../../../stores/videoChat.ts';
	import { variables } from '$lib/variables';
	// @ts-nocheck
	import { Card, TextField, Select, Button, Icon, Snackbar } from 'svelte-materialify';
	import { mdiContentSave, mdiCheckCircle, mdiCogSyncOutline } from '@mdi/js';
	import Header from '$components/Header.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	export let items = [
		{ text: 'Uses', href: '/admin/uses' },
		{ text: 'Update', href: '#' }
	];

	let data = {
		username: '',
		password: ''
	};
	let snackbar = false;
	let fetchKelas = [];
	let dataKelas = [];
	let fetchJurusan = [];
	let dataJurusan = [];
	onMount(() => {
		getFetchSiswa(`${variables.basePath}/users/list/${$page.params.id}`).then((res) => {
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
		const token = localStorage.getItem('token');
		const response = await fetch(`${variables.basePath}/siswa/update/${$page.params.id}`, {
			method: 'PUT',
			credentials: 'same-origin',
			body: JSON.stringify({ ...data }),
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${token}`
			}
		});

		if (response.status === 200 || response.status === 201) {
			snackbar = true;
			window.location.href = '/admin/users';
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
			<Card class="block bg-white rounded-none dark:bg-gray-800">
				<div class="p-5">
					<div class="w-full">
						<div class="relative py-3">
							<TextField dense filled bind:value={data.id} disabled>Username</TextField>
						</div>
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
								]}>Username</TextField
							>
						</div>
						<div class="relative py-3">
							<TextField
								dense
								filled
								bind:value={data.password}
								rules={[
									(v) => !!v || 'Required',
									(v) => v.length <= 10 || 'Max 10 characters',
									(v) => {
										const pattern = /^[0-9]*$/;
										return pattern.test(v) || 'Invalid username.';
									}
								]}>Password</TextField
							>
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
