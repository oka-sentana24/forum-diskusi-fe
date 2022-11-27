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
			base:{
				black:'#000000',
				white:'#FFFFFF'
			},
			other:{
				warning:'#EEAF22',
				error:'#F04461',
				success:'41DA7E',
				info:'F1F1F6'
			},
			light:{
				text:{
					title:'#11142D',
					body_1:'#92929D',
					body_2:'#9A9AB0'
				},
				link:{
					purple:'#5541D7',
					white:'#FFFFFF'
				},
				primary:{
					10:'#DBD7F4',
					30:'#766EDA',
					50:'#5541D7',
					70:'#2A23C2',
					85:'#181485'
				},
				secondary:{
					10:'#D0E7FB',
					30:'#55AAF1',
					50:'#2D96EE',
					70:'#117BD4',
					85:'#0B528E'
				},
				accent :{
					10:'#FCE7CF',
					30:'#F5A851',
					50:'#F2870D',
					70:'#D9790C',
					85:'#915108'
				},
				main:{
					primary:'#FFFFFF',
					secondary:'#F7F7FC'
				},
				separator:{
					primary:'#E1E1FB',
					secondary:'#E1E1E1'
				},
				fill:{
					icon:'#9A9AB0',
					field:'#f5f5f5',
					progress:'#E2E2EA',
					btn:'#FFFFFF',
					disabled:'#E0E0E0'
				}
			},
			dark:{
				text:{
					title:'#FFFFFF',
					body_1:'#92929D',
					body_2:'#9A9AB0'
				},
				link:{
					blue:'#0D8BFF',
					white:'#FFFFFF'
				},
				primary:{
					10:'#CCE7FF',
					30:'#66B6FF',
					50:'#0D8BFF',
					70:'#005099',
					85:'#001B33'
				},
				secondary:{
					10:'#FBE7D0',
					30:'#F4B871',
					50:'#EE952D',
					70:'#8E520B',
					85:'#2F1B04'
				},
				accent :{
					10:'#CEFDED',
					30:'#71FACA',
					50:'#09F6A3',
					70:'#059462',
					85:'#023121'
				},
				main:{
					primary:'#1F1D2B',
					secondary:'#252836'
				},
				separator:{
					primary:'#3C4156',
					secondary:'#252836'
				},
				fill:{
					icon:'#9A9AB0',
					field:'#21242E',
					progress:'#2D3241',
					btn:'#3D435A',
					disabled:'#E0E0E0'
				}
			}
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
