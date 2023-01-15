<script lang="ts">
	// @ts-nocheck
	import brands from '$lib/images/brands.svg';
	import { mdiArrowLeft } from '@mdi/js';
	import { Icon } from 'svelte-materialify';
	import Title from './Title.svelte';
	export let back;
</script>

<div class="px-5 py-3 flex flex-cols-3 justify-self-start items-center gap-5 h-16">
	<span on:click={back} class="text-xl font-bold md:hidden">
		<Icon path={mdiArrowLeft} size={20} />
	</span>
	<img class="object-cover w-10 h-9" src={brands} alt="Brands" />
	<h3 class="text-xl font-bold">One_Ska</h3>
</div>
