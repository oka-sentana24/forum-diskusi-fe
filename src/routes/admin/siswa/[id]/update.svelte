<script>
    // @ts-nocheck
    
        import { Card, TextField, Select, Button, Icon, Snackbar } from 'svelte-materialify';
        import { mdiContentSave, mdiCheckCircle } from '@mdi/js';
        import '$sass/tailwind.scss';
        import { page } from '$app/stores';
        import Header from '$lib/components/Admin/Header.svelte'

        // let id = page.query.id;
        let snackbar = false;
        let data = {username:'', nama: '', alamat:'', jenis_kelamin:'', tempat_lahir:'', tanggal_lahir:'', agama:'', no_tlp:'', email:'', kewarganegaraan:'', kecamatan:'', kabupaten:'', nama_ayah:'', pekerjaan_ayah:'', nama_ibu:'', pekerjaan_ibu:''  }
        const Breadcrumbs = [
            { text: 'Siswa', href: '/admin/siswa' },
            { text: 'Update', href: '#' },
        ];
        fetch(`http://localhost:3001/siswa/${$page.params.id}`)
            .then((resp) => resp.json())
            .then((res) => {
                data.id = res.id;
                data.username = res.username;
                data.nama    = res.nama;
                data.alamat = res.alamat;
                data.jenis_kelamin = res.jenis_kelamin;
                data.jenis_kelamin = res.jenis_kelamin;
                data.tempat_lahir = res.tempat_lahir;
                data.tanggal_lahir = res.tanggal_lahir
                data.agama = res.agama;
                data.no_tlp = res.no_tlp;
                data.email = res.email;
                data.kewarganegaraan = res. kewarganegaraan;
                data.kecamatan = res.kecamatan;
                data.kabupaten = res. kabupaten;
                data.nama_ayah = res.nama_ayah;
                data.pekerjaan_ayah = res.pekerjaan_ayah;
                data.nama_ibu = res.nama_ibu;
                data.pekerjaan_ibu = res.pekerjaan_ibu;

        })
        async function handleSubmit() {
          const response = await fetch(`http://localhost:3001/siswa/${$page.params.id}`,{
              method: 'PUT',
              credentials: 'same-origin',
              body: JSON.stringify({ ...data }),
              headers: {
                  'Content-Type': 'application/json'
              }
          });
    
          if ( response.status === 200) {

                snackbar = true;
                window.location.href="/admin/siswa";
          }
          // what do you do with a non-redirect?
    
        }
    
        const Jenis_kelamin = [
         'Laki-Laki','Perempuan'
        ];
        const Agama = ['Islam', 'Protestan', 'Katolik', 'Hindu', 'Buddha', 'Khonghucu'];
        const titleRules = [(v) => !!v || 'Required'];
        const validateNisn = [
            (v) => !!v || 'Required',
            (v) => v.length <= 10 || 'Max 10 characters',
            (v) => {
                const pattern =
                    /^[0-9]*$/;
                return pattern.test(v) || 'Invalid type from number';
            }
        ];
        const emailRules = [
            (v) => !!v || 'Required',
            (v) => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return pattern.test(v) || 'Invalid e-mail.';
            },
        ];
        const telponRules = [
            (v) => !!v || 'Required',
            (v) => v.length <= 25 || 'Max 25 characters',
            (v) => {
            const pattern = /^(\+62|62)?[\s-]?0?8[1-9]{1}\d{1}[\s-]?\d{4}[\s-]?\d{2,5}$/;
            return pattern.test(v) || 'Invalid e-mail.';
            },
        ];
    
    </script>

<div class="border-b dark:border-teal-900 h-[12vh] relative">
    <div>
        <div class="pb-2">
            <Header items={Breadcrumbs}/>
        </div>
        <div class="flex justify-between items-center px-6">
            <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-200">Update Siswa</h2>
            <Button class=" bg-white hover:bg-blue-400 rounded-sm" on:click={()=>handleSubmit()}><Icon path={mdiContentSave} class="text-teal-900 hover:text-white"/></Button>
            <Snackbar class="flex-column bg-white text-teal-900" bind:active={snackbar} center text timeout={3000}>
                <Icon path={mdiCheckCircle}/>
                <div class="mt-1 font-semibold">
                   <span>Success Update</span>
                </div>
            </Snackbar>
        </div>
    </div>
</div>
    <main class="p-[20px]">
        <Card class="dark:bg-blue-800 h-[63vh] bg-white shadow-none">
            <div class="flex flex-cols-2 gap-3 p-3">
                <div class="w-full">
                    <div class="py-3">
                        <TextField filled class="main-input cursor-not-allowed" rules={validateNisn} bind:value={data.username} disabled>Nisn</TextField>
                    </div>
                    <div class="py-3">
                        <TextField filled class="main-input" rules={titleRules} bind:value={data.nama}>Nama</TextField>
                    </div>
                    <div class="py-3">
                        <TextField filled class="main-input" rules={titleRules} bind:value={data.alamat}>Alamat</TextField>
                    </div>
                    <div class="py-3">
                        <Select filled items={Jenis_kelamin}  class="main-input dropdown" rules={titleRules} bind:value={data.jenis_kelamin}>Jenis_kelamin</Select>
                    </div>
                    <div class="py-3">
                        <TextField filled class="main-input text-xs" rules={titleRules} bind:value={data.tempat_lahir}>Tempat_lahir</TextField>
                    </div>
                    <div class="py-3">
                        <TextField filled class="main-input text-xs" type="date" placeholder="date" bind:value={data.tanggal_lahir}>Tanggal_lahir</TextField>
                        
                    </div>
                    <div class="py-3">
                        <!-- <TextField filled class="main-input">Agama</TextField> -->
                        <Select filled items={Agama} class="main-input dropdown text-xs" rules={titleRules} bind:value={data.agama}>Agama</Select>
                    </div>
                    <div class="py-3">
                        <TextField filled class="main-input" rules={telponRules} bind:value={data.no_tlp}>No_Tlp</TextField>
                    </div>
                </div>
                <div class="w-full">
                    <div class="py-3">
                        <TextField filled class="main-input" rules={emailRules} bind:value={data.email}>Email</TextField>
                    </div>
                    <div class="py-3">
                        <TextField filled class="main-input" rules={titleRules} bind:value={data.kewarganegaraan}>Kewarganegaraan</TextField>
                    </div>
                    <div class="py-3">
                        <TextField filled class="main-input" rules={titleRules} bind:value={data.kecamatan}>Kecamatan</TextField>
                    </div>
                    <div class="py-3">
                        <TextField filled class="main-input" rules={titleRules} bind:value={data.kabupaten}>Kabupaten</TextField>
                    </div>
                    <div class="py-3">
                        <TextField filled class="main-input" rules={titleRules} bind:value={data.nama_ayah}>Nama Ayah</TextField>
                    </div>
                    <div class="py-3">
                        <TextField filled class="main-input" rules={titleRules} bind:value={data.pekerjaan_ayah}>Pekerjaan Ayah</TextField>
                    </div>
                    <div class="py-3">
                        <TextField filled class="main-input" rules={titleRules} bind:value={data.nama_ibu}>Nama Ibu</TextField>
                    </div>
                    <div class="py-3">
                        <TextField filled class="main-input" rules={titleRules} bind:value={data.pekerjaan_ibu}>Pekerjaan Ibu</TextField>
                    </div>
                </div>
            </div>
        </Card>
    </main>