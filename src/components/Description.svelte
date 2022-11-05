<script lang="ts">
	export let text: string;
</script>

<span class="leading-5">
	{text}
	<span class="text-link-light-purple"><slot /></span>
</span>
