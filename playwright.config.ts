import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: 3,
  reporter: 'list',
  use: {
    baseURL: `http://127.0.0.1:4321${process.env.SITE_BASE ?? '/'}`,
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'pnpm run preview --host 127.0.0.1 --port 4321 --ignore-lock',
    url: `http://127.0.0.1:4321${process.env.SITE_BASE ?? '/'}`,
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
