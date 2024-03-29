<script lang="ts">
	import Sidebar from '$components/Sidebar.svelte';
	import '../../app.css';
	import { isDark, isSideMenuOpen, closeSideMenu } from '$stores/menus';
	import { clickOutside } from '$lib/ioevents/click';
	import { keydownEscape } from '$lib/ioevents/keydown';
	import { fly } from 'svelte/transition';
	import { Avatar, Divider, Icon, ListItem, Badge } from 'svelte-materialify';
	import { mdiPlus, mdiWindowClose, mdiChevronDown, mdiChevronRight } from '@mdi/js';
	import { browser } from '$app/env';
	import { user } from '$lib/mokeData/users';

	import Header from '$components/Header.svelte';
	import { room } from '$src/lib/mokeData/room';

	if (browser && localStorage.theme === 'dark') {
		isDark.update((v) => true);
	} else {
		isDark.update((v) => false);
	}

	let users = user;
	let rooms = room;
	let data = [{ text: 'Chat', href: '#' }];
	let isUserChat = true;
	let isGlobalChat = true;
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
		class="flex h-screen bg-slate-100 overflow-hidden dark:bg-gray-900"
		class:overflow-hidden={$isSideMenuOpen}
	>
		<aside class="z-20 hidden md:block flex-shrink-0 relative">
			<Sidebar>
				<div>
					<div class="px-2 py-4">
						<div
							class="flex items-center justify-between"
							on:click={() => (isUserChat = !isUserChat)}
						>
							<div class="flex items-center justify-start gap-2">
								{#if isUserChat}
									<Icon path={mdiChevronDown} size="20px" />
								{:else}
									<Icon path={mdiChevronRight} size="20px" />
								{/if}

								<span>Chat</span>
							</div>
							<Icon path={mdiPlus} size="20px" />
						</div>
					</div>
					{#if isUserChat}
						<div
							class="h-[300px] overflow-auto scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-thin scrollbar-thumb-rounded-full dark:bg-gray-800"
						>
							{#each users as data}
								<div class="flex items-center justify-between px-5">
									<ListItem>
										<span slot="prepend" class="ml-n2">
											<Avatar size={40}><img src="//picsum.photos/200" alt="profile" /></Avatar>
										</span>
										{data.nama}
									</ListItem>
									<Badge class="primary-color" dot offsetX={15} offsetY={4} />
								</div>
							{/each}
						</div>
					{/if}
				</div>
				<Divider />
				<div>
					<div class="px-2 py-4">
						<div
							class="flex items-center justify-between"
							on:click={() => (isGlobalChat = !isGlobalChat)}
						>
							<div class="flex items-center justify-start gap-2">
								{#if isGlobalChat}
									<Icon path={mdiChevronDown} size="20px" />
								{:else}
									<Icon path={mdiChevronRight} size="20px" />
								{/if}

								<span>Room</span>
							</div>
							<Icon path={mdiPlus} size="20px" />
						</div>
					</div>
					{#if isGlobalChat}
						<div
							class="h-[500px] overflow-auto scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-thin scrollbar-thumb-rounded-full dark:bg-gray-800"
						>
							{#each rooms as dataRoom}
								<div class="flex items-center justify-between px-5">
									<ListItem>
										<span slot="prepend" class="ml-n2">
											<Avatar size={40}><img src="//picsum.photos/200" alt="profile" /></Avatar>
										</span>
										{dataRoom.nama}
									</ListItem>
									<Badge class="primary-color" dot offsetX={15} offsetY={4} />
								</div>
							{/each}
						</div>
					{/if}
				</div>
			</Sidebar>
		</aside>
		{#if $isSideMenuOpen}
			<aside
				class="fixed inset-y-0 z-20 flex-shrink-0"
				use:clickOutside={['nav-mobile-hamburger']}
				use:keydownEscape
				on:keydown-escape={closeSideMenu}
				transition:fly={{ x: -200, duration: 2000 }}
			>
				<div class="flex flex-cols-2">
					<Sidebar>
						<div>
							<div class="px-2 py-4">
								<div
									class="flex items-center justify-between"
									on:click={() => (isUserChat = !isUserChat)}
								>
									<div class="flex items-center justify-start gap-2">
										{#if isUserChat}
											<Icon path={mdiChevronDown} size="20px" />
										{:else}
											<Icon path={mdiChevronRight} size="20px" />
										{/if}

										<span>Chat</span>
									</div>
									<Icon path={mdiPlus} size="20px" />
								</div>
							</div>
							{#if isUserChat}
								<div
									class="h-[300px] overflow-auto scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-thin scrollbar-thumb-rounded-full dark:bg-gray-800"
								>
									{#each users as data}
										<div class="flex items-center justify-between px-5">
											<ListItem>
												<span slot="prepend" class="ml-n2">
													<Avatar size={40}><img src="//picsum.photos/200" alt="profile" /></Avatar>
												</span>
												{data.nama}
											</ListItem>
											<Badge class="primary-color" dot offsetX={15} offsetY={4} />
										</div>
									{/each}
								</div>
							{/if}
						</div>
						<Divider />
						<div>
							<div class="px-2 py-4">
								<div
									class="flex items-center justify-between"
									on:click={() => (isGlobalChat = !isGlobalChat)}
								>
									<div class="flex items-center justify-start gap-2">
										{#if isGlobalChat}
											<Icon path={mdiChevronDown} size="20px" />
										{:else}
											<Icon path={mdiChevronRight} size="20px" />
										{/if}

										<span>Room</span>
									</div>
									<Icon path={mdiPlus} size="20px" />
								</div>
							</div>
							{#if isGlobalChat}
								<div
									class="h-[500px] overflow-auto scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-thin scrollbar-thumb-rounded-full dark:bg-gray-800"
								>
									{#each rooms as dataRoom}
										<div class="flex items-center justify-between px-5">
											<ListItem>
												<span slot="prepend" class="ml-n2">
													<Avatar size={40}><img src="//picsum.photos/200" alt="profile" /></Avatar>
												</span>
												{dataRoom.nama}
											</ListItem>
											<Badge class="primary-color" dot offsetX={15} offsetY={4} />
										</div>
									{/each}
								</div>
							{/if}
						</div>
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
		{/if}
		<div class="w-full">
			<Header items={data} />
			<slot />
		</div>
	</div>
</main>
