<script lang="ts">
	export let login: boolean;
	export let header: boolean;
	export let sidebar: boolean;
	export let profile: boolean;
	export let view: boolean;
</script>

<div
	class={`bg-main ${login && 'w-[465px] p-[30px] leading-[.9px]'} ${
		header && 'w-full h-16 border-b border-line bg-root'
	} ${
		sidebar &&
		'md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-black flex flex-wrap items-center justify-between relative md:w-64 z-10 border-r border-line'
	} ${profile && 'bg-white w-[200px] p-5 shadow-md'} ${view && 'min-h-0 max-h-[55vh]'}`}
>
	<slot />
</div>
