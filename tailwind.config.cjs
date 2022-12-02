const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	important: true,
	mode: 'jit',
	purge: ['src/app.html', 'src/**/*.svelte'],
	darkMode: 'class', // or 'media' or 'class'
	theme: {
		fontSize: {
			...defaultTheme.fontSize,
			'10xl': '10rem'
		},
		themeVariants: ['dark'],
		customForms: (theme) => ({
			default: {
				'input, textarea': {
					'&::placeholder': {
						color: theme('colors.gray.400')
					}
				}
			}
		}),
		colors: {
			transparent:'transparent',
			white:'#FFFFFF',
			black:"#000000",
			main:{
				light:'#F7F9FB',
				dark:'#252836'
			},
			base:{
				light:'#FFFFFF',
				dark:'#1F1D2B',
				/* remove */
				black:'#000000',
				white:'#FFFFFF'
			},
			color:{
				light:'#11142D',
				dark:'#FFFFFF',
				body:'#9A9AB0'
			},
			separator:{
				light:'#E1E1E1',
				dark:'#252836',
			},
			link:{
				primary:'#82ACFF',
				secondary:"#8F71FF"
			},
			btn:{
				10:'#D0E7FB',
				30:'#55AAF1',
				50:'#2D96EE',
				70:'#117BD4',
				85:'#0B528E'
			},
			fill:{
				light:{
					icon:'#9A9AB0',
					field:'#f5f5f5',
					progress:'#E2E2EA',
					btn:'#FFFFFF',
					disabled:'#E0E0E0'
				},
				dark:{
					icon:'#9A9AB0',
					field:'#21242E',
					progress:'#2D3241',
					btn:'#3D435A',
					disabled:'#E0E0E0'
				}
				
			},
			other:{
				warning:'#EEAF22',
				error:'#F04461',
				success:'#41DA7E',
				info:'#F1F1F6'
			},
		},
		extend: {
			screens: {
				print: { raw: 'print' }
			},
			maxHeight: {
				0: '0',
				xl: '36rem'
			},
			fontFamily: {
				sans: ['Inter', 'Montserrat', ...defaultTheme.fontFamily.sans]
			}
		},
	},
	plugins: [
		// ...
		require('tailwind-scrollbar'),
	],
	variants: {
        scrollbar: ['rounded']
    }
};
