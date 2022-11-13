<script lang="ts">
	export let login: boolean;
	export let create: boolean;
	export let disabled: boolean;
	export let filter: boolean;
	export let icon: boolean;
	export let close: boolean;
	export let remove: boolean;

	export let click;
</script>

<button
	class={`w-full ${login && 'h-[53px] cursor-pointer bg-primary-light-50 text-color-dark-title'} ${
		disabled && 'opacity-50 cursor-not-allowed'
	} ${
		create &&
		'h-[42px] w-[104px] bg-primary-light-30 dark:bg-primary-dark-30 rounded-md text-base-white'
	} ${
		filter && 'h-[42px] w-[104px] bg-primary-light-10 dark:bg-main-dark-primary text-sm rounded-md'
	} ${
		icon &&
		'h-[42px] w-[50px] bg-primary-light-30 dark: bg-bg-primary-dark-30 text-base-white rounded-md'
	} ${
		remove && 'h-[42px] w-[104px] bg-other-error dark:bg-primary-dark-30 rounded-md text-base-white'
	} ${
		close && 'bg-transparent h-[42px] w-[104px] text-color-light-body hover:bg-main-light-secondary'
	}`}
	on:click={click}
	{disabled}
>
	<div class=" flex cols-span-2 items-center justify-center">
		<slot />
	</div>
</button>
