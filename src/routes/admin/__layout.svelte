<script lang="ts">
  import '$lib/tailwind.css'
  import { isSideMenuOpen, closeSideMenu } from '$stores/menus'
  import { clickOutside } from '$lib/ioevents/click'
  import { keydownEscape } from '$lib/ioevents/keydown'
  import SideBar from '$lib/components/Sidebar.svelte'
  import { fly } from 'svelte/transition';
</script>

<svelte:head>
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<section id="body">
  <div class="flex h-screen bg-gray-200 dark:bg-gray-700 overflow-hidden " class:overflow-hidden={$isSideMenuOpen}>
    <aside
      class="z-20 hidden w-[300px] overflow-y-auto bg-white md:block flex-shrink-0 border-r border-gray-300 dark:border-gray-600 dark:bg-gray-800"
    >
      <SideBar />
    </aside>

    {#if $isSideMenuOpen}
      <aside
        class="fixed inset-y-0 z-20 flex-shrink-0 w-64 mt-[65px] overflow-y-auto bg-white dark:bg-gray-800"
        use:clickOutside={['nav-mobile-hamburger']}
        on:click-outside={closeSideMenu}
        use:keydownEscape
        on:keydown-escape={closeSideMenu}
        transition:fly="{{ x: -200, duration: 2000 }}"
      >
        <SideBar />
      </aside>
    {/if}

    <div class="flex flex-col flex-1 w-full">
      <slot />
    </div>
  </div>
</section>
