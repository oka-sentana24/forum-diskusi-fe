<script>
	import Loader from '$lib/components/loader.svelte';
	import { ProgressCircular } from 'svelte-materialify';
</script>

<Loader this={() => import('./index.svelte')}>
	<div slot="fallback">
		<div class="flex justify-center items-center w-full h-screen bg-transparent">
			<ProgressCircular size={70} width={7} indeterminate color="success" />
		</div>
	</div>
</Loader>
