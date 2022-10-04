<script lang="ts">
	// @ts-nocheck
	import Header from '$components/Header.svelte';
	import { mdiAccountSchool, mdiDotsHorizontal } from '@mdi/js';
	import { Icon } from 'svelte-materialify';
	import { Menu } from './../../constant';

	const data = [{ text: 'Dashboard', href: '/' }];
	let menus = Menu;
</script>

<!-- top header -->
<Header items={data} />
<!-- end  -->

<!-- content -->
<main>
	<div class="flex flex-wrap p-5 gap-5">
		{#each menus as item}
			<a href={item.url}>
				<div class="bg-white w-[300px] h-auto shadow-sm">
					<div class="p-5">
						<div class="flex col-span-2 items-center justify-between">
							<Icon path={item.svg} size={40} />
						</div>
						<div class="grid">
							<span class=" text-2xl text-teal-500">{item.name}</span>
							<span class=" text-base text-slate-400">Total:</span>
							<span class="text-3xl text-slate-400">$24,780</span>
							<div class="bg-red-100 h-28 w-full">canvas</div>
						</div>
					</div>
				</div>
			</a>
		{/each}
	</div>
</main>
<!-- end -->
