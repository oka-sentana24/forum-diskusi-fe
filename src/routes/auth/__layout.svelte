<!-- <script lang="ts">
  import '$lib/tailwind.css'
</script>

<slot /> -->

<script>
	import Loader from '$src/lib/components/loader.svelte';
	import { ProgressCircular } from 'svelte-materialify';
  import Brands from "$src/lib/images/brands.svg"
</script>

<Loader this={() => import('./index.svelte')}>
	<div slot="fallback">
		<div class="flex justify-center items-center w-full h-screen bg-slate-900">
      <div class="flex flex-col justify-center items-center gap-10">
        <span>
          <img src={Brands} alt="brands" class="w-[100px] h-[100px]">
        </span>
        <span>
          <ProgressCircular size={30} width={3} indeterminate color="success" />
        </span>
      </div>
      </div>
	</div>
</Loader>
