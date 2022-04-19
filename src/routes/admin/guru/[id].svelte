<script>
import { Card, Button } from "svelte-materialify";
import { page } from '$app/stores';
import { Breadcrumbs} from 'svelte-materialify';
    
    let id, username, nama, alamat, jenis_kelamin, tempat_lahir, tanggal_lahir, agama, no_tlp, email, kewarganegaraan, jabatan, ktp, kecamatan, kabupaten;
    const items = [
        { text: 'Siswa', href: '/admin/guru' },
        { text: 'Show', href: '#' },
    ];
    // @ts-ignore
	fetch(`http://localhost:3001/guru/${$page.params.id}`)
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
            jabatan = res.jabatan;
            ktp = res.ktp;
            kewarganegaraan = res. kewarganegaraan;
            kecamatan = res.kecamatan;
            kabupaten = res. kabupaten;

		})
</script>

<!-- <main>
    {id}
    {username}
</main> -->

<main class="px-[20px]">
   <div class="flex flex-cols-2 justify-between items-center">
    <div class="py-3">
        <span class="text-[17px] font-medium">Show Guru</span>
        <Breadcrumbs {items} class=" text-[12px] font-light px-0 py-1"/>
    </div>
    <div>
        <a href="/admin/guru/create">
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
                <label for="" class="text-xs text-gray-400">Nip</label>
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
                <label for="" class="text-xs text-gray-400">Jabatan</label>
                <div class="pb-2">
                    {jabatan}
                </div>
                <label for="" class="text-xs text-gray-400">Ktp</label>
                <div class="pb-2">
                    {ktp}
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
            </div>
        </div>
    </Card>
</main>