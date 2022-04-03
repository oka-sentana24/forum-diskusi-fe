<script lang="ts">
	import '$sass/tailwind.scss';
	import loginOffice from '$lib/templates/Admin/Images/login-office.jpeg';
	import { TextField, Button, Icon, Checkbox } from 'svelte-materialify';
	import { mdiEyeOff, mdiEye } from '@mdi/js';

	let show = false;

	let json = { username: '', password: '', email: '' };

	function submitHandler() {
		console.log('logged in with', json);
	}
	let group = ['2'];

	const titleRules = [(v) => !!v || 'Required'];
	const emailRules = [
		(v) => !!v || 'Required',
		(v) => v.length <= 25 || 'Max 25 characters',
		(v) => {
			const pattern =
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return pattern.test(v) || 'Invalid e-mail.';
		}
	];
</script>

<section id="body">
	<div class="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
		<div
			class="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800"
		>
			<div class="flex flex-col overflow-y-auto md:flex-row">
				<div class="h-32 md:h-auto md:w-1/2">
					<img
						aria-hidden="true"
						class="object-cover w-full h-full dark:hidden"
						src={loginOffice}
						alt="Office"
					/>
				</div>
				<div class="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
					<div class="w-full">
						<h1 class="mb-4 text-xl font-semibold text-teal-500 dark:text-gray-200">Login</h1>
						<!-- login-form -->
						<form action="" />
						<div class=" mb-7">
							<TextField filled class="main-input" rules={emailRules}>Username</TextField>
						</div>
						<div class=" mb-4">
							<TextField filled class="main-input" type={show ? 'text' : 'password'}>
								Password
								<div
									slot="append"
									on:click={() => {
										show = !show;
									}}
									class="text-teal-900"
								>
									<Icon path={show ? mdiEyeOff : mdiEye} />
								</div>
							</TextField>
						</div>
						<p class="mb-4">
							<a
								class="text-sm font-medium text-teal-900 dark:text-purple-400 hover:underline"
								href="./forgot-password.svelte"
							>
								Forgot your password?
							</a>
						</p>
						<div class="mb-7 text-teal-900">
							<Checkbox bind:group value="1" type="password" name="password" autocomplete="off"
								><span class="text-sm">Remember me</span></Checkbox
							>
						</div>
						<div>
							<Button class="blue white-text w-full h-[5vh] bg-teal-500 text-sm">Login</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
