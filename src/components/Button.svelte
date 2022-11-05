<script lang="ts">
	export let primary: boolean;
	export let disabled: boolean;
	export let click;
</script>

<button
	class={`h-[53px] w-full ${
		primary && 'cursor-pointer bg-primary-light-50 text-color-dark-title'
	} ${disabled && 'opacity-50 cursor-not-allowed'}`}
	on:click={click}
	{disabled}
>
	<div class=" flex cols-span-2 items-center justify-center">
		<slot />
	</div>
</button>
