<script lang="ts">
	export let login: boolean | null;
	export let sidebar: boolean | null;
	export let topHeader: boolean | null;
	export let profile: boolean | null;
</script>

<div
	class={`${login && 'w-[460px] h-[414px] bg-white p-8'} ${
		sidebar && 'h-full w-[262px] bg-white border-r border-slate-300'
	} ${
		topHeader &&
		'bg-white border-b border-gray-300 w-full h-20 dark:bg-slate-700 dark:border-gray-600'
	} ${profile && 'bg-white w-[200px] p-5 shadow-md'}`}
>
	<slot />
</div>
