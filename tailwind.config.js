module.exports = {
  purge: {
		content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
		options: {
			keyframes: true,
			fontFace: true
		}
	},
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
		colors: {
			red: { 600: '#DC2626' },
			yellow: { 300: '#FCD34D' },
			gray: { 200: '#E5E7EB' },
		}
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
