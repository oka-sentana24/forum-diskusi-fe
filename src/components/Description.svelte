<script lang="ts">
	export let text: string;
</script>

<span class="leading-9 text-color-light-body dark:text-color-dark-body">
	{text}
	<span class="text-link-light-purple dark:text-link-dark-blue"><slot /></span>
</span>
