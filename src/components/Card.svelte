<script lang="ts">
	export let login: boolean | null;
	export let sidebar: boolean | null;
</script>

<div
	class={`${login && 'w-[465px] p-8 bg-white tracking-normal-[0.9px]'} ${
		sidebar && 'bg-white text-gray-700 shadow h-full'
	}`}
>
	<slot />
</div>

<style>
	.login {
		width: 465px;
		padding: 30px;
		letter-spacing: 0.9px;
		background-color: white;
	}
</style>
