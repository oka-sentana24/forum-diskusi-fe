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
	import { mdiChevronUp, mdiSearchWeb, mdiChevronDown, mdiFolderOutline } from '@mdi/js';
	import { variables } from '$lib/variables';

	let isopenFilter = false;
	let isloading = false;
	let currentPage = 1;
	let pageSize = 10;
	$: paginatedItems = paginate({ items, pageSize, currentPage });
	let data = [{ text: 'Siswa', href: '#' }];
	let columns = [
		'Nisn',
		'Nama',
		'Alamat',
		'Kelas',
		'Jenis Kelamin',
		'Tanggal Lahir',
		'Agama',
		'No Telp',
		'E-mail'
	];
	let items = [];
	let getKelas = [];
	let nama = '';

	onMount(async () => {
		/* Get Siswa */
		try {
			setTimeout(() => {
				isloading = true;
			}, 3000);

			/* get Siswa */
			const res = await fetch(`${variables.basePath}/siswa/list`);
			const data = await res.json();
			items = data;

			const response = await fetch(`${variables.basePath}/kelas/list`);
			const dataKelas = await response.json();
			getKelas = dataKelas;
			isloading = false;
		} catch (e) {
			isloading = false;
			// correctly (?) nothing can be caught here...
			console.log('no data');
		}
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
		<div class="absolute w-full overflow-auto h-[37rem] bg-base-white">
			<DataTable>
				<DataTableHead>
					<DataTableRow>
						{#each columns as column}
							<DataTableCell>{column}</DataTableCell>
						{/each}
					</DataTableRow>
				</DataTableHead>
				<DataTableBody>
					{#if isloading === items < 0}
						<div class="absolute h-[30rem] flex items-center justify-center w-full">
							<span class="grid items-center text-base">
								<div class="lds-facebook">
									<div />
									<div />
									<div />
								</div>
							</span>
						</div>
					{:else if !isloading === items.length <= 0}
						{#each paginatedItems as items}
							<DataTableRow class="text-color-light-body">
								<DataTableCell>
									{items.nisn}
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
								<DataTableCell>
									<a
										href="/admin/kelas/{items.id}/view"
										class=" text-link-light-purple dark:text-link-dark-blue"
									>
										{#each getKelas as kelas}
											{kelas.grade} ({kelas.nama})
										{/each}
									</a>
								</DataTableCell>
								<DataTableCell>{items.jenis_kelamin}</DataTableCell>
								<DataTableCell>{items.tanggal_lahir}</DataTableCell>
								<DataTableCell>{items.agama}</DataTableCell>
								<DataTableCell>{items.no_tlp}</DataTableCell>
								<DataTableCell>{items.email}</DataTableCell>
							</DataTableRow>
						{/each}
					{:else}
						<div class="absolute h-[30rem] w-full flex items-center justify-center">
							<DataTableRow>
								<div class="grid gap-5 text-color-dark-body">
									<Icon path={mdiFolderOutline} size="25px" />
									<span>Tidak ada siswa yang ditemukan</span>
								</div>
							</DataTableRow>
						</div>
					{/if}
				</DataTableBody>
			</DataTable>
		</div>
		<LightPaginationNav
			totalItems={items.length}
			{pageSize}
			{currentPage}
			limit={1}
			showStepOptions={true}
			on:setPage={(e) => (currentPage = e.detail.page)}
		/>
	</div>
</main>
