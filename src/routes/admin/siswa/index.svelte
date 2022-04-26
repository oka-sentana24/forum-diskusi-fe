<script>
    import DataTable from "$lib/components/DataTable.svelte"
    import { Button, Icon, TextField, List, ListGroup, ListItem, Input } from 'svelte-materialify';
    import { mdiChevronUp, mdiChevronDown } from '@mdi/js';
    import { createEventDispatcher } from 'svelte';
    import { onMount } from "svelte";

    // create variable
    let shown = false;
    let dispatch = createEventDispatcher();
    let columns = ["Nisn", "Nama", "Jurusan", "Kelas", "Alamat", "Jenis Kelamin", "Tempat lahir", "Tanggal Lahir", "Agama", "No tlp", "Email","Kewarganegaraan", "Kecamatan", "Kabupaten"]
    let dataList = [];

    const titleRules = [(v) => !!v || 'Required'];
    
    //logic
    function show() {
        shown = !shown;
				dispatch('show', shown);
	}
    onMount(async () => {
        const res = await fetch(`http://localhost:3001/siswa/page`);
        const data = await res.json();
        dataList= data.paginateData;
    });
</script>

<main>
    <section class="px-[20px]">
        <div class=" flex flex-cols-2 justify-between py-5">
            <div class="py-2">
                <Button class="dark:bg-gray-800 rounded-sm text-xs gap-3" on:click={show}>
                    <span class="gap-3 text-xs">filter</span>
                    <span>
                        <Icon path={shown ? mdiChevronUp : mdiChevronDown} />
                    </span>
                </Button>
                {#if shown}
                    <span class="text-xs px-5 text-blue-500">
                        apply
                    </span>
                    <div class="py-3 flex gap-3"> 
                        <TextField filled class="main-input" {titleRules}>Name</TextField>
                        <TextField filled class="main-input" {titleRules}>Name</TextField>
                        <TextField filled class="main-input" {titleRules}>Name</TextField>
                    </div>
                {/if}
            </div>
            <div class="py-2">
                <a href="/admin/siswa/create">
                    <Button class="text-white bg-purple-500 text-xs rounded-sm active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">Create</Button>
                </a>
            </div>
        </div>
        <DataTable columns={columns} items={dataList} type={"siswa"}/>
    </section>
</main>
