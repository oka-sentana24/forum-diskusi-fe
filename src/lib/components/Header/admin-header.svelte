<script lang='ts'> 
    import { Breadcrumbs, Icon, TextField } from 'svelte-materialify';
	import { mdiMagnify } from '@mdi/js';
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
	import '$sass/tailwind.scss';

	const withBreadcrumb = true;
	// export let items;
</script>

<header class="z-10">
    <div class="bg-black dark:bg-gray-900">
        <div class=" flex items-center justify-between">
            <p>eteettet</p>
        </div>
    </div>
</header>