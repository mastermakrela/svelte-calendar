/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		fontFamily: {
			display: ['Nunito', 'system-ui', 'sans-serif'],
			body: ['Nunito', 'system-ui', 'sans-serif'],
			serif: ['ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif']
		},
		extend: {
			colors: {
				primary: '#BA1904'
			}
		}
	},

	plugins: []
};

module.exports = config;
