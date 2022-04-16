<script>
import { Card } from "svelte-materialify";


    let id, username, nama, alamat, jenis_kelamin;
	// @ts-ignore
	fetch(`http://localhost:3001/siswa/1`)
		.then((resp) => resp.json())
		.then((res) => {
            id = res.id;
			username = res.username;
            nama    = res.nama;
            alamat = res.alamat;
            jenis_kelamin = res.jenis_kelamin;
		})
</script>

<!-- <main>
    {id}
    {username}
</main> -->

<main class="px-[20px]">
    <h1 class=" text-2xl py-3">Create Siswa</h1>    

    <Card class="dark:bg-gray-800 h-[63vh]">
        <div>
            {id}
        </div>
        <div>
            {username}
        </div>
        <div>
            {nama}
        </div>
        <div>
            {alamat}
        </div>
        <div>
            {jenis_kelamin}
        </div>
    </Card>
</main>