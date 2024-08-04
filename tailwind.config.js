/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				montserrat: ["Montserrat", "sans-serif"],
			},
			backgroundImage: {
				stripesFromRightBlack:
					"repeating-linear-gradient( -45deg, #0e0e16, #0e0e16 5px, #000000 5px, #000000 25px )",
				roundedStripesBlack:
					"repeating-radial-gradient(circle at 0 0, #1a1818 0, #040404 10px), repeating-linear-gradient(#0e0e1655, #1a1a1e)",
			},
		},
	},
	plugins: [require("@tailwindcss/forms")],
};
