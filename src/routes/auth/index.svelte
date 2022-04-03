<script lang="ts">
	import '$sass/tailwind.scss';
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
	const rands = ['dark'];
	const randCls = rands[Math.floor(Math.random() * rands.length)];
</script>

<section id="body" class={randCls}>
	<div class="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-green-1001">
		<div
			class="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-green-100"
		>
			<div class="flex flex-col overflow-y-auto md:flex-row">
				<div class="h-32 md:h-auto md:w-1/2 flex items-center justify-center">
					<!-- <div class="relative w-[200] h-[200]"> -->
					<img
						aria-hidden="false"
						class="object-cover w-[100px] h-[100px] md:w-[200px] md:h-[200px]"
						src="../../../static/images/brands.svg"
						alt="Office"
					/>
					<!-- </div> -->
				</div>
				<div class="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
					<div class="w-full">
						<h1 class="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Login</h1>
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
								>
									<Icon path={show ? mdiEyeOff : mdiEye} />
								</div>
							</TextField>
						</div>
						<p class="mb-4 text-sm">
							<a
								class="text-sm font-medium  dark:text-blue-100 hover:underline"
								href="./forgot-password.svelte"
							>
								Forgot your password?
							</a>
						</p>
						<div class="mb-7 text-sm ">
							<Checkbox bind:group value="1" type="password" name="password" autocomplete="off"
								>Remember me</Checkbox
							>
						</div>
						<div>
							<Button class="white white-text w-full h-[5vh] text-sm text-green-1001">Login</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
