export const Menu = [
	{
		name: 'Dashboard',
		url: '/admin',
		svg: [
			'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
		]
	},
	{
		name: 'Siswa',
		url: '/admin/siswa',
		svg: [
			'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'
		]
	},
	{
		name: 'Cards',
		url: '/cards',
		svg: [
			'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
		]
	},
	{
		name: 'Charts',
		url: '/charts',
		svg: [
			'M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z',
			'M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z'
		]
	},
	{
		name: 'Buttons',
		url: '/buttons',
		svg: [
			'M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122'
		]
	},
	{
		name: 'Modals',
		url: '/modals',
		svg: [
			'M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z'
		]
	},
	{ name: 'Tables', url: '/tables', svg: ['M4 6h16M4 10h16M4 14h16M4 18h16'] },
	{
		name: 'Pages',
		url: '/pages',
		svg: [
			'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z'
		],
		sublinks: [
			{ name: 'Login', url: import.meta.env.VITE_LOGIN_PATH },
			{ name: 'Create account', url: '/pages/create-account' },
			{ name: 'Forgot password', url: '/pages/forgot-password' },
			{ name: '404', url: '/pages/this-page-does-not-exists-at-all' }
		]
	}
];
