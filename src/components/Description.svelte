<script lang="ts">
	import Link from './Link.svelte';
	export let text: string;
</script>

<span class="leading-6">
	{text}
	<Link href="#"><slot /></Link>
</span>
