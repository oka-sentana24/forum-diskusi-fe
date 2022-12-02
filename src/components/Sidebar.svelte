<script lang="ts">
	// @ts-nocheck
	import { Icon } from 'svelte-materialify';
	import Brands from '$components/Brands.svelte';
	import Card from '$components/Card.svelte';
	import NavLink from './NavLink.svelte';
	export let back;
	export let click;
	export let item = [];
</script>

<Card sidebar>
	<!-- Top Header-->
	<Brands {back} />
	{#each item as items}
		<div class="px-5 py-4">
			<NavLink href={items.url}>
				<div class="flex flex-cols-2 items-center gap-5 justify-start">
					<Icon path={items.svg} />
					<span>{items.name}</span>
				</div>
			</NavLink>
		</div>
	{/each}
</Card>
