<svelte:head>
  <title>Siswa</title>
</svelte:head>

<script lang="ts">
//Module
    import Header from '$lib/components/Admin/Header.svelte'
    import DataTable from "$lib/components/Admin/DataTable.svelte"
    import { Button, Icon, TextField, List, ListGroup, ListItem, Input } from 'svelte-materialify';
    import { createEventDispatcher } from 'svelte';
    import { onMount } from "svelte";
    import { mdiAccountPlus } from '@mdi/js';

//variable
    let Breadcrumbs = [
        { text: 'Siswa', href: '#' },
    ];
    let shown = false;
    let dispatch = createEventDispatcher();
    let columns = ["Nisn", "Nama", "Jurusan", "Kelas", "Alamat", "Jenis Kelamin", "Tempat lahir", "Tanggal Lahir", "Agama", "No tlp", "Email", "Kecamatan", "Kabupaten"]
    let dataList = [];
//Get Data

    onMount(async () => {
        const res = await fetch(`http://localhost:3001/siswa/page`);
        const data = await res.json();
        dataList= data.paginateData;
    });

</script>

<div class="border-b dark:border-teal-900 h-[14vh] relative">
    <div>
        <div class="pb-2">
            <Header items={Breadcrumbs}/>
        </div>
        <div class="flex justify-between items-center px-6">
            <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-200">Siswa</h2>
            <a href="/admin/siswa/create">
                <Button class="text-white bg-purple-500 text-sm rounded-sm active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"><Icon path={mdiAccountPlus}/></Button>
            </a>
        </div>
    </div>
</div>

<main class="h-full overflow-y-auto">
    <section class="p-[20px]">
        <DataTable columns={columns} items={dataList} type={"siswa"}/>
    </section>
</main>

