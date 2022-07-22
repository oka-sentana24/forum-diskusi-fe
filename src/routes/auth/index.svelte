<script lang="ts">
	import Login from './login.svelte';
	import { Card } from 'svelte-materialify';
	const rands = [''];
	const randCls = rands[Math.floor(Math.random() * rands.length)];
</script>

<section id="body" class={randCls}>
	<header class="flex justify-center items-center w-full h-screen bg-slate-300">
		<Card class="rounded-lg shadow-2xl w-[465px] shadow-xs mx-5">
			<div class="p-5 bg-white">
				<div class="mb-2">
					<h1 class="text-2xl font-bold py-2 text-gray-700">Sign In</h1>
					<span class="text-gray-500">
						Dont have an account? <span class="text-teal-500">Contact administrator</span>
					</span>
				</div>
				<Login />
			</div>
		</Card>
	</header>
</section>