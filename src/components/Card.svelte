<script lang="ts">
	export let type: string;
</script>

<div class={type}>
	<slot />
</div>

<style>
	.login {
		width: 465px;
		padding: 30px;
		letter-spacing: 0.9px;
		background-color: white;
	}
</style>
