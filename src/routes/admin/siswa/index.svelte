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

	let columns = [
		'Nisn',
		'Nama',
		'Jurusan',
		'Kelas',
		'Alamat',
		'Jenis Kelamin',
		'Tanggal Lahir',
		'Agama',
		'No tlp',
		'Email'
	];
	export let data = [{ text: 'Siswa', href: '#' }];

	let isopenFilter = false;
	let currentPage = 1;
	let pageSize = 10;
	$: paginatedItems = paginate({ items, pageSize, currentPage });
	let active = false;
	let nama = '';
	let items = [];

	onMount(async () => {
		const res = await fetch(`${variables.basePath}/siswa/list`);
		const data = await res.json();
		items = data;
		var url = new URL(`${variables.basePath}/siswa/list?nama`),
			params = {};
		Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));
		fetch(url).then((response) => response.json());
	});

	async function searchSiswa(nama) {
		// bind ke on:submit
		let response = await fetch(`${variables.basePath}/siswa/list?nama=${nama}`);
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
						class="bg-slate-400 p-5 rounded-md shadow-lg text-white transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300"
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
				<a href="/admin/siswa/create">
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
			<DataTable
				class="block bg-white overflow-auto rounded-none w-full h-[60vh]  scrollbar-thumb-teal-900 scrollbar-track-gray-100 scrollbar-thin"
			>
				<DataTableHead class="p-2 bg-teal-500 text-white sticky top-0 rounded-none w-full">
					<DataTableRow>
						{#each columns as column}
							<DataTableCell>{column}</DataTableCell>
						{/each}
					</DataTableRow>
				</DataTableHead>
				<DataTableBody>
					{#each paginatedItems as item}
						<DataTableRow class="text-gray-500">
							<DataTableCell>{item.username}</DataTableCell>
							<DataTableCell>
								<a href="/admin/siswa/{item.id}/view" class="text-teal-500">
									{item.nama}
								</a>
							</DataTableCell>
							<DataTableCell>{item.jurusan.kelas_jurusan}</DataTableCell>
							<DataTableCell>{item.kelas.grade}</DataTableCell>
							<DataTableCell>{item.alamat}</DataTableCell>
							<DataTableCell>{item.jenis_kelamin}</DataTableCell>
							<DataTableCell>{item.tanggal_lahir}</DataTableCell>
							<DataTableCell>{item.agama}</DataTableCell>
							<DataTableCell>{item.no_tlp}</DataTableCell>
							<DataTableCell>{item.email}</DataTableCell>
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
