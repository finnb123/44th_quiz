import { fontFamily } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,ts,svelte}'],
	theme: {
		extend: {
			colors: {
				// "background": "#faeee7",
				// "headline": "#33272a",
				// "paragraph": "#594a4e",
				// "button": "#ff8ba7",
				// "buttonText": "#33272a",
				// "stroke": "#33272a",
				// "main": "#fffffe",
				// "highlight": "#ff8ba7",
				// "secondary": "#ffc6c7",
				// "tertiary": "c3f0ca",
				background: '#262626',
				headline: '#fffffe',
				paragraph: '#262626',
				button: '#262626',
				buttonText: '#fffffe',
				stroke: '#010101',
				main: '#fffffe',
				highlight: '#949492',
				secondary: '#fffffe'
			},
			fontFamily: {
				poppins: ['VT323', 'monospace'], // use sans instead with a larger font stack
				sans: ['VT323', 'monospace', ...fontFamily.sans]
			}
		}
	},
	plugins: []
};
