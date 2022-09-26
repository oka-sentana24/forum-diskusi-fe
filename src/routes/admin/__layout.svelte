<script lang="ts">
	import SideBar from '$components/Sidebar.svelte';
	import { Menu } from './../../constant';
	import MiniSide from '$components/MiniSide.svelte';
	import '../../app.css';
	import { isDark, isSideMenuOpen, closeSideMenu } from '$stores/menus';
	import { clickOutside } from '$lib/ioevents/click';
	import { keydownEscape } from '$lib/ioevents/keydown';
	import { fly } from 'svelte/transition';
	import { Avatar, Icon } from 'svelte-materialify';
	import { mdiWindowClose } from '@mdi/js';
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
		<!-- <aside class="z-20 hidden overflow-y-auto md:block flex-shrink-0 relative"> -->
		<div class="flex ">
			<MiniSide item={items} />
			<SideBar item={items} />
		</div>
		<!-- </aside> -->
		<!-- {#if $isSideMenuOpen}
			<aside
				class="fixed inset-y-0 z-20 flex-shrink-0"
				use:clickOutside={['nav-mobile-hamburger']}
				use:keydownEscape
				on:keydown-escape={closeSideMenu}
				transition:fly={{ x: -200, duration: 2000 }}
			>
				<div class="flex flex-cols-2">
					<Sidebar>
						<ul class="mt-5 ml-0 pl-0">
							{#each sideMenu as item}
								<div
									class="px-5 py-3 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
								>
									<a href={item.url} on:click={closeSideMenu}>
										<div class="flex flex-cols-2 items-center gap-5">
											<Icon path={item.svg} />
											<span>{item.name}</span>
										</div>
									</a>
								</div>
							{/each}
						</ul>
					</Sidebar>
					<div class="h-16 absolute left-[243px] flex items-center">
						<div on:click={closeSideMenu}>
							<Avatar size="25px" class="bg-black text-white border border-gray-300"
								><Icon path={mdiWindowClose} size="5px" /></Avatar
							>
						</div>
					</div>
				</div>
			</aside>
		{/if} -->
		<div class="w-full">
			<slot />
		</div>
	</div>
</main>
