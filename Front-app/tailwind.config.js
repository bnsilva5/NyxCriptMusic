// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Asegúrate de que las rutas incluyan todos los archivos relevantes
  ],
  theme: {
    extend: {
      scale: {
        '80': '0.8',
        '95': '0.95',
        // Agrega otras escalas si es necesario
      },
    },
  },
  plugins: [],
}
