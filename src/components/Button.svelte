<script lang="ts">
	export let login: boolean;
	export let disabled: boolean;
	export let filter: boolean;
	export let icon: boolean;
	export let close: boolean;
	export let remove: boolean;
	export let modal: boolean;

	export let click;
</script>

<button
	class={`bg-btn-50 h-[44px] min-w-[78px] px-5 rounded-md text-white ${
		login && 'h-[53px] w-full cursor-pointer text-white'
	} ${disabled && 'opacity-50 cursor-not-allowed'} ${
		filter && 'bg-fill-dark-btn text-white hover:bg-link-primary'
	} ${icon && 'h-[42px] w-[50px] bg-[#25385854] hover:bg-link text-white'} ${
		remove && 'bg-fill-dark-btn hover:bg-other-error text-base-white'
	} ${close && 'bg-transparent text-base-black'} ${modal && ' bg-link-primary'}`}
	on:click={click}
	{disabled}
>
	<div class=" flex cols-span-2 items-center justify-center">
		<slot />
	</div>
</button>
