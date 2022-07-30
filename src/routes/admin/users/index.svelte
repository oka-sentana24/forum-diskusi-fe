<script lang="ts">
	import Header from '$components/Header.svelte';
	import { Breadcrumbs } from 'svelte-materialify';
	import { onMount } from 'svelte';
	import {
		DataTable,
		DataTableHead,
		DataTableRow,
		DataTableCell,
		DataTableBody,
		TextField,
		Button,
		Icon
	} from 'svelte-materialify';
	import { variables } from '$lib/variables';
	import { mdiChevronUp, mdiPlus, mdiChevronDown } from '@mdi/js';
	import { paginate, LightPaginationNav } from 'svelte-paginate';

	let columns = ['Id', 'Username', 'Password'];
	export let data = [{ text: 'Users', href: '#' }];

	let isopenFilter = false;
	let currentPage = 1;
	let pageSize = 10;
	$: paginatedItems = paginate({ items, pageSize, currentPage });
	let active = false;
	let username = '';
	let items = [];

	onMount(async () => {
		const res = await fetch(`${variables.basePath}/users/list`);
		const data = await res.json();
		items = data;
		var url = new URL(`${variables.basePath}/users/list?username`),
			params = {};
		Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));
		fetch(url).then((response) => response.json());
	});

	async function searchSiswa(username) {
		// bind ke on:submit
		let response = await fetch(`${variables.basePath}/users/list?username=${username}`);
		const data = await response.json();
		items = data;
	}
	function handleNamaChange(e) {
		// bind ke on:change
		username = e.target.value;
	}
</script>

<Header items={data} />
<main>
	<div class="m-5 relative">
		<!-- create and filter -->
		<div class="flex flex-cols-2 justify-between items-center pt-5">
			<div>
				<div class="flex flex-cols-2 items-center gap-5">
					<Button
						on:click={() => (isopenFilter = !isopenFilter)}
						class="bg-slate-400 p-5 rounded-md shadow-lg text-white transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300 dark:bg-gray-700"
					>
						<div class="normal-case text-sm gap-2 flex items-center ">
							<span> Filter </span>
							{#if isopenFilter}
								<Icon path={mdiChevronUp} size="20px" />
							{:else}
								<Icon path={mdiChevronDown} size="20px" />
							{/if}
						</div>
					</Button>
					{#if isopenFilter}
						<button on:click={() => searchSiswa(username)}>
							<span> Apply </span>
						</button>
					{/if}
					{#if username}
						<button type="reset">reset</button>
					{/if}
				</div>
			</div>
			<div
				class="flex justify-end transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300"
			>
				<!-- <a href="/admin/siswa/create">
					<Button class="bg-teal-500 p-5 rounded-md shadow-lg">
						<div class="normal-case text-sm text-white flex items-center gap-1">
							<span> Create </span>
							<Icon path={mdiPlus} size="20px" />
						</div>
					</Button>
				</a> -->
			</div>
		</div>
		<div class="py-3 relative">
			{#if isopenFilter}
				<div class="flex items-center justify-center gap-5 md:w-[15%] sm:w-[20%]">
					<TextField dense filled on:change={handleNamaChange}>Username</TextField>
				</div>
			{/if}
		</div>
		<!-- data table -->
		<div class="absolute w-full overflow-auto">
			<DataTable
				class="block bg-white overflow-auto rounded-none w-full h-[60vh]  scrollbar-thumb-teal-900 scrollbar-track-gray-100 scrollbar-thin dark:bg-gray-800"
			>
				<DataTableHead
					class="p-2 bg-teal-500 text-white sticky top-0 rounded-none w-full dark:bg-teal-900"
				>
					<DataTableRow>
						{#each columns as column}
							<DataTableCell>{column}</DataTableCell>
						{/each}
					</DataTableRow>
				</DataTableHead>
				<DataTableBody>
					{#each paginatedItems as item}
						<DataTableRow class="text-gray-500 dark:text-gray-300">
							<DataTableCell>{item.id}</DataTableCell>
							<DataTableCell>
								<a href="/admin/users/{item.id}/view" class="text-teal-500">
									{item.username}
								</a>
							</DataTableCell>
							<DataTableCell>{item.password}</DataTableCell>
						</DataTableRow>
					{/each}
				</DataTableBody>
			</DataTable>
			<LightPaginationNav
				totalItems={items.length}
				{pageSize}
				{currentPage}
				limit={1}
				showStepOptions={true}
				on:setPage={(e) => (currentPage = e.detail.page)}
			/>
		</div>
	</div>
</main>
