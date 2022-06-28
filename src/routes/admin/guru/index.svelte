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
		DataTableBody
	} from 'svelte-materialify';
	import { mdiPlus } from '@mdi/js';
	import { paginate, LightPaginationNav } from 'svelte-paginate';

	let currentPage = 1;
	let pageSize = 10;
	$: paginatedItems = paginate({ items, pageSize, currentPage });
	let Breadcrumbs = [{ text: 'guru', href: '#' }];
	let columns = [
		'Nip',
		'Nama',
		'Jurusan',
		'Kelas',
		'Alamat',
		'Jenis Kelamin',
		'Tanggal Lahir',
		'Agama',
		'No tlp',
		'Email',
		'Jabatan',
		'Ktp'
	];
	let items = [];

	onMount(async () => {
		const res = await fetch(`http://localhost:3001/guru/list`);
		const data = await res.json();
		items = data;
	});
</script>

<svelte:head>
	<title>guru</title>
</svelte:head>

<main class="h-full overflow-y-auto">
	<Header items={Breadcrumbs} />
	<section class="h-full">
		<main class="h-full overflow-y-auto">
			<div class="relative top-[5rem] px-5">
				<div class="overflow-auto">
					<div class="flex justify-end py-[20px]">
						<a href="/admin/guru/create">
							<Button class="text-white bg-purple-700 text-xs rounded-sm">
								Create
								<Icon path={mdiPlus} class="text-xs" />
							</Button>
						</a>
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
									<DataTableCell>{items.jabatan}</DataTableCell>
									<DataTableCell>{items.ktp}</DataTableCell>
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
