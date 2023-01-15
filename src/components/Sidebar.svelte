<script lang="ts">
	// @ts-nocheck
	import { Icon } from 'svelte-materialify';
	import Brands from '$components/Brands.svelte';
	import Card from '$components/Card.svelte';
	import NavLink from './NavLink.svelte';
	export let back;
	export let item = [];
</script>

<Card sidebar>
	<!-- Top Header-->
	<Brands {back} />
	{#each item as items}
		<NavLink href={items.url}>
			<div
				class="px-5 py-4 flex flex-cols-2 items-center gap-5 justify-start hover:bg-[#9FA2B4] hover:bg-opacity-[0.08] hover:border-l-2 hover:border-[#DDE2FF]"
			>
				<Icon path={items.svg} />
				<span>{items.name}</span>
			</div>
		</NavLink>
	{/each}
</Card>
