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
	/* Interfaces */
	type Jurusan = {
		id: number;
		nama: string;
	};
	/* Variable */
	let items: Jurusan[] = [];
	let data = [{ text: 'Jurusan', href: '#' }];
	let columns = ['No', 'Nama'];
	let isOpenFilter = false;
	let isLoading = false;
	let nama = '';
	let currentPage = 1;
	let pageSize = 10;
	const reset = () => {
		nama = '';
	};
	$: paginatedItems = paginate({ items, pageSize, currentPage });

	/* Get Data and filtering */
	onMount(async () => {
		try {
			isLoading = true;
			const res = await fetch(`${variables.basePath}/jurusan/list`);
			const data = await res.json();
			items = data;
			console.log('getData', items);
		} catch (e) {
			isLoading = false;
			// correctly (?) nothing can be caught here...
			console.log('no data');
		}

		var url = new URL(`${variables.basePath}/jurusan/list?nama`),
			params = {};
		Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));
		fetch(url).then((response) => response.json());
	});
	async function searchSiswa(nama) {
		// bind ke on:submit
		let response = await fetch(`${variables.basePath}/jurusan/list?nama=${nama}`);
		const data = await response.json();
		items = data;
	}
	function handleNamaChange(e) {
		// bind ke on:change
		nama = e.target.value;
	}
</script>

<Header items={data} />
<main class="p-5">
	<!-- top Header -->
	<div class="flex col-span-2  items-center justify-between">
		<div class="min-w-[96px]  flex col-span-2 gap-5 items-center justify-center">
			<Button filter submite={() => (isOpenFilter = !isOpenFilter)}
				>Filter <Icon path={isOpenFilter ? mdiChevronUp : mdiChevronDown} /></Button
			>
			{#if isOpenFilter}
				<button on:click={() => searchSiswa(nama)}>Apply</button>
				<button>Reset</button>
			{/if}
		</div>
		<div class="min-w-[96px]">
			<a href="/admin/jurusan/create">
				<Button secondary>Create +</Button>
			</a>
		</div>
	</div>
	<div class="py-5 w-64">
		{#if isOpenFilter}
			<Textfield
				variant="filled"
				on:change={handleNamaChange}
				label="Name"
				bind:value={nama}
				class="bg-white shadow-sm"
			/>
		{/if}
	</div>
	<!-- content -->
	<section>
		<DataTable class="h-[60vh]">
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
							Tidak ada jurusan yang ditemukan
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
									{item.nama}
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
