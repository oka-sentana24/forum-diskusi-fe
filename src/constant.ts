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
		name: 'Student',
		url: '/admin/siswa',
		svg: mdiAccountSchool
	},
	{
		name: 'Teacher',
		url: '/admin/guru',
		svg: mdiHumanMaleBoardPoll
	},
	{
		name: 'Class',
		url: '/admin/kelas',
		svg: mdiGoogleClassroom
	},
	{
		name: 'Major',
		url: '/admin/jurusan',
		svg: mdiGraph
	},
	{
		name: 'User',
		url: '/admin/users',
		svg: mdiAccount
	}
];
