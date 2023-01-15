<script>
	import { page } from '$app/stores';
	export let href;
	$: active = $page.url.pathname === href;
</script>

<a {href} class:active>
	<slot />
</a>

<style>
	a.active {
		@apply text-[#DDE2FF];
	}
</style>
