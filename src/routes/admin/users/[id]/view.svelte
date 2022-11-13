<script>
	import { variables } from '$lib/variables';
	import { Card, Button, Icon, Dialog, Snackbar } from 'svelte-materialify';
	import { page } from '$app/stores';
	import { mdiAccountEdit, mdiDelete, mdiAlert, mdiCheckCircle } from '@mdi/js';
	import Header from '$components/Header.svelte';
	let snackbar = false;
	let active;
	let id, username, password;
	export let items = [
		{ text: 'Users', href: '/admin/users' },
		{ text: 'View', href: '#' }
	];
	// @ts-ignore
	fetch(`${variables.basePath}/users/list/${$page.params.id}`)
		.then((resp) => resp.json())
		.then((res) => {
			id = res.id;
			username = res.username;
			password = res.password;
		});
</script>

<Header {items} />
<main>
	<div class="m-5 relative">
		<!-- create and filter -->
		<div class="flex justify-end py-5">
			<a href="/admin/users/{id}/update">
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
			<Card class="bg-white shadow-none dark:bg-gray-800">
				<div class="p-5 flex flex-cols-2 gap-20">
					<div>
						<label for="" class="text-xs text-gray-400 dark:text-white">Id</label>
						<div class="pb-2">
							{id}
						</div>
						<label for="" class="text-xs text-gray-400 dark:text-white">Username</label>
						<div class="pb-2">
							{username}
						</div>
						<label for="" class="text-xs text-gray-400 dark:text-white">Password</label>
						<div class="pb-2">
							{password}
						</div>
						<div />
					</div>
				</div></Card
			>
		</div>
	</div>
</main>
