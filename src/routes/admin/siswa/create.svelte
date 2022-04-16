<script>
// @ts-nocheck

    import { Card, TextField, Select, Button, Icon } from 'svelte-materialify';
    import { createEventDispatcher} from 'svelte'
    import { mdiContentSave, mdiDelete } from '@mdi/js';
    import '$sass/tailwind.scss';


    let dispatch = createEventDispatcher()
    // let username = '';
    // let nama = '';
    // let alamat = '';
    // let jk = ''
    let data = {username: '', nama: '', alamat:'', jenis_kelamin:'', tempat_lahir:'', tanggal_lahir:'', agama:'', no_tlp:'', email:'', kewarganegaraan:'', kecamatan:'', kabupaten:'', nama_ayah:'', pekerjaan_ayah:'', nama_ibu:'', pekerjaan_ibu:''  }

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
        // let body = await response.json();


        // console.log(decoded)

        //   if(decoded.role === 'USER'){
        //     window.location.href="/landing";
        //   }else if(decoded.role === 'ADMIN'){
        //     window.location.href="/admin";
        //   }else{
        //     console.log("no user")
        //   }
        console.log("create")
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
    const validateNama = [
		(v) => !!v || 'Required',
		(v) => v.length <= 25 || 'Max 25 characters',
	];
    const validateAlamat = [
		(v) => !!v || 'Required',
		(v) => v.length <= 25 || 'Max 25 characters',
	];
    
</script>

<main class="px-[20px]">
    <h1 class=" text-2xl py-3">Create Siswa</h1>    

    <Card class="dark:bg-gray-800 h-[63vh]">
        <div class="flex flex-cols-2 gap-3 p-3">
            <!-- <form action=""> -->
                <div class="w-full">
                    <div class="py-3">
                        <TextField filled class="main-input" rules={validateNisn} {titleRules} bind:value={data.username}>Nisn</TextField>
                    </div>
                    <div class="py-3">
                        <TextField filled class="main-input" rules={validateNama} bind:value={data.nama}>Nama</TextField>
                    </div>
                    <div class="py-3">
                        <TextField filled class="main-input" rules={validateAlamat} bind:value={data.alamat}>Alamat</TextField>
                    </div>
                    <div class="py-3">
                        <Select filled items={Jenis_kelamin} class="main-input dropdown" bind:value={data.jenis_kelamin}>Jenis_kelamin</Select>
                    </div>
                    <div class="py-3">
                        <TextField filled class="main-input text-xs" bind:value={data.tempat_lahir}>Tempat_lahir</TextField>
                    </div>
                    <div class="py-3">
                        <TextField filled class="main-input text-xs" type="date" placeholder="date" bind:value={data.tanggal_lahir}>Tanggal_lahir</TextField>
                        
                    </div>
                    <div class="py-3">
                        <!-- <TextField filled class="main-input">Agama</TextField> -->
                        <Select filled items={Agama} class="main-input dropdown text-xs" bind:value={data.agama}>Agama</Select>
                    </div>
                    <div class="py-3">
                        <TextField filled class="main-input" bind:value={data.no_tlp}>No_Tlp</TextField>
                    </div>
                </div>
                <div class="w-full">
                    <div class="py-3">
                        <TextField filled class="main-input" bind:value={data.email}>Email</TextField>
                    </div>
                    <div class="py-3">
                        <TextField filled class="main-input" bind:value={data.kewarganegaraan}>Kewarganegaraan</TextField>
                    </div>
                    <div class="py-3">
                        <TextField filled class="main-input" bind:value={data.kecamatan}>Kecamatan</TextField>
                    </div>
                    <div class="py-3">
                        <TextField filled class="main-input" bind:value={data.kabupaten}>Kabupaten</TextField>
                    </div>
                    <div class="py-3">
                        <TextField filled class="main-input" bind:value={data.nama_ayah}>Nama Ayah</TextField>
                    </div>
                    <div class="py-3">
                        <TextField filled class="main-input" bind:value={data.pekerjaan_ayah}>Pekerjaan Ayah</TextField>
                    </div>
                    <div class="py-3">
                        <TextField filled class="main-input" bind:value={data.nama_ibu}>Nama Ibu</TextField>
                    </div>
                    <div class="py-3">
                        <TextField filled class="main-input" bind:value={data.pekerjaan_ibu}>Pekerjaan Ibu</TextField>
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