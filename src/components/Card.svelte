<script lang="ts">
	export let login: boolean | null;
	export let miniCard: boolean | null;
	export let sidebar: boolean | null;
	export let fieldCard: boolean | null;
</script>

<div
	class={`${
		login && 'w-[465px] bg-main-light-primary p-8 tracking-normal-[0.9px] dark:bg-main-dark-primary'
	} ${
		miniCard &&
		'w-[70px] flex flex-col items-center bg-white text-gray-700 border-r border-gray-300 shadow h-full dark:bg-gray-900 gap-2 dark:border-gray-600'
	}
	${
		sidebar &&
		'flex flex-col bg-white w-64 text-gray-700 border-r border-gray-300 h-full dark:bg-gray-900 gap-2 dark:border-gray-600'
	}
	${fieldCard && ' bg-white dark:bg-gray-900'}`}
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
