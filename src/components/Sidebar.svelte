<script lang="ts">
	import { Icon } from 'svelte-materialify';
	import Brand from './Logo.svelte';

	export let item = [];
</script>

<div
	class="flex flex-col bg-white text-gray-700 h-full w-64 dark:bg-black border-r border-gray-300 dark:border-teal-700"
>
	<!-- Top Header-->
	<Brand />

	{#each item as items}
		<div
			class="px-5 py-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
		>
			<a href={items.url}>
				<div
					class="flex flex-cols-2 items-center gap-5 justify-start  text-gray-500 hover:text-teal-600"
				>
					<Icon path={items.svg} />
					<span>{items.name}</span>
				</div>
			</a>
		</div>
	{/each}
</div>
