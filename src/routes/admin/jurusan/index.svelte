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
	import { mdiChevronUp } from '@mdi/js';

	let isopenFilter = false;
	let currentPage = 1;
	let pageSize = 10;
	$: paginatedItems = paginate({ items, pageSize, currentPage });
	let Breadcrumbs = [{ text: 'Siswa', href: '#' }];
	let columns = ['id', 'Nama', 'Grade'];
	let items = [];
	let active = false;
	let nama = '';

	onMount(async () => {
		const res = await fetch(`https://stark-wildwood-45887.herokuapp.com/jurusan/list`);
		const data = await res.json();
		items = data;
		var url = new URL('https://stark-wildwood-45887.herokuapp.com/jurusan/list?nama'),
			params = {};
		Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));
		fetch(url).then((response) => response.json());
	});

	async function searchSiswa(nama) {
		// bind ke on:submit
		let response = await fetch(
			`https://stark-wildwood-45887.herokuapp.com/jurusan/list?nama=${nama}`
		);
		const data = await response.json();
		items = data;
	}
	function handleNamaChange(e) {
		// bind ke on:change
		nama = e.target.value;
	}
</script>

<svelte:head>
	<title>Siswa</title>
</svelte:head>

<main class="h-full overflow-y-auto">
	<Header items={Breadcrumbs} />
	<section class="h-full">
		<main class="h-full overflow-y-auto">
			<div class="relative top-[5rem] px-5">
				<div class="flex flex-cols-2 justify-between items-center pt-5">
					<div>
						<div class="flex flex-cols-2 items-center gap-5">
							<Button on:click={() => (isopenFilter = !isopenFilter)}
								>filter
								<Icon path={mdiChevronUp} rotate={active ? 0 : 180} />
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
					<div class="flex justify-end">
						<a href="/admin/jurusan/create">
							<Button class="text-white bg-purple-500 hover:bg-purple-900 text-sm rounded-sm"
								><Icon path={mdiPlus} class="text-xs" />Create</Button
							>
						</a>
					</div>
				</div>
				<div class="py-3 relative">
					{#if isopenFilter}
						<div class="flex items-center justify-center gap-5 w-[15%]">
							<TextField dense filled on:change={handleNamaChange}>Nama</TextField>
						</div>
					{/if}
				</div>
				<div class="overflow-auto">
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
											<a href="/admin/jurusan/{items.id}/view" class="text-purple-600">
												{items.nama}
											</a>
										</DataTableCell>
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
	</section>
</main>
