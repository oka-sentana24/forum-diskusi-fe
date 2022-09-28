<script lang="ts">
	// @ts-nocheck
	import { Icon } from 'svelte-materialify';
	import { mdiChevronUp, mdiChevronDown, mdiPlus, mdiFolderSettingsOutline } from '@mdi/js';
	import DataTable, { Head, Body, Row, Cell, Pagination } from '@smui/data-table';
	import Button from '$components/Button.svelte';
	import Textfield from '@smui/textfield';
	import Header from '$components/Header.svelte';
	import { variables } from '$lib/variables';
	import { onMount } from 'svelte';
	import { paginate, LightPaginationNav } from 'svelte-paginate';
	type Kelas = {
		id: number;
		nama: string;
		grade: string;
	};
	let items: Kelas[] = [];
	let data = [{ text: 'Kelas', href: '#' }];
	let columns = ['No', 'Nama', 'Grade'];
	let isOpenFilter = false;
	let isloading = false;
	let nama = '';
	let currentPage = 1;
	let pageSize = 10;
	const reset = () => {
		nama = '';
	};
	$: paginatedItems = paginate({ items, pageSize, currentPage });

	onMount(async () => {
		// const res = await fetch(`${variables.basePath}/kelas/list`);
		// const data = await res.json();
		// items = data;
		// var url = new URL(`${variables.basePath}/kelas/list?nama`),
		// 	params = {};
		// Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));
		// fetch(url).then((response) => response.json());
		try {
			isloading = true;
			const res = await fetch(`${variables.basePath}/kelas/list`);
			const data = await res.json();
			items = data;
			console.log('getData', items);
		} catch (e) {
			isloading = false;
			// correctly (?) nothing can be caught here...
			console.log('no data');
		}

		var url = new URL(`${variables.basePath}/kelas/list?nama`),
			params = {};
		Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));
		fetch(url).then((response) => response.json());
	});

	async function searchSiswa(nama) {
		// bind ke on:submit
		let response = await fetch(`${variables.basePath}/kelas/list?nama=${nama}`);
		const data = await response.json();
		items = data;
	}
	function handleNamaChange(e) {
		// bind ke on:change
		nama = e.target.value;
	}
</script>

<Header items={data}>List Kelas</Header>
<main class="p-5">
	<!-- top Header -->
	<section class="block mb-[35px]">
		<div class="flex justify-between">
			<div>
				<div class="flex flex-span-2 items-center justify-start gap-2">
					<Button filter submite={() => (isOpenFilter = !isOpenFilter)}>
						<div class="flex flex-span-1 gap-3 items-center justify-between text-white">
							Filter
							<Icon path={isOpenFilter ? mdiChevronUp : mdiChevronDown} size="20px" />
						</div>
					</Button>
					{#if isOpenFilter}
						<span
							class="text-gray-400 hover:text-indigo-500 normal-case"
							on:click={() => searchSiswa(nama)}>Apply</span
						>
						<span class="text-gray-400 hover:text-indigo-500 normal-case" on:click={reset}
							>Reset</span
						>
					{/if}
				</div>
				<div class="w-full relative bottom-5">
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
				<a href="/admin/kelas/create">
					<Button primary>
						<div class="items-center flex justify-center gap-2">
							Create <Icon path={mdiPlus} size="15px" />
						</div>
					</Button>
				</a>
			</div>
		</div>
	</section>
	<!-- content -->
	<section>
		<DataTable class="relative h-[60vh] bottom-[30px]">
			<Head>
				<Row>
					{#each columns as column}
						<Cell class="text-base">{column}</Cell>
					{/each}
				</Row>
			</Head>
			<Body>
				{#if isloading === items.length <= 0}
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
							<Cell class="w-[100px]">
								<a href="/admin/kelas/{item.id}/view" class="text-teal-500">
									{item.nama}
								</a>
							</Cell>
							<Cell>
								{item.grade}
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
