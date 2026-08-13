import { defineConfig } from 'astro/config'
import keystatic from '@keystatic/astro'
import cloudflare from '@astrojs/cloudflare'
import react from '@astrojs/react'

export default defineConfig({
  integrations: [react(), keystatic()],
  output: 'server',
  adapter: cloudflare(),
})
