<script>
	import Header from '$components/Header.svelte';
	import { Breadcrumbs } from 'svelte-materialify';

	const item = [{ text: 'Dashboard', href: '/' }]
</script>

<Header>
	<Breadcrumbs {item} style="padding:0px"/>
</Header>

<main>
	<div class="p-5">
		Dasboard
	</div>
</main>