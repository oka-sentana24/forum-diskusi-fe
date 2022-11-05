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
			transparent: 'transparent',
			base:{
				black:"#000000",
				white:"#FFFFFF"
			},
			color:{
				light:{
					title:"#11142D",
					body:"#92929D"
				},
				dark:{
					title:"#FFFFFF",
					body:"#92929D"
				}
			},
			link:{
				light:{
					purple:"#5541D7",
				},
				dark:{
					blue:"#0D8BFF"
				}
			},
			primary:{
				light:{
					10:"#DBD7F4",
					30:"#766EDA",
					50:"#5541D7",
					70:"#2A23C2",
					85:"#0B528E"
				},
				dark:{
					10:"#CCE7FF",
					30:"#66B6FF",
					50:"#0D8BFF",
					70:"#005099",
					85:"#001B33"
				},
			},
			other:{
				warning:"#EEAF22",
				error:"#F04461",
				success:"#Success"
			},
			main:{
				light:{
					primary:"#FFFFFF",
					secondary:"#F7F7FC"
				},
				dark:{
					primary:"#1F1D2B",
					secondary:"#252836"
				},
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
