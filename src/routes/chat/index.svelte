<script>
	import { supabase } from '../../supabase';
	import { onMount } from 'svelte';
	let test = '';
	let isLoading = true;
	let chatMessages = [];
	let Message;

	onMount(() => {
		fetchMessages();

		return () => Message.unsubscribe();
	});
	// async function handleSubmit() {
	// 	let username = localStorage.getItem('username');
	// 	let jurusan = localStorage.getItem('jurusan');
	// 	const { data, error } = await supabase
	// 		.from('KelasMataPelajaran')
	// 		.insert([{ username: username, message: test, group_id: jurusan }]);
	// }

	async function subscribeMessage() {
		Message = supabase
			.from(`Message:roomId=eq.6852d9c9-e17d-438f-93fa-e5b824a87e78`)
			.on('*', (payload) => {
				console.log('payload recieved', payload);
				chatMessages = [...chatMessages, payload.new];
			})
			.subscribe();
	}

	async function fetchMessages() {
		let { data: messages } = await supabase
			.from('Message')
			.select('*')
			.eq('roomId', '6852d9c9-e17d-438f-93fa-e5b824a87e78');
		console.log('old messages', messages);
		chatMessages = messages;
		subscribeMessage();
		isLoading = false;
	}
</script>

<main>
	<input type="text" placeholder="input di sini" bind:value={test} />
	<!-- <button on:click={() => handleSubmit()}>submite</button> -->

	{#if isLoading}
		<p>Loading....</p>
	{:else}
		<div>
			{#each chatMessages as message}
				<div>{message.text}</div>
			{:else}
				<div>No messages...</div>
			{/each}
		</div>
	{/if}
</main>
