<script lang="ts">
	import Login from './login.svelte';
	import { Card } from 'svelte-materialify';
	const rands = ['dark'];
	const randCls = rands[Math.floor(Math.random() * rands.length)];
</script>

<section id="body" class={randCls}>
	<header class="flex justify-center items-center w-full h-screen bg-slate-900">
		<Card class="bg-green-100 w-[465px]">
			<div class="p-[20px]">
				<div class="mb-4">
					<h1 class="text-2xl font-bold py-2">
						Sign In
					</h1>
					<span class="text-sm">
						Dont have an account? <span class="text-blue-400">Contact administrator</span>
					</span>
				</div>
				<Login />
			</div>
		</Card>
	</header>
</section>
