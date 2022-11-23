<script>
	// @ts-nocheck
	import Loader from '$components/Loader.svelte';
	import { ProgressCircular } from 'svelte-materialify';
	import Brands from '$lib/images/brands.svg';
	import '../../app.css';
</script>

<Loader this={() => import('./index.svelte')}>
	<div slot="fallback">
		<div class="flex justify-center items-center w-full h-screen bg-root">
			<div class="flex flex-col justify-center items-center gap-10">
				<span>
					<img src={Brands} alt="brands" class="w-[100px] h-[100px]" />
				</span>
				<span>
					<ProgressCircular size={30} width={3} indeterminate color="success" />
				</span>
			</div>
		</div>
	</div>
</Loader>
