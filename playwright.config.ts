import { defineConfig, devices } from '@playwright/test';
import { env } from './src/config/env';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: env.timeouts.test,
  expect: {
    timeout: env.timeouts.expect
  },
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  retries: env.execution.retries,
  workers: env.execution.workers,
  outputDir: 'artifacts/test-results',
  reporter: [
    ['line'],
    ['html', { outputFolder: 'artifacts/playwright-report', open: 'never' }],
    ['json', { outputFile: 'artifacts/results/results.json' }],
    ['./src/reporters/portal-reporter.ts']
  ],
  use: {
    baseURL: env.urls.baseUrl,
    headless: env.execution.headless,
    screenshot: env.artifacts.screenshot,
    trace: env.artifacts.trace,
    video: env.artifacts.video,
    actionTimeout: env.timeouts.action,
    navigationTimeout: env.timeouts.navigation
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 7'] }
    }
  ]
});
