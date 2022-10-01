<script lang="ts">
	export let login: boolean | null;
	export let sidebar: boolean | null;
	export let topHeader: boolean | null;
</script>

<div
	class={`${login && 'w-[460px] h-[414px] bg-white p-8'} ${
		sidebar && 'h-full w-[262px] bg-slate-900'
	} ${topHeader && 'h-5 w-full bg-white  border-b border-slate-200'}`}
>
	<slot />
</div>
