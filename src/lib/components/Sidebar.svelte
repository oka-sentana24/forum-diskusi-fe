<script lang="ts">
    import { closeSideMenu, pageMenus, togglePageMenu } from '$stores/menus'
    import { page } from '$app/stores'
    import { goto } from '$app/navigation'
    import brands from '$lib/templates/Admin/Images/brands.svg'
  
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
      // {
      //   name: 'Modals',
      //   url: '/admin/modals',
      //   svg: [
      //     'M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z',
      //   ],
      // },
      // { name: 'Tables', url: '/tables', svg: ['M4 6h16M4 10h16M4 14h16M4 18h16'] },
      // {
      //   name: 'Pages',
      //   svg: [
      //     'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z',
      //   ],
      //   sublinks: [
      //     { name: 'Login', url: '/pages/login' },
      //     { name: 'Create account', url: '/pages/create-account' },
      //     { name: 'Forgot password', url: '/pages/forgot-password' },
      //     { name: '404', url: '/this-page-does-not-exists-at-all' },
      //   ],
      // },
    ]
  </script>
  
  <div class="dark:text-white">
    <div class="border-b border-teal-900 py-5">
      {#if withTitle}
      <div>
        <img
        class="object-cover w-full h-full dark:hidden"
        src={brands}
        alt="Office"
        />
        <a class="ml-6 font-bold text-sm text-gray-800 dark:text-gray-200" href="/">SMK NEGERI 1 GIANYAR</a>
      </div>
      {/if}
    </div>
    <ul class="ml-0n pl-0">
      {#each menu as menus}
        <li class="relative px-6 py-3 hover:bg-purple-100 dark:hover:bg-gray-700 border-b border-teal-900">
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
  