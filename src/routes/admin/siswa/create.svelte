<script>
// @ts-nocheck

    import { Card, TextField, Select, Button, Icon } from 'svelte-materialify';
    import { mdiContentSave, mdiDelete } from '@mdi/js';
    import '$sass/tailwind.scss';
    import { Breadcrumbs} from 'svelte-materialify';

    let data = {username: '', nama: '', alamat:'', jenis_kelamin:'', tempat_lahir:'', tanggal_lahir:'', agama:'', no_tlp:'', email:'', kewarganegaraan:'', kecamatan:'', kabupaten:'', nama_ayah:'', pekerjaan_ayah:'', nama_ibu:'', pekerjaan_ibu:''  }
    const items = [
        { text: 'Siswa', href: '/admin/siswa' },
        { text: 'Create', href: '#' },
    ];
    async function handleSubmit() {
      const response = await fetch('http://localhost:3001/siswa',{
          method: 'POST',
          credentials: 'same-origin',
          body: JSON.stringify({ ...data }),
          headers: {
              'Content-Type': 'application/json'
          }
      });

      if ( response.status === 200) {
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

<main class="px-[20px]">
   <!-- bradcrumb and title -->
   <div class="py-3">
        <span class="text-[17px] font-medium">Create Siswa</span>
        <Breadcrumbs {items} class=" text-[12px] font-light px-0 py-1"/>
    </div>
    <Card class="dark:bg-gray-800 h-[63vh] border bg-white shadow-none dark:border-gray-600">
        <div class="flex flex-cols-2 gap-3 p-3">
            <!-- <form action=""> -->
                <div class="w-full">
                    <div class="py-3">
                        <TextField filled class="main-input" rules={validateNisn} bind:value={data.username}>Nisn</TextField>
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
            <!-- </form> -->
        </div>
    </Card>
    <div class="flex flex-cols-1 justify-between py-3">
        <Button class="bg-white text-xs text-gray-900 rounded-sm" on:click={()=>handleSubmit()}><Icon path={mdiContentSave} class="text-gray-900"/>Save</Button>
        <Button class="bg-red-500 text-xs text-white rounded-sm"><Icon path={mdiDelete} class="text-white"/>Delete</Button>
    </div>
</main>