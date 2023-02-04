<script lang="ts">
	// @ts-nocheck
	import { Icon, List, ListItem } from 'svelte-materialify';
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
			<List>
				<ListItem class="hover:border-l-2 hover:border-btn-70">
					<span slot="prepend">
						<Icon path={items.svg} />
					</span>
					{items.name}
				</ListItem>
			</List>
		</NavLink>
	{/each}
</Card>
