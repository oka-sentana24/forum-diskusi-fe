<script lang="ts">
	import Header from '$lib/components/Admin/Header.svelte';
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
	let dataSource = [];

	onMount(async () => {
		const res = await fetch(`http://localhost:3001/siswa/list`);
		const data = await res.json();
		dataSource = data;
	});
</script>

<svelte:head>
	<title>Siswa</title>
</svelte:head>

<main>
	<Header items={Breadcrumbs} />

	<section class="h-full overflow-y-auto">
		<div class="px-[20px] overflow-auto">
			<div class="flex justify-end py-[20px]">
				<a href="/admin/siswa/create">
					<Button class="text-blue-800 bg-white text-xs rounded-sm">
						Create
						<Icon path={mdiPlus} class="text-xs" />
					</Button>
				</a>
			</div>
			<DataTable
				class="block bg-white shadow-2xl dark:bg-blue-800 h-[74vh] overflow-auto rounded-none"
			>
				<DataTableHead class="p-2 bg-blue-700 text-white  sticky top-0 rounded-none">
					<DataTableRow>
						{#each columns as column}
							<DataTableCell>{column}</DataTableCell>
						{/each}
					</DataTableRow>
				</DataTableHead>
				<DataTableBody>
					{#each dataSource as datas}
						<DataTableRow>
							<DataTableCell>{datas.username}</DataTableCell>
							<DataTableCell>
								<a href="/admin/siswa/{datas.id}/view" class="dark:text-blue-400">
									{datas.nama}
								</a>
							</DataTableCell>
							<DataTableCell>{datas.jurusanId}</DataTableCell>
							<DataTableCell>{datas.kelasId}</DataTableCell>
							<DataTableCell>{datas.alamat}</DataTableCell>
							<DataTableCell>{datas.jenis_kelamin}</DataTableCell>
							<DataTableCell>{datas.tanggal_lahir}</DataTableCell>
							<DataTableCell>{datas.agama}</DataTableCell>
							<DataTableCell>{datas.no_tlp}</DataTableCell>
							<DataTableCell>{datas.email}</DataTableCell>
						</DataTableRow>
					{/each}
				</DataTableBody>
			</DataTable>
		</div>
	</section>
</main>
