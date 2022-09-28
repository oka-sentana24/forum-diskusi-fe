<script lang="ts">
	export let text: string;
</script>

<span class="font-normal leading-5">
	{text}
	<span class="text-teal-500"><slot /></span>
</span>
