<script lang="ts">
	// @ts-nocheck
	import '../style/tailwind.scss';
	import BurgerMenu from './Hamburger.svelte';
	import Card from './Card.svelte';
	import { Breadcrumbs, Icon } from 'svelte-materialify';
	import { mdiAccountCircleOutline, mdiChevronDown, mdiChevronUp } from '@mdi/js';
	import { get } from 'svelte/store';
	let isProfileOpen: boolean;
	export let items;
</script>

<Card header>
	<div class="flex col-span-2 items-center justify-between h-16 px-5">
		<div class=" flex gap-5 col-span-2 items-center justify-start">
			<div class="md:hidden">
				<!-- Burger Menu -->
				<BurgerMenu />
			</div>
			<div>
				<!-- Breadcrumb -->
				<Breadcrumbs {items} let:item large class="py-2 px-0 text-white">
					{#if item.href}
						<a class="s-breadcrumb-item" href={item.href} class:disabled={item.disabled}>
							<span class="text-white">
								{item.text}
							</span>
						</a>
					{/if}
				</Breadcrumbs>
			</div>
		</div>
		<div class="col-span-2">
			<!-- Profile Avatar -->
			<div
				class="col-span-2 items-center justify-start cursor-pointer"
				on:click={() => (isProfileOpen = !isProfileOpen)}
			>
				<Icon path={mdiAccountCircleOutline} size={32} />
				<span class=" col-span-2">
					Acme Inc
					<Icon path={isProfileOpen ? mdiChevronUp : mdiChevronDown} size={20} />
				</span>
			</div>
		</div>
	</div>
	{#if isProfileOpen}
		<div class="flex justify-end px-5 pt-2 relative z-20 cursor-pointer">
			<Card profile>
				<div class="grid border-b border-slate-200">
					<span class="text-bold text-slate-800 text-base">Acme Inc.</span>
					<span class="text-sm pb-2 italic">User</span>
				</div>
				<div class="grid py-2">
					<span class="text-bold text-white leading-5 py-2">Pengaturan</span>
					<span class="text-bold text-teal-800 text-base">
						<a href="/"> Keluar </a>
					</span>
				</div>
			</Card>
		</div>
	{/if}
	<!-- <div class="h-[40px] flex items-center justify-between p-5">
		<div class="flex flex-cols-2 items-center justify-center gap-5">
			<div >
				<BurgerMenu />
			</div>
			<div>
				<Breadcrumbs {items} let:item class="py-2 px-0">
					{#if item.href}
						<a class="s-breadcrumb-item" href={item.href} class:disabled={item.disabled}>
							<span class="text-gray-400">
								{item.text}
							</span>
						</a>
					{/if}
				</Breadcrumbs>
			</div>
		</div>
		<div>
			<button
				id="nav-profile-photo"
				class="align-middle rounded-full focus:shadow-outline-purple focus:outline-none"
				on:click={toggleProfileMenu}
				use:keydownEscape
				on:keydown-escape={closeProfileMenu}
				aria-label="Account"
				aria-haspopup="true"
			>
				<List class="p-0">
					<div class="flex gap-3 items-center">
						<Icon path={mdiAccountCircleOutline} />
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
					<div class="absolute right-5 top-[40px] z-10" transition:fly={{ y: -10, duration: 500 }}>
						<Card style="background:white">
							<List class="text-gray-600" style="width:200px">
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
	</div> -->

	<div class="text-4xl px-5 text-gray-600 dark:text-white font-bold py-2"><slot /></div>
</Card>
