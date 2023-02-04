<script lang="ts">
	// @ts-nocheck
	import Header from '$components/Header.svelte';
	import { Card, CardText, CardActions, Button } from 'svelte-materialify';
	let data = [{ text: 'Dashboard', href: '/' }];
	let DataJml = [
		{ nama: 'Jumlah Siswa', jumlah: '500' },
		{ nama: 'Jumlah Guru', jumlah: '200' },
		{ nama: 'jumlah Kelas', jumlah: '12' },
		{ nama: 'jumlah Jurusan', jumlah: '6' }
	];
</script>

<Header items={data} />

<main>
	<div class="m-5 relative">
		<div class="grid grid-cols-4 gap-4">
			{#each DataJml as dataItems}
				<Card class="bg-base-white shadow-sm dark:bg-base-dark">
					<div class="pl-4 pr-4 pt-3">
						<span class="text-overline"> {dataItems.nama} </span>
						<br />
						<h3 class="text-3xl font-bold">{dataItems.jumlah}</h3>
						<br />
					</div>
				</Card>
			{/each}
		</div>
	</div>
</main>
