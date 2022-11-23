<script lang="ts">
	export let text: string;
</script>

<span class="leading-6 text-white">
	{text}
	<span class="text-link cursor-pointer"><slot /></span>
</span>
