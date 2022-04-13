<script>
// @ts-nocheck
    import {
      DataTable,
      DataTableHead,
      DataTableRow,
      DataTableCell,
      DataTableBody,} from 'svelte-materialify';
      import '$sass/tailwind.scss';
      export let columns;
      export let datas;
  </script>
  
  <!-- <main class="block dark: bg-red-900 rounded-none h-[70vh] overflow-auto"> -->
    <DataTable class=" block dark:bg-gray-800 h-[65vh] overflow-auto rounded-none">
      <DataTableHead class="p-2 dark: bg-gray-600 text-white sticky top-0 rounded-none">
        <DataTableRow>
          <!-- <DataTableCell> -->
            {#each columns as column}
            <DataTableCell class='text-xs'>{column}</DataTableCell>
            {/each}
          <!-- </DataTableCell> -->
        </DataTableRow>
      </DataTableHead>
      <DataTableBody>
        {#each datas as row}
          <DataTableRow>
            <DataTableCell class="text-xs">
              {row.id}
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
  <!-- </main> -->
  