<script lang="ts">
	import Sidebar from './../../components/Sidebar.svelte';
	import { Menu } from './../../constant';
	import Sidebar from '$components/Sidebar.svelte';
	import '../../app.css';
	import { isDark, isSideMenuOpen, closeSideMenu } from '$stores/menus';
	import { clickOutside } from '$lib/ioevents/click';
	import { keydownEscape } from '$lib/ioevents/keydown';
	import { fly } from 'svelte/transition';
	import { Avatar, Icon } from 'svelte-materialify';
	import { mdiWindowClose } from '@mdi/js';
	import { browser } from '$app/env';
	// import SidebarMini from '$components/Sidebar-mini.svelte';
	import {
		isNotificationsMenuOpen,
		isProfileMenuOpen,
		toggleTheme,
		toggleSideMenu,
		toggleNotificationsMenu,
		toggleProfileMenu,
		closeNotificationsMenu,
		closeProfileMenu
	} from '$stores/menus';

	if (browser && localStorage.theme === 'dark') {
		isDark.update((v) => true);
	} else {
		isDark.update((v) => false);
	}

	let items = Menu;
	let openSetting = false;

	console.log('return', openSetting);
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
	<div class="h-screen w-screen flex bg-gray-50 dark:bg-slate-800">
		<!-- <div class:overflow-hidden={$isSideMenuOpen}> -->
		<aside class="z-20 hidden overflow-y-auto md:block flex-shrink-0 relative">
			<Sidebar item={items} />
		</aside>
		<!-- </div> -->
		{#if $isSideMenuOpen}
			<aside
				class="fixed inset-y-0 z-20 flex-shrink-0"
				use:clickOutside={['nav-mobile-hamburger']}
				use:keydownEscape
				on:keydown-escape={closeSideMenu}
				transition:fly={{ x: -200, duration: 2000 }}
			>
				<Sidebar item={items} />
			</aside>
		{/if}
		<div class="w-full">
			<slot />
		</div>
	</div>
</main>
