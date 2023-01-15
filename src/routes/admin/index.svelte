<script lang="ts">
	// @ts-nocheck
	import Header from '$components/Header.svelte';
	import Card from '$components/Card.svelte';
	let data = [{ text: 'Overview', href: '/' }];
</script>

<div class="sticky top-0 z-10">
	<Header text="Overview" />
</div>
<div class="relative overflow-auto px-5">
	<div class="flex flex-cols-4 items-center gap-5">
		<Card miniCard>
			<div class="text-center p-5 grid hover:text-blue">
				<p class="text-lg font-bold">Siswa</p>
				<span class=" text-4xl font-bold">1000</span>
			</div>
		</Card>
		<Card miniCard>
			<div class="text-center p-5 grid hover:text-blue">
				<p class="text-lg font-bold">Guru</p>
				<span class=" text-4xl font-bold">150</span>
			</div>
		</Card>
		<Card miniCard>
			<div class="text-center p-5 grid hover:text-blue">
				<p class="text-lg font-bold">Kelas</p>
				<span class=" text-4xl font-bold">100</span>
			</div>
		</Card>
		<Card miniCard>
			<div class="text-center p-5 grid hover:text-blue">
				<p class="text-lg font-bold">Jurusan</p>
				<span class=" text-4xl font-bold">200</span>
			</div>
		</Card>
		<Card miniCard>
			<div class="text-center p-5 grid hover:text-blue">
				<p class="text-lg font-bold">Mata Pelajaran</p>
				<span class=" text-4xl font-bold">112</span>
			</div>
		</Card>
	</div>
</div>
