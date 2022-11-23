<script lang="ts">
	export let login: boolean;
	export let create: boolean;
	export let disabled: boolean;
	export let filter: boolean;
	export let icon: boolean;
	export let close: boolean;
	export let update: boolean;
	export let remove: boolean;
	export let modal: boolean;

	export let click;
</script>

<button
	class={`rounded-sm h-[42px] w-[104px] text-white ${
		login && 'h-[53px] w-full cursor-pointer bg-white text-slate-700'
	} ${disabled && 'opacity-50 cursor-not-allowed'} ${create && 'bg-white text-gray-700'} ${
		filter && ' bg-[#25385854] hover:bg-link text-white'
	} ${icon && 'h-[42px] w-[50px] bg-[#25385854] hover:bg-link text-white'} ${
		remove && ' bg-[#25385854] hover:bg-red-500 text-base-white'
	} ${close && 'bg-transparent text-gray-700'} ${update && 'bg-purple-800 text-base-white'} ${
		modal && 'bg-link'
	}`}
	on:click={click}
	{disabled}
>
	<div class=" flex cols-span-2 items-center justify-center">
		<slot />
	</div>
</button>
