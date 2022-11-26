<script lang="ts">
	// @ts-nocheck
	import { Icon } from 'svelte-materialify';
	import Brands from '$components/Brands.svelte';
	import Card from '$components/Card.svelte';
	import Link from '$components/Link.svelte';
	export let back;
	export let click;
	export let item = [];
</script>

<Card sidebar>
	<!-- Top Header-->
	<Brands {back} />
	{#each item as items}
		<div class="px-5 py-4 hover:bg-gray-800 text-gray-500">
			<Link href={items.url}>
				<div class="flex flex-cols-2 items-center gap-5 justify-start">
					<Icon path={items.svg} />
					<span>{items.name}</span>
				</div>
			</Link>
		</div>
	{/each}
</Card>
