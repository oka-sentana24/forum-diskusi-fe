<script lang=ts>
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
    export let type: "guru"|"siswa";
    let currentPage = 1;
    let pageSize = 10;

  //Pagination
    $: paginatedItems = paginate({ items, pageSize, currentPage })

</script>
<main class="w-full">
  <DataTable class="block bg-white shadow-2xl dark:bg-gray-800 max-h-[74vh] overflow-auto rounded-none">
    <DataTableHead class="p-2 bg-purple-600 dark:bg-gray-700 text-white  sticky top-0 rounded-none">
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
              {#if type === "siswa"}
              <a href="/admin/siswa/{row.id}/view" class=" dark:text-purple-600">
                {row.nama}  
              </a>
              {/if}
              {#if type === "guru"}
              <a href="/admin/guru/{row.id}/view" class=" dark:text-purple-600">
                {row.nama}  
              </a>
              {/if}
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

  
  