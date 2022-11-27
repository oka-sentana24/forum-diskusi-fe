<script lang="ts">
	export let login: boolean;
	export let sidebar: boolean;
	export let header: boolean;
	export let profile: boolean;
</script>

<div
	class={`bg-light-main-primary dark:bg-dark-main-primary ${login && 'w-[465px] h-auto '} ${
		sidebar &&
		'w-[248px] h-screen fixed inset-y-0 z-20 flex-shrink-0 border-r border-light-separator-primary dark:border-dark-separator-primary'
	} ${
		header &&
		'w-full h-16 p-5 border-b border-light-separator-primary dark:border-dark-separator-primary'
	} ${profile && 'w-[200px] p-5 rounded-sm'}`}
>
	<slot />
</div>
