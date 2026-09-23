import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// `base: "./"` makes the build output use RELATIVE asset URLs
// (./assets/index-xxx.js) instead of absolute ones (/assets/...),
// so the app works when served from a sub-path like
// https://<user>.github.io/<repo>/ (plain white page otherwise).
export default defineConfig({
  base: './',
  plugins: [react()],
})
