<!-- <script>
    import DataTable from "$lib/components/DataTable.svelte"
    import { Button, Icon, TextField, List, ListGroup, ListItem, Input } from 'svelte-materialify';
    import { mdiChevronUp, mdiChevronDown } from '@mdi/js';
    import { createEventDispatcher } from 'svelte';
    import { onMount } from "svelte";
    import { Breadcrumbs } from 'svelte-materialify';
    import Header from '$lib/components/Header.svelte'

    let shown = false;
    let dispatch = createEventDispatcher();
    let columns = ["Nisn", "Nama", "Jurusan", "Kelas", "Alamat", "Jenis Kelamin", "Tempat lahir", "Tanggal Lahir", "Agama", "No tlp", "Email","Kewarganegaraan", "Kecamatan", "Kabupaten"]
    let dataList = [];

    const titleRules = [(v) => !!v || 'Required'];
    const items = [
    { text: 'Home', href: '/components/breadcrumbs/' },
    { text: 'Siswa', href: '/components/breadcrumbs/' },
    ];
    function show() {
        shown = !shown;
				dispatch('show', shown);
	}
    onMount(async () => {
    const res = await fetch(`http://localhost:3001/siswa/page`);
    const data = await res.json();
    dataList = data.paginateData;
    });
</script>

<main>
    <div class="border-b dark:border-gray-600">
        <div class="px-[20px]">
            <div class="flex flex-cols-2 justify-between items-center w-fullrelative z-20 py-2">
                <span class="p-0">
                    <Breadcrumbs {items} class="p-0"/>
                </span>
                <span class="p-0">
                    <Header/>
                </span>
            </div>
            <div class=" py-3">
                <span class="text-3xl">Siswa</span>
            </div>
        </div>
    </div>
    
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
</main> -->



<script>
	import { onMount } from 'svelte';
	
	let search = undefined;
	let users = [];
	$: visibleUsers = search ?
		users.filter(user => {
			return user.name.first.match(`${search}.*`) || user.name.last.match(`${search}.*`)
		}) : users;

	onMount(async () => {
		const resp = await fetch('https://randomuser.me/api?results=25')
		const data = await resp.json();
		users = data.results;
	});
</script>

<style>
  @import url('https://gthomas-appfolio.github.io/bootstrap-coastline/bootstrap-coastline.css');
</style>

<Card>
	<CardHeader>
		<Input type="search" bind:value={search} class="ms-auto w-auto" placeholder="Search" />
	</CardHeader>
	<CardBody>
		<Table striped rows={visibleUsers} let:row={user}>
			<Column header="First">
				{user.name.first}
			</Column>
			<Column header="Last">
				{user.name.last}
			</Column>
			<Column header="Email">
				{user.email}
			</Column>
		</Table>
	</CardBody>
</Card>
