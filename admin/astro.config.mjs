import { defineConfig } from 'astro/config'
import keystatic from '@keystatic/astro'
import cloudflare from '@astrojs/cloudflare'

export default defineConfig({
  integrations: [keystatic()],
  output: 'server',
  adapter: cloudflare(),
})
