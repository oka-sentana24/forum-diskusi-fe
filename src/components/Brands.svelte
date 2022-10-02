<script lang="ts">
	// @ts-nocheck
	import brands from '$lib/images/brands.svg';
	import { mdiArrowLeft } from '@mdi/js';
	import { Icon } from 'svelte-materialify';
	export let back;
</script>

<div
	class="p-5 border-b border-slate-300 flex flex-cols-3 justify-self-start items-center gap-5 h-20 text-gray-900 font-normal dark:border-gray-600 dark:text-white"
>
	<span on:click={back} class="text-slate-500 md:hidden">
		<Icon path={mdiArrowLeft} size={20} />
	</span>
	<img class="object-cover w-10 h-9" src={brands} alt="Brands" />
	<span class="text-slate-600 font-bold text-2xl"> ONE_SKA </span>
</div>
