<script lang="ts">
	// @ts-nocheck
	import '../../../style/tailwind.scss';
	import Header from '$components/Header.svelte';
	import { onMount } from 'svelte';
	import {
		DataTable,
		DataTableHead,
		DataTableRow,
		DataTableCell,
		DataTableBody,
		Icon,
		TextField
	} from 'svelte-materialify';
	import Button from '$components/Button.svelte';
	import { paginate, LightPaginationNav } from 'svelte-paginate';
	import { mdiChevronUp, mdiSearchWeb, mdiChevronDown } from '@mdi/js';
	import { variables } from '$lib/variables';

	let isopenFilter = false;
	let currentPage = 1;
	let pageSize = 10;
	$: paginatedItems = paginate({ items, pageSize, currentPage });
	let data = [{ text: 'Siswa', href: '#' }];
	let columns = [
		'Nisn',
		'Nama',
		'Alamat',
		'Jenis Kelamin',
		'Tempat lahir',
		'Tanggal Lahir',
		'Agama',
		'No Telp',
		'E-mail',
		'Kewarganegaraan',
		'Kecamatan'
	];
	let items = [];
	let nama = '';

	onMount(async () => {
		/* Get Siswa */
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
		<div class="flex col-span-2 items-center justify-between gap-5">
			<Button filter click={() => (isopenFilter = !isopenFilter)}>
				<div class="normal-case text-sm gap-2 flex items-center ">
					<span> Filter </span>
					{#if isopenFilter}
						<Icon path={mdiChevronUp} size="20px" />
					{:else}
						<Icon path={mdiChevronDown} size="20px" />
					{/if}
				</div>
			</Button>
			<a href="/admin/siswa/create">
				<Button create>New Siswa +</Button>
			</a>
		</div>
		<div class="flex col-span-2 items-center justify-start gap-5 py-3">
			{#if isopenFilter}
				<div class="filter-input">
					<TextField filled on:change={handleNamaChange}>Nama</TextField>
				</div>
			{/if}
			{#if isopenFilter}
				<Button icon click={() => searchSiswa(nama)}
					><Icon path={mdiSearchWeb} size="25px" /></Button
				>
			{/if}
		</div>
		<!-- data table -->
		<div class="absolute w-full overflow-auto">
			<div>
				<DataTable>
					<DataTableHead>
						<DataTableRow>
							{#each columns as column}
								<DataTableCell>{column}</DataTableCell>
							{/each}
						</DataTableRow>
					</DataTableHead>
					<DataTableBody>
						{#each paginatedItems as items}
							<DataTableRow class="text-color-light-body">
								<DataTableCell>
									{items.nis}
								</DataTableCell>
								<DataTableCell>
									<a
										href="/admin/siswa/{items.id}/view"
										class=" text-link-light-purple dark:text-link-dark-blue"
									>
										{items.nama}
									</a>
								</DataTableCell>
								<DataTableCell>{items.alamat}</DataTableCell>
								<DataTableCell>{items.jenis_kelamin}</DataTableCell>
								<DataTableCell>{items.tempat_lahir}</DataTableCell>
								<DataTableCell>{items.tanggal_lahir}</DataTableCell>
								<DataTableCell>{items.agama}</DataTableCell>
								<DataTableCell>{items.no_tlp}</DataTableCell>
								<DataTableCell>{items.email}</DataTableCell>
								<DataTableCell>{items.kewarganegaraan}</DataTableCell>
								<DataTableCell>{items.kecamatan}</DataTableCell>
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
