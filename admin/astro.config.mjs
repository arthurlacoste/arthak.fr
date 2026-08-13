import { defineConfig } from 'astro/config'
import keystatic from '@keystatic/astro'
import cloudflare from '@astrojs/cloudflare'
import react from '@astrojs/react'
import markdoc from '@astrojs/markdoc'

export default defineConfig({
  integrations: [react(), markdoc(), keystatic()],
  output: 'server',
  adapter: cloudflare(),
})
