<script lang="ts">
  import loginOffice from '$lib/templates/Admin/Images/login-office.jpeg'
  import loginOfficeDark from '$lib/templates/Admin/Images/login-office-dark.jpeg'
  import '$sass/tailwind.scss';
	import { TextField, Button, Icon, Checkbox } from 'svelte-materialify';
	import { mdiEyeOff, mdiEye } from '@mdi/js';

  const rands = ['dark']
  const randCls = rands[Math.floor(Math.random() * rands.length)]
	let show = false;
	let group = ['2'];
	let username = '';
      let password = '';
	let role : 'user' | "admin";

	const titleRules = [(v) => !!v || 'Required'];
	const emailRules = [
		(v) => !!v || 'Required',
		(v) => v.length <= 25 || 'Max 25 characters',
		(v) => {
			const pattern =
				/^[0-9]*$/;
			return pattern.test(v) || 'Invalid Username.';
		}
	];
	async function handleSubmit() {
      const response = await fetch('http://localhost:3001/signin',{
          method: 'POST',
          credentials: 'same-origin',
          body: JSON.stringify({ username, password }),
          headers: {
              'Content-Type': 'application/json'
          }
      })
      .then( response => {
        if ( response.status === 200) {
            // if(role === 'user'){
              window.location.href="/admin";
            // }else if(role === 'admin'){
            //   window.location.href="/landing";
            // }else{
            //   console.log("no user")
            // }
        }
        // what do you do with a non-redirect?
        }).catch((err) => {
        console.log(err);
      });
    }
</script>

<section id="body" class={randCls}>
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
          <img
            aria-hidden="true"
            class="hidden object-cover w-full h-full dark:block"
            src={loginOfficeDark}
            alt="Office"
          />
        </div>
        <div class="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
          <div class="w-full">
            <h1 class="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Login</h1>
            <!-- login-form -->
						<form>
							<div class=" mb-7">
								<TextField filled class="main-input" rules={emailRules} {titleRules} bind:value={username}>Username</TextField>
							</div>
							<div class=" mb-4">
								<TextField filled class="main-input" type={show ? 'text' : 'password'} {titleRules} bind:value={password}>
									Password
									<div
										slot="append"
										on:click={() => {
											show = !show;
										}}
                    class="text-white"
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
							<div on:click={()=>handleSubmit()}>
								<Button class="white white-text w-full h-[5vh] text-sm dark:text-green-1001">Login</Button>
							</div>
						</form>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
