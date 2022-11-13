<script lang="ts">
	// @ts-nocheck
	import { TextField } from 'svelte-materialify';
	import { Icon } from 'svelte-materialify';
	import '../style/tailwind.scss';
	export let label: string;
	export let validation: boolean;
	export let value: string;
	export let error: boolean;
	export let type: string;
	export let icon: boolean;
	export let click: boolean;
</script>

<div class="main">
	<TextField filled bind:value rules={validation} bind:error {type}>
		{label}
		<div on:click={click}>
			<Icon path={icon} />
		</div>
	</TextField>
</div>
