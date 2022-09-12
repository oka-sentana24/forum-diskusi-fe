<script lang="ts">
	/* import Module */
	import Button from '@smui/button';
	type props = {
		label: string;
		icon?: string;
		link?: string;
		primary?: boolean;
		secondary?: boolean;
	};

	export let button: props;
</script>

<Button
	href={button.link}
	class={`${button.primary && 'bg-blue-500'} 
	${button.secondary && 'bg-green-500'}`}
>
	<div class="flex flex-span-2 items-center justify-center w-full gap-3 normal-case">
		<span>{button.icon}</span>
		<span>{button.label}</span>
	</div>
</Button>
