<script>
    import DataTable from "$lib/components/DataTable.svelte"
    import { Button, Icon, TextField, List, ListGroup, ListItem, Input } from 'svelte-materialify';
    import { mdiChevronUp, mdiChevronDown } from '@mdi/js';
    import { createEventDispatcher } from 'svelte';
    import { onMount } from "svelte";

    let shown = false;
    let dispatch = createEventDispatcher();
    let columns = ["Nisn", "Nama", "Jurusan", "Kelas", "Alamat", "Jenis Kelamin", "Tempat lahir", "Tanggal Lahir", "Agama", "No tlp", "Email","Kewarganegaraan", "Kecamatan", "Kabupaten"]
    let dataList = [];

    const titleRules = [(v) => !!v || 'Required'];
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
                <Button class="dark: bg-gray-800 rounded-sm text-xs gap-3" on:click={show}>
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
                    <Button class="bg-white text-xs text-gray-900 rounded-sm">Create</Button>
                </a>
            </div>
        </div>
        <DataTable columns={columns} items={dataList}/>		
    </section>
</main>

<!-- <script>
    import { paginate, LightPaginationNav } from 'svelte-paginate'
   
    let items = [1,2,3,4,5,6,7,8,9,0,0,0,]
    let currentPage = 1
    let pageSize = 4
    $: paginatedItems = paginate({ items, pageSize, currentPage })
  </script> 
   
  <ul class="items">
    {#each paginatedItems as item}
      <li class="item">
        {item}
      </li>
    {/each}
  </ul>
   
  <LightPaginationNav
    totalItems="{items.length}"
    pageSize="{pageSize}"
    currentPage="{currentPage}"
    limit="{1}"
    showStepOptions="{true}"
    on:setPage="{(e) => currentPage = e.detail.page}"
  /> -->