<script lang="ts">
	import BurgerMenu from './Hamburger.svelte';
	import { Avatar, Breadcrumbs, Card, List, ListGroup, ListItem, Icon } from 'svelte-materialify';
	import {
		isDark,
		isNotificationsMenuOpen,
		isProfileMenuOpen,
		toggleTheme,
		toggleSideMenu,
		toggleNotificationsMenu,
		toggleProfileMenu,
		closeNotificationsMenu,
		closeProfileMenu
	} from '$stores/menus';
	import { clickOutside } from '$lib/ioevents/click';
	import { keydownEscape } from '$lib/ioevents/keydown';
	import { fly } from 'svelte/transition';
	import { mdiHome, mdiCog, mdiChevronUp, mdiLogout } from '@mdi/js';

	export let items;
	let active = false;
</script>

<header
	class="absolute w-full md:w-[85%] z-50 md:py-3 bg-white border-b border-gray-300 dark:bg-gray-800 dark:border-b dark:border-gray-600"
>
	<div class="flex flex-cols-2 items-center justify-between">
		<div class="w-[50%] flex flex-cols-2 items-center">
			<!-- Mobile Burger -->
			<div class="p-5 md:hidden">
				<BurgerMenu />
			</div>

			<!-- Breadcrumbs -->
			<div class="px-5">
				<Breadcrumbs {items} let:item class="py-2 px-0">
					{#if item.href}
						<a
							class="s-breadcrumb-item text-base text-gray-800 font-bold dark:text-white"
							href={item.href}
							class:disabled={item.disabled}
						>
							{item.text}
						</a>
					{/if}
				</Breadcrumbs>
			</div>
		</div>
		<div class="w-[50%] flex flex-cols-3 items-center justify-end pr-5">
			<!-- profile -->
			<button
				id="nav-profile-photo"
				class="align-middle rounded-full focus:shadow-outline-purple focus:outline-none"
				on:click={toggleProfileMenu}
				use:keydownEscape
				on:keydown-escape={closeProfileMenu}
				aria-label="Account"
				aria-haspopup="true"
			>
				<List>
					<div class="flex gap-3 items-center">
						<Avatar size="36px"><img src="//picsum.photos/100?random=1" alt="Avatar" /></Avatar>
						<span>John Doe</span>
					</div>
				</List>
			</button>
			{#if $isProfileMenuOpen}
				<div
					use:clickOutside={['nav-profile-photo']}
					on:click-outside={closeProfileMenu}
					use:keydownEscape
					on:keydown-escape={closeProfileMenu}
					aria-label="submenu"
				>
					<div class="absolute right-5 top-[83px]" transition:fly={{ y: -10, duration: 500 }}>
						<Card class="bg-white shadow-lg">
							<List class="text-gray-600" style="width:350px">
								<ListItem>
									<span slot="prepend">
										<Icon path={mdiHome} />
									</span>
									Profile
								</ListItem>
								<ListGroup bind:active offset={72} class="text-gray-600">
									<span slot="prepend">
										<Icon path={mdiCog} />
									</span>
									<span slot="activator">Settings </span>
									<span slot="append">
										<Icon path={mdiChevronUp} rotate={active ? 0 : 180} />
									</span>
									<ListItem>
										<div
											class="flex flex-cols-2 gap-5 items-center justify-between"
											on:click={toggleTheme}
										>
											<span> mode</span>
											<button
												class="rounded-md focus:outline-none focus:shadow-outline-purple"
												aria-label="Toggle color mode"
											>
												{#if $isDark}
													<svg
														class="w-5 h-5"
														aria-hidden="true"
														fill="currentColor"
														viewBox="0 0 20 20"
													>
														<path
															fill-rule="evenodd"
															clip-rule="evenodd"
															d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
														/>
													</svg>
												{:else}
													<svg
														class="w-5 h-5"
														aria-hidden="true"
														fill="currentColor"
														viewBox="0 0 20 20"
													>
														<path
															d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
														/>
													</svg>
												{/if}
											</button>
										</div>
									</ListItem>
								</ListGroup>
								<ListItem>
									<span slot="prepend">
										<Icon path={mdiLogout} />
									</span>
									<a href="/auth"> SignOut </a>
								</ListItem>
							</List>
						</Card>
					</div>
				</div>
			{/if}
		</div>
	</div>
</header>
