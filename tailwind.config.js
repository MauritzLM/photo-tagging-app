/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors: {
      current: 'currentColor',
      'primary': '#040D12',
      'secondary': '#CBE4DE',
      'text-primary': '#000',
      'text-secondary': '#fff',
      'marker': '#2C3333',
      'link': '#26A7D9',
      'error': '#DA2B25'
    }
  },
  plugins: [],
}
