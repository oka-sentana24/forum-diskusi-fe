<script lang="ts">
	// @ts-nocheck
	/* Module */
	import { Icon } from 'svelte-materialify';
	import { mdiChevronUp, mdiChevronDown, mdiPlus, mdiFolderSettingsOutline } from '@mdi/js';
	import DataTable, { Head, Body, Row, Cell, Pagination } from '@smui/data-table';
	import Button from '$components/Button.svelte';
	import Textfield from '@smui/textfield';
	import Header from '$components/Header.svelte';
	import { variables } from '$lib/variables';
	import { onMount } from 'svelte';
	import { paginate, LightPaginationNav } from 'svelte-paginate';

	let columns = ['Id', 'Username'];
	export let data = [{ text: 'Users', href: '#' }];

	let isOpenFilter = false;
	let currentPage = 1;
	let pageSize = 10;
	$: paginatedItems = paginate({ items, pageSize, currentPage });
	let active = false;
	let username = '';
	let items = [];
	let isLoading: boolean;

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
		let response = await fetch(`${variables.basePath}/users/list?username=${username}`);
		const data = await response.json();
		items = data;
	}
	function handleNamaChange(e) {
		username = e.target.value;
	}
</script>

<Header items={data} />
<main class="p-5">
	<div class="flex col-span-2  items-center justify-between">
		<div class="min-w-[96px]  flex col-span-2 gap-5 items-center justify-center">
			<Button filter submite={() => (isOpenFilter = !isOpenFilter)}
				>Filter <Icon path={isOpenFilter ? mdiChevronUp : mdiChevronDown} /></Button
			>
			{#if isOpenFilter}
				<button on:click={() => searchSiswa(username)}>Apply</button>
				<button>Reset</button>
			{/if}
		</div>
		<!-- <div class="min-w-[96px]">
			<Button secondary>Create <Icon path={}/></Button>
		</div> -->
	</div>
	<div class="py-5 w-64">
		{#if isOpenFilter}
			<Textfield
				variant="filled"
				on:change={handleNamaChange}
				label="Name"
				bind:value={username}
				class="bg-white shadow-sm"
			/>
		{/if}
	</div>
	<section>
		<DataTable class=" h-[60vh]">
			<Head>
				<Row>
					{#each columns as column}
						<Cell class="text-base">{column}</Cell>
					{/each}
				</Row>
			</Head>
			<Body>
				{#if isLoading === items.length <= 0}
					<div class="absolute flex items-center justify-center w-full h-[60vh]">
						<span class="grid items-center text-base gap-y-2">
							<Icon path={mdiFolderSettingsOutline} />
							Tidak ada Pengguna yang ditemukan
						</span>
					</div>
				{:else if items.length >= 1}
					{#each paginatedItems as item, index}
						<Row class="text-gray-500 text-base">
							<Cell>
								{index + 1}
							</Cell>
							<Cell>
								<a href="/admin/jurusan/{item.id}/view" class="text-teal-500">
									{item.username}
								</a>
							</Cell>
						</Row>
					{/each}
				{:else}
					<div class="absolute flex items-center justify-center w-full h-[60vh]">
						<span class="grid items-center text-base"> loading... </span>
					</div>
				{/if}
			</Body>
		</DataTable>

		<LightPaginationNav
			totalItems={items.length}
			{pageSize}
			{currentPage}
			limit={1}
			showStepOptions={true}
			on:setPage={(e) => (currentPage = e.detail.page)}
		/>
	</section>
</main>
