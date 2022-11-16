import {
	mdiChartBar,
	mdiAccountSchool,
	mdiHumanMaleBoardPoll,
	mdiGoogleClassroom,
	mdiGraph,
	mdiAccount
} from '@mdi/js';

export const Menu = [
	{
		name: 'Dashboard',
		url: '/admin',
		svg: mdiChartBar
	},
	{
		name: 'Siswa',
		url: '/admin/siswa',
		svg: mdiAccountSchool
	},
	// {
	// 	name: 'Guru',
	// 	url: '/admin/guru',
	// 	svg: mdiHumanMaleBoardPoll
	// },
	// {
	// 	name: 'Kelas',
	// 	url: '/admin/kelas',
	// 	svg: mdiGoogleClassroom
	// },
	{
		name: 'Jurusan',
		url: '/admin/jurusan',
		svg: mdiGraph
	}
	// // {
	// 	name: 'User',
	// 	url: '/admin/users',
	// 	svg: mdiAccount
	// }
];
