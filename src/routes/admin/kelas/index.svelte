<script>
	import Header from '$components/Header.svelte';
	import { onMount } from 'svelte';
	import {
		Button,
		Icon,
		DataTable,
		DataTableHead,
		DataTableRow,
		DataTableCell,
		DataTableBody,
		TextField
	} from 'svelte-materialify';
	import { mdiPlus, mdiChevronDown } from '@mdi/js';
	import { paginate, LightPaginationNav } from 'svelte-paginate';
	import { mdiChevronUp } from '@mdi/js';
	import { variables } from '$lib/variables';

	let isopenFilter = false;
	let currentPage = 1;
	let pageSize = 10;
	$: paginatedItems = paginate({ items, pageSize, currentPage });
	let data = [{ text: 'Kelas', href: '#' }];
	let columns = ['id', 'Nama', 'Grade'];
	let items = [];
	let active = false;
	let nama = '';

	onMount(async () => {
		const res = await fetch(`${variables.basePath}/kelas/list`);
		const data = await res.json();
		items = data;
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

<Header items={data} />
<main>
	<div class="m-5 relative">
		<!-- create and filter -->
		<div class="flex flex-cols-2 justify-between items-center pt-5">
			<div>
				<div class="flex flex-cols-2 items-center gap-5">
					<Button
						on:click={() => (isopenFilter = !isopenFilter)}
						class="bg-slate-400 p-5 rounded-md shadow-lg text-white transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300 dark:bg-gray-800"
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
						<button on:click={() => searchSiswa(nama)}>
							<span> Apply </span>
						</button>
					{/if}
					{#if nama}
						<button type="reset">reset</button>
					{/if}
				</div>
			</div>
			<div
				class="flex justify-end transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300"
			>
				<a href="/admin/kelas/create">
					<Button class="bg-teal-500 p-5 rounded-md shadow-lg">
						<div class="normal-case text-sm text-white flex items-center gap-1">
							<span> Create </span>
							<Icon path={mdiPlus} size="20px" />
						</div>
					</Button>
				</a>
			</div>
		</div>
		<div class="py-3 relative">
			{#if isopenFilter}
				<div class="flex items-center justify-center gap-5 md:w-[15%] sm:w-[20%]">
					<TextField dense filled on:change={handleNamaChange}>Nama</TextField>
				</div>
			{/if}
		</div>
		<!-- data table -->
		<div class="absolute w-full overflow-auto">
			<div>
				<DataTable
					class="block bg-white border-2 border-rose-600 dark:bg-gray-800 h-[60vh] overflow-auto rounded-none w-full"
				>
					<DataTableHead
						class="p-2 bg-teal-400 dark:bg-teal-800 text-white sticky top-0 rounded-none"
					>
						<DataTableRow>
							{#each columns as column}
								<DataTableCell>{column}</DataTableCell>
							{/each}
						</DataTableRow>
					</DataTableHead>
					<DataTableBody>
						{#each paginatedItems as items}
							<DataTableRow class="text-gray-500">
								<DataTableCell>{items.id}</DataTableCell>
								<DataTableCell>
									<a href="/admin/kelas/{items.id}/view" class="text-teal-500">
										{items.nama}
									</a>
								</DataTableCell>
								<DataTableCell>{items.grade}</DataTableCell>
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
	</div>
</main>
