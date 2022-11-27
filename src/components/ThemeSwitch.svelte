<script lang="ts">
	// @ts-nocheck
	import { browser } from '$app/env';
	import { Switch } from 'svelte-materialify';

	let darkMode = true;

	function handleSwitchDarkMode(): void {
		darkMode = !darkMode;

		localStorage.setItem('theme', darkMode ? 'dark' : 'light');

		darkMode
			? document.documentElement.classList.add('dark')
			: document.documentElement.classList.remove('dark');
	}

	if (browser) {
		if (
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			document.documentElement.classList.add('dark');
			darkMode = true;
		} else {
			document.documentElement.classList.remove('dark');
			darkMode = false;
		}
	}
</script>

<div class="flex col-span-2 items-center gap-3">
	<span class=" text-base-white dark:text-base-white">Dark Mode</span>
	<div on:click={handleSwitchDarkMode}>
		<Switch checked={darkMode} on:click={handleSwitchDarkMode} inset color="secondary" />
	</div>
</div>
