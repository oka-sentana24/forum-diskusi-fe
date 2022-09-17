<script lang="ts">
	export let type: string;
	export let click;
</script>

<button class={type} on:click={click}>
	<div class=" flex cols-span-2 items-center justify-center">
		<slot />
	</div>
</button>

<style lang="scss">
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
</style>
