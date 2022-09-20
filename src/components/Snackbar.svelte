<script lang="ts">
	import { Snackbar } from 'svelte-materialify';
	export let snackbar: boolean = false;
	export let type: string = '';
</script>

<Snackbar class={type} bind:active={snackbar} top center timeout={3000}>
	<slot />
	<!-- <div class="mt-1">
			<Button text class="success-text">Accept</Button>
			<Button
				class="red-text"
				text
				on:click={() => {
					snackbar = false;
				}}
			>
				Dismiss
			</Button>
		</div> -->
</Snackbar>
