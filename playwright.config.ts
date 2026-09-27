import { defineConfig } from '@playwright/test'
import chromium from '@sparticuz/chromium'

const useBundled = process.env.USE_BUNDLED_CHROMIUM === '1'

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://127.0.0.1:4173',
    headless: true,
    trace: 'retain-on-failure',
    launchOptions: useBundled
      ? {
          executablePath: await chromium.executablePath(),
          args: chromium.args.filter(
            (arg) => !['--single-process', '--disable-web-security'].includes(arg),
          ),
        }
      : undefined,
  },
  webServer: {
    command: 'npm run preview -- --port 4173',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: !process.env.CI,
  },
})
