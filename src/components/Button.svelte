<script lang="ts">
	export let primary: boolean | null;
	export let secondary: boolean | null;
	export let danger: boolean | null;
	export let fullWidth: boolean | null;
	export let disabled: boolean | null;
	export let filter: boolean | null;
	export let submite;
</script>

<button
	class={`button
	${primary && 'bg-teal-500 text-white'} 
	${secondary && ' bg-transparent hover:bg-slate-200 text-black'} 
	${danger && 'bg-red-500 text-white'}
	${disabled && ` bg-gray-400 cursor-not-allowed text-black-800 shadow-lg opacity-99`}  
	${fullWidth && `w-full`}
	${filter && ' bg-slate-400'}`}
	on:click={submite}
>
	<slot />
</button>

<style type="text/scss">
	.button {
		letter-spacing: 1px;
		font-size: 14px;
		cursor: pointer;
		border-radius: 3px;
		padding: 0 12px;
		width: 113px;
		height: 50px;
	}
</style>
