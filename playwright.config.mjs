import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: 'tests',
  testMatch: 'layout.spec.mjs',
  webServer: {
    command: 'npx serve public -l 3456',
    port: 3456,
    reuseExistingServer: true,
  },
  use: {
    baseURL: 'http://localhost:3456',
  },
})
