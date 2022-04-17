<script>
  // @ts-nocheck
    import '$sass/tailwind.scss';
    import {
    DataTable,
    DataTableHead,
    DataTableRow,
    DataTableCell,
    DataTableBody,} from 'svelte-materialify';
    import { paginate, PaginationNav } from 'svelte-paginate'

  //Deklarasi variable
    export let columns;
    export let items;

  //Pagination
    let currentPage = 1;
    let pageSize = 10;
    $: paginatedItems = paginate({ items, pageSize, currentPage })

</script>
<main>
  <DataTable class="block bg-blue-50 dark:bg-gray-800 h-[65vh] overflow-auto rounded-none">
    <DataTableHead class="p-2 bg-blue-500 dark:bg-gray-700 text-white  sticky top-0 rounded-none">
      <DataTableRow>
        <!-- <DataTableCell> -->
          {#each columns as column}
          <DataTableCell class='text-xs'>{column}</DataTableCell>
          {/each}
        <!-- </DataTableCell> -->
      </DataTableRow>
    </DataTableHead>
    <DataTableBody>
      {#each paginatedItems as row}
        <DataTableRow>
          <DataTableCell class="text-xs">
            {row.username}
          </DataTableCell>
            <DataTableCell class="text-xs">
              {row.nama}  
            </DataTableCell>
          <DataTableCell class="text-xs">
            {row.jurusan}
          </DataTableCell>
          <DataTableCell class="text-xs">
            {row.id_kelas}
          </DataTableCell>
          <DataTableCell class="text-xs">
            {row.alamat}
          </DataTableCell>
          <DataTableCell class="text-xs">
            {row.jenis_kelamin}
          </DataTableCell>
          <DataTableCell class="text-xs">
            {row.tempat_lahir}
          </DataTableCell>
          <DataTableCell class="text-xs">
            {row.tanggal_lahir}
          </DataTableCell>
          <DataTableCell class="text-xs">
            {row.agama}
          </DataTableCell>
          <DataTableCell class="text-xs">
            {row.no_tlp}
          </DataTableCell>
          <DataTableCell class="text-xs">
            {row.email}
          </DataTableCell>
          <DataTableCell class="text-xs">
            {row.kewarganegaraan}
          </DataTableCell>
          <DataTableCell class="text-xs">
            {row.kecamatan}
          </DataTableCell>
          <DataTableCell class="text-xs">
            {row.kabupaten}
          </DataTableCell>
        </DataTableRow>
      {/each}
    </DataTableBody>
  </DataTable>
  <PaginationNav
    totalItems="{items.length}"
    pageSize="{pageSize}"
    currentPage="{currentPage}"
    limit="{1}"
    showStepOptions="{true}"
    on:setPage="{(e) => currentPage = e.detail.page}"
  />
</main>

  
  