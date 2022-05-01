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
    <DataTableHead class="p-2 bg-blue-700 text-white  sticky top-0 rounded-none">
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
        <DataTableRow class=" font-light">
          <DataTableCell>
            {row.username}
          </DataTableCell>
            <DataTableCell>
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
            <DataTableCell>
              {row.jurusan}  
            </DataTableCell>
            <DataTableCell>
              {row.id_kelas}  
            </DataTableCell>
            <DataTableCell>
              {row.alamat}
            </DataTableCell>
            <DataTableCell>
              {row.jenis_kelamin}
            </DataTableCell>
            <DataTableCell>
              {row.tempat_lahir}
            </DataTableCell>
            <DataTableCell>
              {row.tanggal_lahir}
            </DataTableCell>
            <DataTableCell>
              {row.agama}
            </DataTableCell>
            <DataTableCell>
              {row.no_tlp}
            </DataTableCell>
            <DataTableCell>
              {row.email}
            </DataTableCell>
            <DataTableCell>
              {row.kecamatan}
            </DataTableCell>
            <DataTableCell>
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

  
  