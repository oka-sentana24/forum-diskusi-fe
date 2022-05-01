<script lang="ts">
  import loginOffice from '$lib/templates/Admin/Images/login-office.jpeg'
  import loginOfficeDark from '$lib/templates/Admin/Images/brands.svg'
  import '$sass/tailwind.scss';
	import { TextField, Button, Icon, Checkbox } from 'svelte-materialify';
	import { mdiEyeOff, mdiEye } from '@mdi/js';
  import jwt_decode from "jwt-decode";

  const rands = ['dark']
  const randCls = rands[Math.floor(Math.random() * rands.length)]
	let show = false;
	let group = ['2'];
	let username = '';
  let password = '';
  let isLoading = false;
  $: value = '';
	let error = null;
  

	const requiredRules = [(v) => !!v || 'Required'];
	const usernameRules = [
		(v) => !!v || 'Required',
		(v) => v.length <= 10 || 'Max 10 characters',
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
      });

      if ( response.status === 200) {
        let body = await response.json();

        var decoded: any = jwt_decode(body.token);
        isLoading = true;

          if(decoded.role === 'USER'){
            window.location.href="/landing";
          }else if(decoded.role === 'ADMIN'){
            window.location.href="/admin";
          }else{
            console.log("no user")
          }
      }
      // what do you do with a non-redirect?

    }
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
              <h1 class=" text-2xl font-semibold text-gray-700 dark:text-gray-200 leading-10">Login</h1>
              <span>Don't have an account? <a href="#" class="text-blue-400">Sign Up</a></span>
            </div>
            <!-- login-form -->
						<form>
							<div class=" mb-7">
								<TextField filled class="main-input" rules={usernameRules} {requiredRules} bind:value={username} bind:error>Username</TextField>
							</div>
							<div class=" mb-4">
								<TextField filled class="main-input" type={show ? 'text' : 'password'} {requiredRules} bind:value={password} bind:error>
									Password
									<div
										slot="append"
										on:click={() => {
											show = !show;
										}}
                    class="text-blue-600"
									>
										<Icon path={show ? mdiEyeOff : mdiEye} />
									</div>
								</TextField>
							</div>
							<p class="mb-4 text-sm">
								<a
									class="text-sm font-medium  dark:text-blue-400 hover:underline"
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
							<div on:click={()=>handleSubmit()} class="cursor-pointer">
								<Button class="white white-text w-full h-[5vh] text-sm dark:text-green-100" disabled={!value || error}>
                  {#if isLoading}
                  loading...
                  {:else}
                   Login
                  {/if}
                </Button>
							</div>
						</form>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
