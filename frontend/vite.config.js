import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})

console.log(process.env)
console.log(import.meta.env)
console.log(process.env.VITE_CLIENT_ID)
console.log(import.meta.env.VITE_CLIENT_ID)