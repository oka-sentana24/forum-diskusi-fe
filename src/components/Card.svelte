<script lang="ts">
	export let login: boolean;
</script>

<div
	class={`bg-main-light-primary dark: to-main-dark-primary ${
		login && 'w-[465px] p-[30px] leading-[.9px]'
	}`}
>
	<slot />
</div>
