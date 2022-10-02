<script lang="ts">
	// @ts-nocheck
	import SideBar from '$components/Sidebar.svelte';
	import { Menu } from './../../constant';
	import '../../app.css';
	import { isDark, isSideMenuOpen, closeSideMenu } from '$stores/menus';
	import { clickOutside } from '$lib/ioevents/click';
	import { keydownEscape } from '$lib/ioevents/keydown';
	import { fly } from 'svelte/transition';
	import { browser } from '$app/env';

	if (browser && localStorage.theme === 'dark') {
		isDark.update((v) => true);
	} else {
		isDark.update((v) => false);
	}

	let items = Menu;
</script>

<svelte:head>
	<script>
		if (
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			document.documentElement.classList.add('dark');
			localStorage.theme = 'dark';
		} else {
			document.documentElement.classList.remove('dark');
		}
	</script>
</svelte:head>

<main id="body">
	<div
		class="flex h-screen bg-slate-100 overflow-hidden dark:bg-black"
		class:overflow-hidden={$isSideMenuOpen}
	>
		<aside class="z-20 hidden overflow-y-auto md:block flex-shrink-0 relative">
			<SideBar item={items} back click />
		</aside>
		{#if $isSideMenuOpen}
			<aside
				class="fixed inset-y-0 z-20 flex-shrink-0"
				use:clickOutside={['nav-mobile-hamburger']}
				use:keydownEscape
				on:keydown-escape={closeSideMenu}
				transition:fly={{ x: -200, duration: 2000 }}
			>
				<SideBar item={items} back={closeSideMenu} click={closeSideMenu} />
			</aside>
		{/if}
		<div class="w-full">
			<slot />
		</div>
	</div>
</main>
