<script lang="ts">
	export let login;
	export let sidebar;
	export let header;
	export let miniCard;
</script>

<div
	class={`overflow-hidden border border-gray bg-base-light dark:bg-base-dark dark:border-separator-dark rounded-md ${
		login && 'w-[380px]'
	} ${sidebar && 'fixed w-[255px] h-full bg-sidebar dark:bg-sidebar border-sidebar rounded-none'} ${
		header && 'relative bg-main-light dark:bg-main-dark py-2 border-none'
	} ${miniCard && 'w-[300px] hover:border-blue'} `}
>
	<slot />
</div>
