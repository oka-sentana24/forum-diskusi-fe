<script lang="ts">
	// @ts-nocheck
	/* import module */
	import Login from './login.svelte';
	import Description from '$components/Description.svelte';
	import Card from '$components/Card.svelte';
	import Title from '$src/components/Title.svelte';
</script>

<section id="body">
	<header class="flex justify-center items-center w-full h-screen bg-root">
		<Card login>
			<div class="mb-5">
				<Title text="Masuk" />
				<Description text="Tidak punya akun?">
					<span>Hubungi administrator</span>
				</Description>
			</div>
			<Login />
		</Card>
	</header>
</section>
