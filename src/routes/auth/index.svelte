<script lang="ts">
	import loginOffice from '$lib/templates/Admin/Images/login-office.jpeg';
	import loginOfficeDark from '$lib/templates/Admin/Images/brands.svg';
	import Login from './login.svelte';
	const rands = ['dark'];
	const randCls = rands[Math.floor(Math.random() * rands.length)];
</script>

<section id="body" class={randCls}>
	<div class="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-blue-900">
		<div
			class="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-none shadow-xl dark:bg-blue-800"
		>
			<div class="flex flex-col overflow-y-auto md:flex-row">
				<div class="h-32 md:h-auto md:w-1/2 md:p-10">
					<img
						aria-hidden="true"
						class="object-cover w-full h-full dark:hidden"
						src={loginOffice}
						alt="Office"
					/>
					<img
						aria-hidden="true"
						class="hidden object-cover w-full h-full dark:block"
						src={loginOfficeDark}
						alt="Office"
					/>
				</div>
				<div class="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
					<div class="w-full">
						<div class="mb-4">
							<h1 class=" text-2xl font-semibold text-gray-700 dark:text-gray-200 leading-10">
								Login
							</h1>
							<span
								>Don't have an account?
								<a href="#" class="text-blue-400">contact administrator</a>
							</span>
						</div>
						<Login />
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
