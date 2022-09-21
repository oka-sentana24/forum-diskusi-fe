<script lang="ts">
	export let text: string;
</script>

<span class="text-base leading-5 py-2 text-slate-500">
	{text}
	<span class="text-teal-400"><slot /></span>
</span>
