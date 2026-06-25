import { defineConfig, devices } from '@playwright/test'

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? 'http://127.0.0.1:8858'
const serverURL = new URL(baseURL)

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  webServer: {
    command: `pnpm dev -- --host 127.0.0.1 --port ${serverURL.port || '8858'}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
})
