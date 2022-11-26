<script>
	import { page } from '$app/stores';
	export let href;
</script>

<a {href} class="link" class:active={$page.url.pathname == href}>
	<slot />
</a>

<style>
	a.active {
		@apply text-link;
	}
</style>
