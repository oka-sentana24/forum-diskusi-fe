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
	import { paginate, PaginationNav } from 'svelte-paginate';
	import { mdiChevronUp, mdiSearchWeb, mdiChevronDown, mdiFolderOutline } from '@mdi/js';
	import { variables } from '$lib/variables';
	import Link from '$src/components/Link.svelte';

	let isopenFilter = false;
	let isloading = false;
	let currentPage = 1;
	let pageSize = 10;
	$: paginatedItems = paginate({ items, pageSize, currentPage });
	let data = [{ text: 'Kelas', href: '#' }];
	let columns = ['No', 'Nama', 'grade', 'Jurusan'];
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
			const res = await fetch(`${variables.basePath}/kelas/list`);
			const data = await res.json();
			items = data;

			items.forEach(async (e) => {
				const jurusan = await (
					await fetch(`${variables.basePath}/jurusan/list/${e.jurusanId}`)
				).json();
				e.jurusan = jurusan.nama;
			});
			isloading = false;
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
			<a href="/admin/kelas/create">
				<Button create>New Kelas +</Button>
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
		<div class="main-tabel">
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
						<div class="absolute w-full flex items-center justify-center h-[30rem]">
							<DataTableRow>
								<div class="lds-ellipsis">
									<div />
									<div />
									<div />
									<div />
								</div>
							</DataTableRow>
						</div>
						<!-- </div> -->
					{:else if !isloading === items.length <= 0}
						{#each paginatedItems as items, index}
							<DataTableRow>
								<DataTableCell>
									{index + 1}
								</DataTableCell>
								<DataTableCell>
									<Link href="/admin/kelas/{items.id}/view" class="text-link">
										{items.nama}
									</Link>
								</DataTableCell>
								<DataTableCell>
									{items.grade}
								</DataTableCell>
								<DataTableCell>
									<Link href="/admin/jurusan/{items.jurusanId}/view">
										{items.jurusan}
									</Link>
								</DataTableCell>
							</DataTableRow>
						{/each}
					{:else}
						<div class="absolute w-full flex items-center justify-center h-[30rem]">
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
		<PaginationNav
			totalItems={items.length}
			{pageSize}
			{currentPage}
			limit={1}
			showStepOptions={true}
			on:setPage={(e) => (currentPage = e.detail.page)}
		/>
	</div>
</main>
