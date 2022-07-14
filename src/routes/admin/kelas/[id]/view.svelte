<script>
	import { Card, Button, Icon, Dialog, Snackbar } from 'svelte-materialify';
	import { page } from '$app/stores';
	import { mdiAccountEdit, mdiDelete, mdiAlert, mdiCheckCircle } from '@mdi/js';
	import Header from '$lib/components/Header.svelte';
	let snackbar = false;
	let active;
	let id,
		nama,
		grade
	export let Breadcrumbs = [
		{ text: 'Kelas', href: '/admin/kelas' },
		{ text: 'View', href: '#' }
	];
	// @ts-ignore
	fetch(`https://stark-wildwood-45887.herokuapp.com/kelas/list/${$page.params.id}`)
		.then((resp) => resp.json())
		.then((res) => {
			id = res.id;
			nama = res.nama;
			grade = res.grade;
		});
</script>

<main class="h-full overflow-y-auto">
	<Header items={Breadcrumbs} />
	<section class="h-full">
		<main class="h-full overflow-y-auto">
			<div class="relative top-[5rem] px-5">
				<div class="overflow-auto">
					<div class="flex justify-end py-[20px]">
						<a href="/admin/kelas/{id}/update">
							<Button class="text-white bg-purple-700 text-xs rounded-sm">
								<Icon path={mdiAccountEdit} class="text-xs" />
								Update
							</Button>
						</a>
					</div>
					<Card class="dark:bg-blue-800 h-[70vh] bg-white shadow-none">
						<div class="p-5 flex flex-cols-2 gap-20">
							<div>
								<label for="" class="text-xs text-gray-400">id</label>
								<div class="pb-2">
									{id}
								</div>
								<label for="" class="text-xs text-gray-400">Nama</label>
								<div class="pb-2">
									{nama}
								</div>
								<label for="" class="text-xs text-gray-400">Grade</label>
								<div class="pb-2">
									{grade}
								</div>
							</div>
						</div>
					</Card>
				</div>
			</div>
		</main>
	</section>
</main>
