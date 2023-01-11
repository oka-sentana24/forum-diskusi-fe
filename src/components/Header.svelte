<script lang="ts">
	// @ts-nocheck
	import '../theme/_material-theme.scss';
	import Card from '$components/Card.svelte';
	import BurgerMenu from './Hamburger.svelte';
	import { Breadcrumbs, Icon, Button } from 'svelte-materialify';
	import { mdiAccountCircleOutline, mdiChevronDown, mdiChevronUp } from '@mdi/js';
	import ThemeSwitch from '$components/ThemeSwitch.svelte';
	import NavLink from './NavLink.svelte';
	let isProfileOpen: boolean;
	export let items;
</script>

<Card header>
	<div class="flex col-span-2 items-center justify-between relative bottom-2">
		<div class=" flex gap-5 col-span-2 items-center justify-start">
			<div class="md:hidden">
				<!-- Burger Menu -->
				<BurgerMenu />
			</div>
			<div>
				<!-- Breadcrumb -->
				<Breadcrumbs {items} let:item large class="py-2 px-0">
					{#if item.href}
						<NavLink class="s-breadcrumb-item" href={item.href}>
							<span class="text-light-text-title dark:text-dark-text-title">
								{item.text}
							</span>
						</NavLink>
					{/if}
				</Breadcrumbs>
			</div>
		</div>
		<div class="col-span-2">
			<!-- Profile Avatar -->
			<div
				class="col-span-2 items-center justify-start cursor-pointer text-light-text-title dark:text-dark-text-title"
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
		<div class="flex justify-end pt-5 relative z-20 cursor-pointer">
			<Card profile>
				<div class="grid text-left pb-5 text-light-text-body_2 dark:text-dark-text-body_2">
					<span class="text-lg text-bold">Acme Inc.</span>
					<span class="text-xs">User</span>
				</div>
				<div class="grid text-left pb-5 text-light-text-body_2 dark:text-dark-text-body_2">
					<ThemeSwitch />
				</div>
				<div class="grid text-left pb-5 text-light-text-body_2 dark:text-dark-text-body_2">
					<span>Pengaturan</span>
				</div>
				<div class="grid text-left pb-5 text-light-text-body_2 dark:text-dark-text-body_2">
					<!-- <span>Keluar</span> -->
					<Button size="large" class=" bg-link-primary white-textshadow-none"
						><span class="normal-case text-base-white">Keluar</span></Button
					>
				</div>
			</Card>
		</div>
	{/if}
</Card>
