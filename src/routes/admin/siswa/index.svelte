<script>
    import DataTable from "$lib/components/DataTable.svelte"
    import { Button, Icon, TextField, List, ListGroup, ListItem } from 'svelte-materialify';
    import { mdiChevronUp, mdiChevronDown } from '@mdi/js';
    import { createEventDispatcher } from 'svelte';
    import { onMount } from "svelte";

    let shown = false;
    let dispatch = createEventDispatcher();
    let columns = ["Nisn", "Nama", "Jurusan", "Kelas", "Alamat", "Jenis Kelamin", "Tempat lahir", "Tanggal Lahir", "Agama", "No tlp", "Email","Kewarganegaraan", "Kecamatan", "Kabupaten"]
    let datas = [];
    const titleRules = [(v) => !!v || 'Required'];
    function show() {
        shown = !shown;
				dispatch('show', shown);
	}
    onMount(async () => {
    const res = await fetch(`http://localhost:3001/siswa/page`);
    const data = await res.json();
    datas = data.paginateData;
    });
</script>

<main class="px-[20px]">
    <div class=" flex flex-cols-2 justify-between">
        <div class="py-2">
            <Button class=" bg-gray-500 rounded-sm text-xs gap-3" on:click={show}>
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
            <Button class="bg-white text-xs text-gray-900 rounded-sm">Create</Button>
        </div>
    </div>
        <DataTable columns={columns} datas={datas}/>

        <button>

        </button>
</main>