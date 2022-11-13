<script lang="ts">
	// @ts-nocheck
	import { Icon } from 'svelte-materialify';
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
		<div class="px-5 py-5 text-color-light-body hover:text-color-light-title rounded-lg">
			<a href={items.url} on:click={click}>
				<div
					class="flex flex-cols-2 items-center gap-5 justify-start text-gray-500 hover:text-teal-600"
				>
					<Icon path={items.svg} />
					<span>{items.name}</span>
				</div>
			</a>
		</div>
	{/each}
</Card>
