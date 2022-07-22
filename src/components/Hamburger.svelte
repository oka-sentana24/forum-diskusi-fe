<script lang='ts'>
    import { Icon } from 'svelte-materialify';
    import {
		toggleSideMenu,
	} from '$stores/menus';
    import { mdiMenu, mdiWindowClose  } from '@mdi/js';

    let show = true;
</script>

<button
id="nav-mobile-hamburger"
on:click={toggleSideMenu}
aria-label="Menu"
>
    <div
        on:click={() => {
            show = !show;
        }}
        class="text-black"
    >
        <Icon path={mdiMenu} />
    </div>
</button>