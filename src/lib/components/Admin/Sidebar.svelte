<script lang="ts">
    import { closeSideMenu, pageMenus, togglePageMenu } from '$stores/menus'
    import { page } from '$app/stores'
    import { goto } from '$app/navigation'
    import brands from '$lib/images/brands.svg'
  
    const changeUrl = (url: string) => {
      closeSideMenu()
      goto(url)
    }
  
    let activeMenu = $page.url
  
    $: if ($page.url) {
      activeMenu = $page.url
    }
  
    export let withTitle = true
    const menu = [
      {
        name: 'Dashboard',
        url: '/admin',
        svg: [
          'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
        ],
      },
    ];
    export let links = [
      {
        name: 'Siswa',
        url: '/admin/siswa',
        svg: [
          'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
        ],
      },
      {
        name: 'Guru',
        url: '/admin/guru',
        svg: [
          'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
        ],
      },
      {
        name: 'Kelas',
        url: '/admin/charts',
        svg: [
          'M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z',
          'M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z',
        ],
      },
      {
        name: 'Users',
        url: '/admin/buttons',
        svg: [
          'M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122',
        ],
      },
    ]
  </script>
  
  <div class="dark:text-white text-gray-500">
    <div class="border-b dark:border-teal-900 border-gray-300 py-5 px-5 mx-auto">
      {#if withTitle}
      <div class=" flex gap-2 items-center justify-center">
        <img
            class="object-cover w-10 h-10"
            src={brands}
            alt="Office"
        />
        <a class="font-bold text-sm dark:text-white text-teal-900" href="/">SMK NEGERI 1 GIANYAR</a>
      </div>
      {/if}
    </div>
    <ul class="ml-0n pl-0">
      {#each menu as menus}
        <li class="relative px-6 py-3 hover:bg-purple-100 dark:hover:bg-gray-700 border-b dark:border-teal-900 border-gray-300">
          <a
            class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150"
            class:active={$page.url.pathname === menus.url} href={menus.url}
            on:click={(e) => {
              e.preventDefault()
              changeUrl(menus.url)
            }}
          >
            {#if menus.svg}
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
                {#each menus.svg as s, b}
                  <path d={s} />
                {/each}
              </svg>
            {/if}
            <span class="ml-4">{menus.name}</span>
          </a>
        </li>
      {/each}
      {#each links as link, a}
        <li class="relative px-6 py-3 hover:bg-purple-100 dark:hover:bg-gray-700">
            <a
              class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150"
              class:active={$page.url.pathname === link.url} href={link.url}
              on:click={(e) => {
                e.preventDefault()
                changeUrl(link.url)
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
        </li>
      {/each}
    </ul>
  </div>
  