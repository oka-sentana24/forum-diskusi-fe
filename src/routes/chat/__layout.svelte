<script lang="ts">
	// @ts-nocheck
	import '../../style/tailwind.scss';
	import SideBar from '$components/Sidebar.svelte';
	import { Menu } from './../../constant';
	import '../../app.css';
	import { isDark, isSideMenuOpen, closeSideMenu } from '$stores/menus';
	import { clickOutside } from '$lib/ioevents/click';
	import { keydownEscape } from '$lib/ioevents/keydown';
	import { fly } from 'svelte/transition';
	import { browser } from '$app/env';
	import { supabase } from '../../supabase';
	import { onMount } from 'svelte';
	import { chatRoomId } from '$src/stores/chatStore';
	import Card from '$src/components/Card.svelte';
	import Brands from '$src/components/Brands.svelte';
	import Header from '$src/components/Header.svelte';
	// let users = user;
	let roomData = [];
	console.log('roomData', roomData);

	let isUserChat = true;
	let isGlobalChat = true;

	async function fetchMessages() {
		console.log('_layout fetchMessages()');

		// let { data: messages } = await supabase
		// 	.from('Message')
		// 	.select('*')
		// 	.eq('roomId', '2f3b53a9-263c-4b3b-a806-26d0793c6bb8');
		// console.log('old messages', messages);

		const authUsername = localStorage.getItem('username');

		const { data: listPengguna } = await supabase
			.from('Pengguna')
			.select('*')
			.eq('username', authUsername);

		const { data: listSiswa } = await supabase
			.from('Siswa')
			.select('*')
			.eq('penggunaId', listPengguna[0].id);

		const siswa = listSiswa[0];

		localStorage.setItem('namaSiswa', siswa.nama);

		console.log('siswa', siswa);

		const { data: listMataPelajaran } = await supabase
			.from('KelasMataPelajaran')
			.select('*')
			.eq('kelasId', siswa.kelasId);

		console.log('listMataPelajaran', listMataPelajaran);

		const { data: rooms } = await supabase
			.from('Room')
			.select('*')
			.in(
				'id',
				listMataPelajaran.map((mataPelajaran) => mataPelajaran.roomId)
			);

		console.log('rooms', rooms);

		roomData = rooms;
	}

	onMount(async () => {
		fetchMessages();
	});

	if (browser && localStorage.theme === 'dark') {
		isDark.update((v) => true);
	} else {
		isDark.update((v) => false);
	}
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
	<div class="flex bg-root overflow-hidden" class:overflow-hidden={$isSideMenuOpen}>
		<aside class="z-20 hidden overflow-y-auto md:block flex-shrink-0 relative">
			<Card sidebar>
				<!-- Top Header-->
				<Brands back />
				{#each roomData as room}
					<div class="flex items-center justify-between px-5 py-4 hover:bg-color-light">
						<button on:click={() => chatRoomId.set(room.id)}>
							{room.name}
						</button>
					</div>
				{/each}
			</Card>
			<!-- <SideBar item={roomData} back click={roomData.id} /> -->
			<!-- {#each roomData as room}
				<div class="flex items-center justify-between px-5">
					<button on:click={() => chatRoomId.set(room.id)}>
						{room.name}
					</button>
				</div>
			{/each} -->
		</aside>
		{#if $isSideMenuOpen}
			<aside
				class="fixed inset-y-0 z-20 flex-shrink-0"
				use:clickOutside={['nav-mobile-hamburger']}
				use:keydownEscape
				on:keydown-escape={closeSideMenu}
				transition:fly={{ x: -200, duration: 2000 }}
			>
				<Card sidebar>
					<!-- Top Header-->
					<Brands back={closeSideMenu} click={closeSideMenu} />
					{#each roomData as room}
						<div class="flex items-center justify-between px-5 py-4 hover:bg-color-light">
							<button on:click={() => chatRoomId.set(room.id)}>
								{room.name}
							</button>
						</div>
					{/each}
				</Card>
			</aside>
		{/if}
		<div class="w-full">
			<div class="relative md:ml-64 h-screen">
				<slot />
			</div>
		</div>
	</div>
</main>
