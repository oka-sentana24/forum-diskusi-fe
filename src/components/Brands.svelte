<script lang="ts">
	// @ts-nocheck
	import brands from '$lib/images/brands.svg';
	import { mdiArrowLeft } from '@mdi/js';
	import { Icon } from 'svelte-materialify';
	import Title from './Title.svelte';
	export let back;
</script>

<div
	class="px-5 py-3 border-b flex flex-cols-3 justify-self-start items-center gap-5 h-16 border-separator-light dark:border-separator-dark"
>
	<span on:click={back} class="text-color-light dark:text-color-dark md:hidden">
		<Icon path={mdiArrowLeft} size={20} />
	</span>
	<img class="object-cover w-10 h-9" src={brands} alt="Brands" />
	<Title text="One_Ska" />
</div>
