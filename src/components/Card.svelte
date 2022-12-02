<script lang="ts">
	// @ts-nocheck
	export let login: boolean;
	export let sidebar: boolean;
	export let header: boolean;
	export let profile: boolean;
	export let tabel: boolean;
</script>

<div
	class={`bg-base-light dark:bg-base-dark ${login && 'w-[465px] h-auto '} ${
		sidebar &&
		'w-[256px] h-screen fixed inset-y-0 z-20 flex-shrink-0 border-r border-separator-light dark:border-separator-dark'
	} ${header && 'w-full h-16 p-5 border-b border-separator-light dark:border-separator-dark'} ${
		profile && 'w-[300px] p-5 rounded-md'
	} ${tabel && 'h-[36rem] relative'}`}
>
	<slot />
</div>
