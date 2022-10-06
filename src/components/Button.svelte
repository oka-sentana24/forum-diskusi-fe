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
	export let primary: boolean;
	export let secondary: boolean;
	export let danger: boolean;
	export let disabled: boolean;
	export let label: string;
	export let click;
</script>

<button
	class={`${
		primary &&
		'w-full h-14 bg-purple-600 text-white px-4 py-2 rounded-md text-1xl font-medium hover:bg-purple-800 transition duration-300'
	}
	${
		secondary &&
		'bg-blue-500 text-white px-4 py-2 rounded-md text-1xl font-medium hover:bg-blue-700 transition duration-300'
	}
	${
		danger &&
		'bg-red-600 text-white px-4 py-2 rounded-md text-1xl font-medium hover:bg-red-700 transition duration-300'
	}
	${disabled && 'rounded focus:outline-none disabled:opacity-25 cursor-not-allowed'}
	`}
	on:click={click}
>
	<div class="flex col-span-2 items-center justify-center">
		<slot />
		{label}
	</div>
</button>
