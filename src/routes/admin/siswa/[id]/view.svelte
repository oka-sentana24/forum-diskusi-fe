<script>
import { Card, Button, Icon } from "svelte-materialify";
import { page } from '$app/stores';
import { Breadcrumbs} from 'svelte-materialify';
import { mdiContentSave, mdiDelete } from '@mdi/js';
    
    let id, username, nama, alamat, jenis_kelamin, tempat_lahir, tanggal_lahir, agama, no_tlp, email, kewarganegaraan, kecamatan, kabupaten, nama_ayah, pekerjaan_ayah, nama_ibu, pekerjaan_ibu;
    const items = [
        { text: 'Siswa', href: '/admin/siswa' },
        { text: 'Show', href: '#' },
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
    // async function handleDELETE() {
    //     console.log("handleDELETE")
    //       const response = await fetch(`http://localhost:3001/siswa/${$page.params.id}`,{
    //           method: 'DELETE',
    //           credentials: 'same-origin',
    //           headers: {
    //               'Content-Type': 'application/json'
    //           }
    //       });
    
    //       if ( response.status === 200) {
    //          window.location.href="/admin/siswa";
    //       }
    //       // what do you do with a non-redirect?
          
    // }
    async function handleSubmit() {
          const response = await fetch(`http://localhost:3001/siswa/${$page.params.id}`,{
              method: 'DELETE',
              credentials: 'same-origin',
              headers: {
                  'Content-Type': 'application/json'
              }
          });
    
          if ( response.status === 200) {
             window.location.href="/admin/siswa";
          }
          // what do you do with a non-redirect?
    
        }
    
</script>

<!-- <main>
    {id}
    {username}
</main> -->

<main class="px-[20px]">
   <div class="flex flex-cols-2 justify-between items-center">
    <div class="py-3">
        <span class="text-[17px] font-medium">Show Siswa</span>
        <Breadcrumbs {items} class=" text-[12px] font-light px-0 py-1"/>
    </div>
    <div>
        <a href="/admin/siswa/{id}/update">
            <Button class="text-white bg-purple-500 text-xs rounded-sm active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">Edit</Button>
        </a>
    </div>
   </div>

    <Card class="dark:bg-gray-800 h-[63vh] border dark:border-gray-700">
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
    <!-- <Button class="bg-red-500 text-xs text-white rounded-sm"><Icon path={mdiDelete} class="text-white" on:click={()=>handleSubmit()}/>Delete</Button> -->
    <div class="flex flex-cols-1 justify-between py-3">
        <span></span>
        <Button class="bg-red-500 text-xs text-white rounded-sm" on:click={()=>handleSubmit()}><Icon path={mdiDelete} class="text-white"/>Delete</Button>
    </div>
</main>