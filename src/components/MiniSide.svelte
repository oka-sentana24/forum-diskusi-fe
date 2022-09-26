<script lang="ts">
	// @ts-nocheck
	import Card from '$components/Card.svelte';
	import { Icon } from 'svelte-materialify';
	import Brand from './Logo.svelte';
	export let item = [];
</script>

<!-- container -->

<Card miniCard>
	<!-- Side Nav Bar-->
	<Brand />

	{#each item as items}
		<div
			class="px-5 py-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
		>
			<a href={items.url}>
				<div
					class="flex flex-cols-2 items-center gap-5 justify-start  text-gray-500 hover:text-teal-600"
				>
					<Icon path={items.svg} />
				</div>
			</a>
		</div>
	{/each}

	<div class="mt-auto h-16 flex items-center w-full">
		<!-- Action Section -->
		<button
			class="h-16 w-10 mx-auto flex flex justify-center items-center
				w-full focus:text-orange-500 hover:bg-red-200 focus:outline-none"
		>
			<svg
				class="h-5 w-5 text-red-700"
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
				<polyline points="16 17 21 12 16 7" />
				<line x1="21" y1="12" x2="9" y2="12" />
			</svg>
		</button>
	</div>
</Card>
