<script>
import { Card, Button, Icon, Dialog, Snackbar } from "svelte-materialify";
import { page } from '$app/stores';
import { mdiAccountEdit, mdiDelete, mdiAlert, mdiCheckCircle } from '@mdi/js';
import Header from '$lib/components/Admin/Header.svelte'
    let snackbar = false;
    let active;
    let id, username, nama, alamat, jenis_kelamin, tempat_lahir, tanggal_lahir, agama, no_tlp, email, kewarganegaraan, kecamatan, kabupaten, nama_ayah, pekerjaan_ayah, nama_ibu, pekerjaan_ibu;
    export let Breadcrumbs = [
        { text: 'Siswa', href: '/admin/siswa' },
        { text: 'View', href: '#' },
    ];
    // @ts-ignore
	fetch(`http://localhost:3001/siswa/${$page.params.id}`)
		.then((resp) => resp.json())
		.then((res) => {
            id = res.id;
			username = res.username;
            nama    = res.nama;
            alamat = res.alamat;
            jenis_kelamin = res.jenis_kelamin;
            jenis_kelamin = res.jenis_kelamin;
            tempat_lahir = res.tempat_lahir;
            tanggal_lahir = res.tanggal_lahir
            agama = res.agama;
            no_tlp = res.no_tlp;
            email = res.email;
            kewarganegaraan = res. kewarganegaraan;
            kecamatan = res.kecamatan;
            kabupaten = res. kabupaten;
            nama_ayah = res.nama_ayah;
            pekerjaan_ayah = res.pekerjaan_ayah;
            nama_ibu = res.nama_ibu;
            pekerjaan_ibu = res.pekerjaan_ibu;

	})
    async function handleSubmit() {
        const response = await fetch(`http://localhost:3001/siswa/${$page.params.id}`,{
            method: 'DELETE',
            credentials: 'same-origin',
            headers: {
            'Content-Type': 'application/json'
        }
    });

    if ( response.status === 200) {
        snackbar = true;
        window.location.href="/admin/siswa";
    }
}
    
</script>

<div class="border-b dark:border-teal-900 h-[12vh] relative">
    <div>
        <div class="pb-2">
            <Header items={Breadcrumbs}/>
        </div>
        <div class="flex justify-between items-center px-6">
            <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-200">Update Siswa</h2>
            <div class="flex gap-5">
                <a href="/admin/siswa/{id}/update">
                    <Button class="bg-white text-xs text-white rounded-sm">
                        <Icon path={mdiAccountEdit} class="text-teal-900"/>
                    </Button>
                </a>
                <Button class="bg-red-500 text-xs text-white rounded-sm"on:click={() => {
                   (active = true)
                  }}>
                    <Icon path={mdiDelete} class="text-white"/>
                </Button>
                <Dialog class="pa-4 text-center bg-white" bind:active={active}>
                    <Icon path={mdiAlert} class= "text-red-500"/>
                    <p class="text-blue-900">Are you sure you want to delete data?</p>
                    <div class="mt-1 ">
                        <Button text class="red-text" on:click={()=>handleSubmit()} >Accept</Button>
                        <Snackbar class="flex-column bg-white text-teal-900" bind:active={snackbar} center text timeout={3000}>
                            <Icon path={mdiCheckCircle} class="success-text"/>
                            <div class="mt-1 font-semibold">
                               <span>Success Update</span>
                            </div>
                        </Snackbar>
                        <Button
                        class="text-blue-900"
                        text
                        on:click={() => {
                            active = false;
                        }}>
                        Dismiss
                        </Button>
                    </div>  
                </Dialog>
            </div>
        </div>
    </div>
</div>
<main class="p-[20px]">
    <Card class="dark:bg-blue-800 h-[63vh] rounded-sm">
        <div class="p-5 flex flex-cols-2 gap-20">
            <div>
                <label for="" class="text-xs text-gray-400">id</label>
                <div class="pb-2">
                    {id}
                </div>
                <label for="" class="text-xs text-gray-400">Nisn</label>
                <div class="pb-2">
                    {username}
                </div>
                <label for="" class="text-xs text-gray-400">Nama</label>
                <div class="pb-2">
                    {nama}
                </div>
                <label for="" class="text-xs text-gray-400">Alamat</label>
                <div class="pb-2">
                    {alamat}
                </div>
                <label for="" class="text-xs text-gray-400">Jenis Kelamin</label>
                <div class="pb-2">
                    {jenis_kelamin}
                </div>
                <label for="" class="text-xs text-gray-400">Tempat lahir</label>
                <div class="pb-2">
                    {tempat_lahir}
                </div>
                <label for="" class="text-xs text-gray-400">Tanggal Lahir</label>
                <div class="pb-2">
                    {tanggal_lahir}
                </div>
                <label for="" class="text-xs text-gray-400">Agama</label>
                <div class="pb-2">
                    {agama}
                </div>
                <label for="" class="text-xs text-gray-400">No Tlp</label>
                <div class="pb-2">
                    {no_tlp}
                </div>
                <label for="" class="text-xs text-gray-400">Email</label>
                <div class="pb-2">
                    {email}
                </div>
    
            </div>
            <div>
                <label for="" class="text-xs text-gray-400">Kewarganegaraan</label>
                <div class="pb-2">
                    {kewarganegaraan}
                </div>
                <label for="" class="text-xs text-gray-400">Kecamatan</label>
                <div class="pb-2">
                    {kecamatan}
                </div>
                <label for="" class="text-xs text-gray-400">Kabupaten</label>
                <div class="pb-2">
                    {kabupaten}
                </div>
                <label for="" class="text-xs text-gray-400">Nama Ayah</label>
                <div class="pb-2">
                    {nama_ayah}
                </div>
                <label for="" class="text-xs text-gray-400">Pekerjaan Ayah</label>
                <div class="pb-2">
                    {pekerjaan_ayah}
                </div>
                <label for="" class="text-xs text-gray-400">Nama Ibu</label>
                <div class="pb-2">
                    {nama_ibu}
                </div>
                <label for="" class="text-xs text-gray-400">Nama Ibu</label>
                <div class="pb-2">
                    {pekerjaan_ibu}
                </div>
            </div>
        </div>
    </Card>
</main>