<script lang="ts">
	// @ts-nocheck
	/* import library */
	import Card from '$components/Card.svelte';
	import ThemeSwitch from '$components/ThemeSwitch.svelte';
	import '../../theme/_material-theme.scss';
	import Logo from '$lib/images/brands.svg';
	import Login from './login.svelte';
</script>

<!-- main layout login -->
<main>
	<!-- create header -->
	<div class="px-5 py-2 bg-base-black">
		<div class="flex col-span-2 items-center justify-between">
			<div class="flex col-span-2 items-center gap-3">
				<img src={Logo} alt="logo" class="w-10" />
				<span class="text-lg font-bold text-base-white">SMK NEGERI 1 GIANYAR</span>
			</div>
			<ThemeSwitch />
		</div>
	</div>

	<!-- create content -->
	<div class="flex px-5 col-span-1 items-center justify-center h-[93vh] w-full">
		<Card login>
			<Login />
		</Card>
	</div>
</main>
