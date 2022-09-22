<!-- <script lang="ts">
	export let type: string;
	export let click;
	export let disabled: boolean;
</script>

<button class={type} on:click={click} {disabled}>
	<div class=" flex cols-span-2 items-center justify-center">
		<slot />
	</div>
</button>

<style lang="scss">
	:disabled {
		opacity: 0.5;
		cursor: not-allowed !important;
		pointer-events: none !important;
	}
	.primary {
		letter-spacing: 1px;
		font-size: 14px;
		background-color: #6366f1;
		color: #fff;
		cursor: pointer;
		border: 1px solid transparent;
		border-radius: 3px;
		padding: 0 12px;
		height: 50px;
		min-height: 50px;
		width: 100%;
	}
	.primary:hover {
		background-color: #4f46e5;
	}

	.create {
		letter-spacing: 1px;
		font-size: 14px;
		color: white;
		cursor: pointer;
		border: 1px solid transparent;
		border-radius: 3px;
		padding: 0 12px;
		width: 104px;
		height: 42px;
		background: #6875f5;
		mix-blend-mode: normal;
		border-radius: 3px;
	}
	.create:hover {
		background-color: #4f46e5;
	}
	.edit {
		letter-spacing: 1px;
		font-size: 14px;
		color: white;
		cursor: pointer;
		border: 1px solid transparent;
		border-radius: 3px;
		padding: 0 12px;
		width: 104px;
		height: 42px;
		background: #94a3b8;
		mix-blend-mode: normal;
		border-radius: 3px;
	}
	.edit:hover {
		background-color: #4f46e5;
	}
	.save {
		letter-spacing: 1px;
		font-size: 14px;
		color: white;
		cursor: pointer;
		border: 1px solid transparent;
		border-radius: 3px;
		padding: 0 12px;
		width: 104px;
		height: 42px;
		background: #94a3b8;
		mix-blend-mode: normal;
		border-radius: 3px;
	}
	.save:hover {
		background-color: #4f46e5;
	}
	.danger {
		letter-spacing: 1px;
		font-size: 14px;
		color: white;
		cursor: pointer;
		border: 1px solid transparent;
		border-radius: 3px;
		padding: 0 12px;
		width: 104px;
		height: 42px;
		background: #f98080;
		mix-blend-mode: normal;
		border-radius: 3px;
	}
	.danger:hover {
		background-color: #f05252;
	}
	.filter {
		letter-spacing: 1px;
		font-size: 14px;
		color: white;
		cursor: pointer;
		border: 1px solid transparent;
		border-radius: 3px;
		padding: 0 12px;
		width: 104px;
		height: 42px;
		background: #94a3b8;
		mix-blend-mode: normal;
		border-radius: 3px;
	}
	.filter:hover {
		background-color: #475569;
	}
</style> -->
<script lang="ts">
	export let primary: boolean | null;
	export let secondary: boolean | null;
	export let fullWidth: boolean | null;
	export let disabled: boolean | null;
	export let submite;
	// export let click;
	// export let disabled: boolean = false;
	import '../style/app.scss';
</script>

<button
	class={`button
	${primary && 'bg-teal-500 text-white'} 
	${secondary && 'bg-indigo-600 text-white'} 
	${disabled && ` bg-gray-400 cursor-not-allowed text-black-800 shadow-lg opacity-99`}  
	${fullWidth && `w-full`}`}
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
		height: 50px !important;
		min-height: 50px !important;
		margin: 0 5px 20px 0 !important;
	}
</style>
