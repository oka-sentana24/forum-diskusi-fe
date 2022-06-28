<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import '$sass/tailwind.scss';
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
	import { mdiPlus } from '@mdi/js';
	import { paginate, LightPaginationNav } from 'svelte-paginate';

	let currentPage = 1;
	let pageSize = 10;
	$: paginatedItems = paginate({ items, pageSize, currentPage });
	let Breadcrumbs = [{ text: 'Siswa', href: '#' }];
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
	let items = [];

	onMount(async () => {
		// const res = await fetch(`http://localhost:3001/siswa/list`);
		// const data = await res.json();
		// items = data;
		var url = new URL('http://localhost:3001/siswa/list'),
			params = {};
		Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));
		fetch(url).then((response) => response.json());
	});
</script>

<svelte:head>
	<title>Siswa</title>
</svelte:head>

<main class="h-full overflow-y-auto">
	<Header items={Breadcrumbs} />
	<section class="h-full">
		<main class="h-full overflow-y-auto">
			<div class="relative top-[5rem] px-5">
				<div class="overflow-auto">
					<div class="flex  flex-cols-2 justify-between items-center py-[20px]">
						<div>
							<!-- <Button class="text-white bg-gray-500 text-xs rounded-sm">Filter</Button> -->
							<TextField dense filled>Nisn</TextField>
						</div>
						<div>
							<a href="/admin/siswa/create">
								<Button class="text-white bg-purple-700 text-xs rounded-sm">
									Create
									<Icon path={mdiPlus} class="text-xs" />
								</Button>
							</a>
						</div>
					</div>
					<DataTable
						class="block bg-white border-2 border-rose-600 dark:bg-gray-800 h-[60vh] overflow-auto rounded-none w-full"
					>
						<DataTableHead class="p-2 bg-purple-500 text-white sticky top-0 rounded-none">
							<DataTableRow>
								{#each columns as column}
									<DataTableCell>{column}</DataTableCell>
								{/each}
							</DataTableRow>
						</DataTableHead>
						<DataTableBody>
							{#each paginatedItems as items}
								<DataTableRow class="text-gray-500">
									<DataTableCell>{items.username}</DataTableCell>
									<DataTableCell>
										<a href="/admin/siswa/{items.id}/view" class="text-purple-600">
											{items.nama}
										</a>
									</DataTableCell>
									<DataTableCell>{items.jurusan.nama}</DataTableCell>
									<DataTableCell>{items.kelas.grade}</DataTableCell>
									<DataTableCell>{items.alamat}</DataTableCell>
									<DataTableCell>{items.jenis_kelamin}</DataTableCell>
									<DataTableCell>{items.tanggal_lahir}</DataTableCell>
									<DataTableCell>{items.agama}</DataTableCell>
									<DataTableCell>{items.no_tlp}</DataTableCell>
									<DataTableCell>{items.email}</DataTableCell>
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
	</section>
</main>
