<script lang="ts">
	import Login from './login.svelte';
	import { Card } from 'svelte-materialify';
	const rands = [''];
	const randCls = rands[Math.floor(Math.random() * rands.length)];
</script>

<section id="body" class={randCls}>
	<header class="flex justify-center items-center w-full h-screen bg-gray-50 dark:bg-gray-900">
		<Card class="bg-white rounded-lg shadow-xl dark:bg-gray-800 w-[465px] shadow-xs">
			<div class="p-[20px]">
				<div class="mb-4">
					<h1 class="text-2xl font-bold py-2 text-gray-700">
						Sign In
					</h1>
					<span class="text-sm text-gray-500">
						Dont have an account? <span class=" text-purple-600">Contact administrator</span>
					</span>
				</div>
				<Login />
			</div>
		</Card>
	</header>
</section>