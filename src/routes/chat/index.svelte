<script lang="ts">
	import { chatRoomId } from './../../stores/chatStore';
	import Card from '@smui/card';
	import { supabase } from '../../supabase';
	import { onMount } from 'svelte';
	import { variables } from '$lib/variables';
	import { mdiImage } from '@mdi/js';
	import { Icon } from 'svelte-materialify';
	import Dialog, { Title, Content, Actions } from '@smui/dialog';
	import Button from '$components/Button.svelte';
	import Portal from 'svelte-portal';

	let open = false;

	let test = '';
	let isLoading = false;
	let chatMessages = [];
	let Message;
	let authPenggunaId;
	let currentRoomId;
	let unsubscribeChatRoomId;
	let fileInput;
	let image;
	let imageFiles;

	let text = '';
	const action = (_) => (text = 'Enter');

	onMount(() => {
		authPenggunaId = localStorage.getItem('penggunaId');
		unsubscribeChatRoomId = chatRoomId.subscribe(fetchMessages);

		return () => {
			Message.unsubscribe();
			unsubscribeChatRoomId();
		};
	});
	// async function handleSubmit() {
	// 	let username = localStorage.getItem('username');
	// 	let jurusan = localStorage.getItem('jurusan');
	// 	const { data, error } = await supabase
	// 		.from('KelasMataPelajaran')
	// 		.insert([{ username: username, message: test, group_id: jurusan }]);
	// }

	async function subscribeMessage(roomId) {
		Message = supabase
			.from(`Message:roomId=eq.${roomId}`)
			.on('*', (payload) => {
				console.log('payload recieved', payload);
				chatMessages = [...chatMessages, payload.new];
			})
			.subscribe();
	}

	async function fetchMessages(roomId) {
		console.log('fetch room id', roomId);
		if (roomId === '') return;
		currentRoomId = roomId;
		isLoading = true;
		let { data: messages } = await supabase.from('Message').select('*').eq('roomId', roomId);
		console.log('old messages', messages);
		chatMessages = messages;
		subscribeMessage(roomId);
		isLoading = false;
	}

	async function sendMessage() {
		const messageData = {
			penggunaId: authPenggunaId,
			roomId: currentRoomId,
			nama: localStorage.getItem('namaSiswa'),
			text: text
		};

		const response = await fetch(`${variables.basePath}/messages`, {
			method: 'POST',
			credentials: 'same-origin',
			body: JSON.stringify(messageData),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		text = '';
	}

	function handleEnterKey(e) {
		if (e.key === 'Enter' || e.keyCode === 13) {
			sendMessage();
		}
	}

	const onFileSelected = (e) => {
		let file = e.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = (e) => {
			image = e.target.result;
		};
		open = true;
	};

	async function uploadImage(e) {
		const formData = new FormData();
		formData.append('image', imageFiles[0]);
		formData.append('penggunaId', authPenggunaId);
		formData.append('roomId', currentRoomId);
		formData.append('text', '-');

		console.log(formData);

		const response = await fetch(`${variables.basePath}/messages`, {
			method: 'POST',
			// headers: [['Content-Type', 'multipart/form-data']],
			body: formData
		});

		const data = await response.json();
		console.log('data', data);
		open = false;
	}

	function clearModal() {
		fileInput.value = '';
		open = false;
	}
</script>

<main class="h-full">
	<!-- <input type="text" placeholder="input di sini" bind:value={test} /> -->
	<!-- <button on:click={() => handleSubmit()}>submite</button> -->

	<!-- {#if isLoading}
		<p>Loading....</p>
	{:else if chatMessages.length}
		<div>
			{#each chatMessages as message}
				<div>{message.text}</div>
			{:else}
				<div>No messages...</div>
			{/each}
		</div>
	{/if} -->

	<!-- <div class="container mx-auto h-full">
		<div class="lg:col-span-2 lg:block">
			<div class="w-full px-20">
				<Card>
					<div class="relative w-full p-6 overflow-y-auto h-[40rem]">
						<ul class="pl-0 space-y-2">
							{#if isLoading}
								<p>Loading....</p>
							{:else if chatMessages.length}
								<div class="flex flex-col py-3">
									{#each chatMessages as message}
										{#if message.penggunaId === authPenggunaId}
											<div
												class="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow self-end bg-green-100 mb-2"
											>
												{message.text}
											</div>
										{:else}
											<div
												class="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow mb-2 self-start"
											>
												{message.text}
											</div>
										{/if}
									{:else}
										<div>No messages...</div>
									{/each}
								</div>
							{/if}
						</ul>
					</div>

					<div class="flex items-center justify-between w-full p-3 border-t border-gray-300">
						<button>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="w-6 h-6 text-gray-500"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						</button>
						<button>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="w-5 h-5 text-gray-500"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
								/>
							</svg>
						</button>

						<input
							type="text"
							placeholder="Message"
							class="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
							name="message"
							required
						/>
						<button>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="w-5 h-5 text-gray-500"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
								/>
							</svg>
						</button>
						<button type="submit">
							<svg
								class="w-5 h-5 text-gray-500 origin-center transform rotate-90"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"
								/>
							</svg>
						</button>
					</div>
				</Card>
			</div>
		</div>
	</div> -->
	<div class="container mx-auto h-screen w-full">
		<div class="sm:px-0 relative">
			<Card class="bg-indigo-100 sm:h-screen">
				<div class="px-5 overflow-y-auto h-[86vh]">
					<ul class="pl-0 space-y-2">
						{#if isLoading}
							<p>Loading....</p>
						{:else if chatMessages.length}
							<div class="flex flex-col py-3">
								{#each chatMessages as message}
									{#if message.penggunaId === authPenggunaId}
										{#if message.imageUrl}
											<div>
												<span>{message.nama}</span>
												<img
													class="self-end mb-2"
													src={message.imageUrl}
													alt=""
													crossorigin
													style="max-width: 300px"
												/>
											</div>
										{:else}
											<div
												class="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow self-end bg-green-100 mb-2 flex flex-col"
											>
												<div class="text-xs mb-2 font-italic">You</div>
												{message.text}
												<div class="text-xs text-gray-500 self-end mt-2">{message.createdAt}</div>
											</div>
										{/if}
									{:else if message.penggunaId !== authPenggunaId}
										{#if message.imageUrl}
											<img
												class="self-start mb-2"
												src={message.imageUrl}
												alt=""
												crossorigin
												style="max-width: 300px"
											/>
										{:else}
											<div
												class="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow mb-2 self-start"
											>
												<div class="text-xs mb-2 font-italic">{message.nama}</div>
												{message.text}
												<div class="text-xs text-gray-500 self-end mt-2">{message.createdAt}</div>
											</div>
										{/if}
									{/if}
								{:else}
									<div>No messages...</div>
								{/each}
							</div>
						{/if}
					</ul>
				</div>
				<div class="relative bottom-0 bg-white w-full">
					<div class="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
						<div>
							<button on:click={() => fileInput.click()}>
								<Icon path={mdiImage} />
							</button>
							<input
								style="display:none"
								type="file"
								on:change={(e) => onFileSelected(e)}
								bind:this={fileInput}
								bind:files={imageFiles}
							/>
						</div>
						<div class="flex-grow ml-4">
							<div class="relative w-full">
								{#if image}
									<!--
									 -->
									<Portal target="body">
										<!-- The Modal -->
										<div class="modal" class:open>
											<!-- Modal content -->
											<div class="modal-content">
												<span class="close" on:click={clearModal}>&times;</span>
												<img src={image} alt="" class="w-300 h-auto" />
												<Button type="primary" click={uploadImage}>Send</Button>
											</div>
										</div>
									</Portal>
								{/if}
								<input
									type="text"
									placeholder="Message"
									class="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
									name="message"
									required
									bind:value={text}
									on:keyup={handleEnterKey}
								/>
								<button
									class="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"
								>
									<svg
										class="w-6 h-6"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
								</button>
							</div>
						</div>
						<div class="ml-4">
							<button
								class="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
								on:click={() => sendMessage()}
							>
								<span>Send</span>
								<span class="ml-2">
									<svg
										class="w-4 h-4 transform rotate-45 -mt-px"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
										/>
									</svg>
								</span>
							</button>
						</div>
					</div>
				</div>
			</Card>
		</div>
	</div>
</main>
