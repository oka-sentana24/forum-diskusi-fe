<script lang="ts">
	// @ts-nocheck
	import Login from './login.svelte';
	import Description from '$components/Description.svelte';
	import Card from '$components/Card.svelte';
	import Title from '$src/components/Title.svelte';

	const rands = [''];
	const randCls = rands[Math.floor(Math.random() * rands.length)];
	let invalidTaxId = false;
	let exoticTaxId = '';
</script>

<section id="body" class={randCls}>
	<header class="flex justify-center items-center w-full h-screen bg-slate-300">
		<Card login>
			<div class="mb-2">
				<Title text="Sign in" />
				<Description text="Dont have an account?">
					<span>Contact administrator</span>
				</Description>
			</div>
			<Login />
		</Card>
	</header>
</section>
