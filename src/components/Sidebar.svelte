<script lang="ts">
	import { Icon } from 'svelte-materialify';
	import Brand from './Logo.svelte';
	import Card from '$components/Card.svelte';

	export let item = [];
</script>

<Card sidebar>
	<!-- Top Header-->
	<div
		class="text-[16px] font-bold h-20 items-center justify-center  px-5 py-8 border-b border-gray-300 dark:border-gray-600 dark:text-white"
	>
		<span>SETTINGS</span>
	</div>

	{#each item as items}
		<div
			class="px-5 py-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
		>
			<a href={items.url}>
				<div
					class="flex flex-cols-2 items-center gap-5 justify-start  text-gray-500 hover:text-teal-600"
				>
					<span>{items.name}</span>
				</div>
			</a>
		</div>
	{/each}
</Card>
