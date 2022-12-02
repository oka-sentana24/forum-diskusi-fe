<script lang="ts">
	// @ts-nocheck
	import Header from '$components/Header.svelte';
	import { Breadcrumbs } from 'svelte-materialify';
	let data = [{ text: 'Dashboard', href: '/' }];
</script>

<Header items={data} />

<main>
	<div class="p-5">Dasboard</div>
</main>
