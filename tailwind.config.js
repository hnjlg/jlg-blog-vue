/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		screens: {
			sm: '480px',
			md: '768px',
			lg: '976px',
			xl: '1440px',
		},
		colors: {
			blue: '#1fb6ff',
			purple: '#7e5bef',
			pink: '#ff49db',
			orange: '#ff7849',
			green: '#13ce66',
			yellow: '#ffc82c',
			'gray-dark': '#273444',
			gray: '#8492a6',
			'gray-light': '#d3dce6',
		},
		fontFamily: {
			sans: ['Graphik', 'sans-serif'],
			serif: ['Merriweather', 'serif'],
		},
		extend: {
			spacing: {
				128: '32rem',
				144: '36rem',
			},
			borderRadius: {
				'4xl': '2rem',
			},
		},
		spacing: {
			px: '1px',
			0: '0',
			1: '0.25rem',
			2: '0.5rem',
			3: '0.75rem',
			4: '1rem',
			8: '2rem',
			9: '2.25rem',
			10: '2.5rem',
			30: '7.5rem',
			60: '15rem',
			80: '20rem',
			96: '24rem',
			'10px': '10px',
		},
		borderRadius: {
			none: '0',
			sm: '.125rem',
			DEFAULT: '.25rem',
			lg: '.5rem',
			full: '9999px',
		},
		container: {
			center: true,
		},
		minHeight: {
			500: '500px',
		},
	},
	plugins: [],
};
