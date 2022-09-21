<script lang="ts">
	/* import module */
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
	<section class="bg-slate-200">
		<div class="font-sans min-h-screen antialiased pt-24 pb-5">
			<div class="flex flex-col justify-center sm:w-[465px] sm:m-auto mx-5 mb-5 space-y-8">
				<Card>
					<Title text="Sign In" />
					<Description text="Don't have an account?">
						<a href="#">Sign Up</a>
					</Description>
					<div class="py-2">
						<Login />
					</div>
				</Card>
			</div>
		</div>
	</section>
</section>
