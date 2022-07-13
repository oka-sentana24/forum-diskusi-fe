<script lang="ts">
	import { closeSideMenu, pageMenus, togglePageMenu, toggleSideMenu } from '$stores/menus';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import brands from '$lib/images/brands.svg';
	import { Menu } from '../../menu-sidebar';

	const appName = import.meta.env.VITE_APP_NAME;
	let sideMenu = Menu;

	$: changeLink = (link: any) => {
		closeSideMenu();
		goto(link.url);
	};
	$: isMainLink = (link: any) => {
		if (!link.url) {
			return false;
		}
		return link.url === activeUrl.pathname;
	};
	$: isChildLink = (link: any) => {
		if (!link.url) {
			return false;
		}
		return activeUrl.pathname.indexOf(link.url, 0) >= 0;
	};
	$: activeUrl = $page.url;
</script>

<section class="text-base font-bold text-black dark:text-white ">
	<!--Sidebar Brands-->
	<div class="border-b border-gray-200 p-5 dark:border-gray-600">
		<div class="flex gap-2 items-center">
			<img class="object-cover w-10 h-9" src={brands} alt="Brands" />
			<a href="/">
				<span> SMK NEGERI 1 GIANYAR </span>
			</a>
		</div>
	</div>
	<!-- Sidebar Menus -->
	<ul class="mt-6 pl-0">
		{#each sideMenu as link, a}
			<li class="relative px-6 py-3">
				{#if !link.sublinks}
					<a
						class="{isMainLink(link) &&
							'text-gray-500 dark:text-gray-100'} inline-flex items-center w-full text-base font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
						href={link.url}
						on:click={(e) => {
							e.preventDefault();
							changeLink(link);
						}}
					>
						{#if link.svg}
							<svg
								class="w-5 h-5"
								aria-hidden="true"
								fill="none"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								{#each link.svg as s, b}
									<path d={s} />
								{/each}
							</svg>
						{/if}
						<span class="ml-4">{link.name}</span>
					</a>
				{:else}
					<button
						on:click={() => togglePageMenu(link.name)}
						class="{isChildLink(link) &&
							'text-gray-800 dark:text-gray-100'} inline-flex items-center justify-between w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
						aria-haspopup="true"
					>
						<!-- <span class="inline-flex items-center">
							<svg
								class="w-5 h-5"
								aria-hidden="true"
								fill="none"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
								/>
							</svg>
							<span class="ml-4">{link.name}</span>
						</span> -->
						<!-- <svg class="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
							<path
								fill-rule="evenodd"
								d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
								clip-rule="evenodd"
							/>
						</svg> -->
					</button>
					<!-- {#if $pageMenus[link.name] || isChildLink(link)}
						<ul
							class="p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium text-gray-500 rounded-md shadow-inner bg-gray-50 dark:text-gray-400 dark:bg-gray-900"
							aria-label="submenu"
						>
							{#each link.sublinks as sublink, c}
								<li
									class="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
								>
									<a class="w-full" href={sublink.url}>{sublink.name}</a>
								</li>
							{/each}
						</ul>
					{/if} -->
				{/if}
			</li>
		{/each}
	</ul>
</section>
