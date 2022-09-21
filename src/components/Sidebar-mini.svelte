<script lang="ts">
	// @ts-nocheck
	import brands from '$lib/images/brands.svg';
	import Button from './Button.svelte';
	import { mdiCogOutline } from '@mdi/js';
	import { Icon } from 'svelte-materialify';

	export let sidebarClick;
</script>

<aside
	class="flex flex-col items-center bg-white border-r border-slate-400 text-gray-700 h-full dark:bg-gray-700 dark:border-gray-500 "
>
	<div class="h-16 flex items-center w-full">
		<a class="h-14 w-14 mx-auto" href="#">
			<img class="h-14 w-14 mx-auto" src={brands} alt="svelte logo" />
		</a>
	</div>

	<ul>
		<slot />
	</ul>

	<div class="mt-auto h-16 flex items-center w-full">
		<Button variant="icon" click={sidebarClick}>
			<Icon path={mdiCogOutline} />
		</Button>
	</div>
</aside>
