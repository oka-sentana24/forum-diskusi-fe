<script lang="ts">
	/* Module */
	import DataTable, { Head, Body, Row, Cell, Pagination } from '@smui/data-table';
	import Button, { Label } from '@smui/button';
	import Textfield from '@smui/textfield';
	import Header from '$components/Header.svelte';
	import { variables } from '$lib/variables';
	import { onMount } from 'svelte';
	import { mdiChevronUp, mdiChevronDown, mdiPlus, mdiFolderSettingsOutline } from '@mdi/js';
	import { Icon } from 'svelte-materialify';
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
	let isloading = false;
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
			isloading = true;
			const res = await fetch(`${variables.basePath}/jurusan/list`);
			const data = await res.json();
			items = data;
			console.log('getData', items);
		} catch (e) {
			isloading = false;
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
	<section class="block py-5">
		<div class="flex justify-between">
			<div>
				<div class="flex flex-span-2 items-center justify-start gap-5">
					<Button
						variant="raised"
						on:click={() => (isOpenFilter = !isOpenFilter)}
						class="bg-gray-400"
					>
						<Label class="text-xs normal-case text-white"
							>Filter
							<Icon path={isOpenFilter ? mdiChevronUp : mdiChevronDown} />
						</Label>
					</Button>
					{#if isOpenFilter}
						<span
							class="text-gray-400 hover:text-teal-600 text-xs normal-case"
							on:click={() => searchSiswa(nama)}>Apply</span
						>
						<span class="text-gray-400 hover:text-teal-600 text-xs normal-case" on:click={reset}
							>reset</span
						>
					{/if}
				</div>
				<div class="w-full">
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
			</div>
			<div>
				<Button variant="raised" class="bg-teal-300" href="/admin/jurusan/create">
					<Label class="text-xs normal-case text-white"
						>Create <Icon path={mdiPlus} size="15px" /></Label
					>
				</Button>
			</div>
		</div>
	</section>
	<!-- content -->
	<section>
		<DataTable class="relative h-[60vh]">
			<Head>
				<Row>
					{#each columns as column}
						<Cell>{column}</Cell>
					{/each}
				</Row>
			</Head>
			<Body>
				{#if isloading === items.length <= 0}
					<div class="absolute flex items-center justify-center w-full h-[60vh]">
						<span class="grid items-center">
							<Icon path={mdiFolderSettingsOutline} />
							Tidak ada jurusan yang ditemukan
						</span>
					</div>
				{:else if items.length >= 1}
					{#each paginatedItems as item, index}
						<Row class="text-gray-500">
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
						<span class="grid items-center"> loading... </span>
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
