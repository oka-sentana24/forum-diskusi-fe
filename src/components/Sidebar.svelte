<script lang="ts">
	// @ts-nocheck
	import Brands from '$components/Brands.svelte';
	import Card from '$components/Card.svelte';
	export let back;
	export let click;
	export let item = [];
</script>

<Card sidebar>
	<!-- Top Header-->
	<Brands {back} />
	{#each item as items}
		<div
			class="px-5 py-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
		>
			<a href={items.url} on:click={click}>
				<div
					class="flex flex-cols-2 items-center gap-5 justify-start  text-gray-500 hover:text-teal-600"
				>
					<span>{items.name}</span>
				</div>
			</a>
		</div>
	{/each}
</Card>
