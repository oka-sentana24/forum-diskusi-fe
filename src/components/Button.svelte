<script lang="ts">
	export let primary: boolean | null;
	export let secondary: boolean | null;
	export let danger: boolean | null;
	export let close: boolean | null;
	export let disabled: boolean | null;
	export let filter: boolean | null;
	export let submite;
</script>

<button
	class={`w-full px-4 py-2 rounded-md font-medium transition duration-300 text-1xl text-white ${
		primary && 'bg-blue-500 hover:bg-blue-700 h-14 	'
	}
	${secondary && ' h-11 w-[104px] bg-purple-600 hover:bg-purple-800'}
	${danger && ' h-11 w-[104px] bg-red-600 hover:bg-red-700'}
	${close && ' h-11 w-[104px] bg-transparent hover:text-slate-500 text-slate-800'}
	${disabled && ' h-14  rounded opacity-50 cursor-not-allowed hover: bg-none'}
	${filter && ' h-11 bg-slate-300 Hover:bg-slate-400 text-slate-700'}`}
	on:click={submite}
>
	<slot />
</button>
