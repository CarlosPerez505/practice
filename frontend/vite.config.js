import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // This allows the server to be accessed externally
    port: 5173, // Change the port if necessary
    watch: {
      usePolling: true // Useful for WSL2 or Docker environments
    }
  }
})
