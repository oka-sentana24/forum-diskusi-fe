<script lang="ts">
	export let primary: boolean | null;
	export let secondary: boolean | null;
	export let danger: boolean | null;
	export let close: boolean | null;
	export let disabled: boolean | null;
	export let submite;
</script>

<button
	class={`w-full h-14 px-4 py-2 rounded-sm font-medium transition duration-300 ${
		primary && 'bg-teal-600 hover:bg-teal-800 text-white'
	}
	${secondary && 'bg-blue-600 hover:bg-blue-700'}
	${danger && 'bg-red-600 hover:bg-red-700'}
	${close && 'bg-transparent hover:bg-slate-500'}
	${disabled && 'bg-slate-500 hover:bg-slate-500 text-slate-600'}`}
	on:click={submite}
>
	<slot />
</button>
