<script lang="ts">
	/* import module */
	import Login from './login.svelte';
	import Card from '@smui/card';

	const rands = [''];
	const randCls = rands[Math.floor(Math.random() * rands.length)];
</script>

<section id="body" class={randCls}>
	<header class="flex justify-center items-center w-full h-screen bg-slate-300">
		<Card class="w-[460px] max-h-[414px] rounded-none">
			<div class="p-5">
				<div class="mb-2">
					<h1 class="text-2xl font-bold leading-9 text-slate-500">Sign In</h1>
					<span class="text-xs font-normal leading-5">
						Dont have an account? <span class="text-teal-400">Contact administrator</span>
					</span>
				</div>
				<Login />
			</div>
		</Card>
	</header>
</section>
