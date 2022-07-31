<script>
	import { supabase } from '../../supabase';
	import { onMount } from 'svelte';
	let test = '';
	onMount(() => {
		showchat();
	});
	async function handleSubmit() {
		let username = localStorage.getItem('username');
		let jurusan = localStorage.getItem('jurusan');
		const { data, error } = await supabase
			.from('group_chat')
			.insert([{ username: username, message: test, group_id: jurusan }]);
	}
	let datas = [];
	async function showchat() {
		let jurusan = localStorage.getItem('jurusan');
		let { data, error } = await supabase.from('group_chat').select('*').eq('group_id', jurusan);
		datas = data;
	}
</script>

<main>
	<input type="text" placeholder="input di sini" bind:value={test} />
	<button on:click={() => handleSubmit()}>submite</button>

	<div>
		{datas[0]?.message}
	</div>
</main>
