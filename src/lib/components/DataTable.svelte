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
  <DataTable class="block bg-white shadow-2xl dark:bg-blue-800 h-[74vh] overflow-auto rounded-none">
    <DataTableHead class="p-2 bg-purple-600 dark:bg-blue-700 text-white  sticky top-0 rounded-none">
      <DataTableRow>
        <!-- <DataTableCell> -->
          {#each columns as column}
          <DataTableCell class='text-sm'>{column}</DataTableCell>
          {/each}
        <!-- </DataTableCell> -->
      </DataTableRow>
    </DataTableHead>
    <DataTableBody>
      {#each paginatedItems as row}
        <DataTableRow>
          <DataTableCell class="text-sm">
            {row.username}
          </DataTableCell>
            <DataTableCell class="text-sm">
              {#if type === "siswa"}
              <a href="/admin/siswa/{row.id}/view" class=" dark:text-blue-400">
                {row.nama}  
              </a>
              {/if}
              {#if type === "guru"}
              <a href="/admin/guru/{row.id}/view" class=" dark:text-blue-400">
                {row.nama}  
              </a>
              {/if}
            </DataTableCell>
          <DataTableCell class="text-sm">
              {row.jurusan}  
          </DataTableCell>
          <DataTableCell class="text-sm">
              {row.id_kelas}  
          </DataTableCell>
          <DataTableCell class="text-sm">
            {row.alamat}
          </DataTableCell>
          <DataTableCell class="text-sm">
            {row.jenis_kelamin}
          </DataTableCell>
          <DataTableCell class="text-sm">
            {row.tempat_lahir}
          </DataTableCell>
          <DataTableCell class="text-sm">
            {row.tanggal_lahir}
          </DataTableCell>
          <DataTableCell class="text-sm">
            {row.agama}
          </DataTableCell>
          <DataTableCell class="text-sm">
            {row.no_tlp}
          </DataTableCell>
          <DataTableCell class="text-sm">
            {row.email}
          </DataTableCell>
          <DataTableCell class="text-sm">
            {row.kewarganegaraan}
          </DataTableCell>
          <DataTableCell class="text-sm">
            {row.kecamatan}
          </DataTableCell>
          <DataTableCell class="text-sm">
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

  
  