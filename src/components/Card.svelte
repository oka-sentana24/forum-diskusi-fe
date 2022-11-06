<script lang="ts">
	export let login: boolean;
	export let header: boolean;
	export let sidebar: boolean;
	export let profile: boolean;
</script>

<div
	class={`bg-main-light-primary dark: to-main-dark-primary ${
		login && 'w-[465px] p-[30px] leading-[.9px]'
	} ${header && 'w-full h-[80px] border-b border-color-light-body dark:border-primary-dark-85'} ${
		sidebar && 'h-screen w-[200px border-r border-color-light-body dark:border-primary-dark-85]'
	} ${profile && 'bg-white w-[200px] p-5 shadow-md'}`}
>
	<slot />
</div>
