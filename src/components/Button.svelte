<!-- <script lang="ts">
	export let type: string;
	export let click;
	export let disabled: boolean;
	export let Label: string;
</script>

<button class={type} on:click={click} {disabled}>
	<div class=" flex cols-span-2 items-center justify-center">
		<slot />
	</div>
</button>

<style lang="scss">
	:disabled {
		background: rgba(37, 56, 88, 0.33) !important;
		border-radius: 3px;
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
	export let variant: string;
	export let click;
	export let disabled: boolean = false;
</script>

<button
	class="button"
	class:primary={variant === 'primary'}
	class:icon={variant === 'icon'}
	class:danger={variant === 'secondary'}
	on:click={click}
	{disabled}
>
	<slot />
</button>

<style type="text/scss">
	:disabled {
		background: rgba(37, 56, 88, 0.33) !important;
		border-radius: 3px;
	}
	.button {
		/* padding: 20px;
		width: 100%;
		border-radius: 3px; */
		letter-spacing: 1px;
		font-size: 14px;
		cursor: pointer;
		border-radius: 3px;
		padding: 0 12px;
		height: 50px !important;
		min-height: 50px !important;
		margin: 0 5px 20px 0 !important;
		width: 100%;
	}
	.primary {
		background: #04b4cd;
		color: #fff;
	}
	.icon {
		background: rgba(37, 56, 88, 0.33);
		color: #fff;
		margin: 0px 4px !important;
	}
	.icon:hover {
		background-color: #04b4cd;
	}
</style>
