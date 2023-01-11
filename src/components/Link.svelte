<script>
	import { page } from '$app/stores';
	export let href;
</script>

<a {href} class="text-link-primary hover:text-link-secondary">
	<slot />
</a>
