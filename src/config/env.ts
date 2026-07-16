import fs from 'node:fs';
import path from 'node:path';
import type { TestEnvironment } from '../types/execution';

type TraceMode = 'off' | 'on' | 'retain-on-failure' | 'on-first-retry';
type VideoMode = 'off' | 'on' | 'retain-on-failure' | 'on-first-retry';
type ScreenshotMode = 'off' | 'on' | 'only-on-failure';

loadDotEnvFile();

function loadDotEnvFile(): void {
  const envFile = path.resolve(process.cwd(), '.env');

  if (!fs.existsSync(envFile)) {
    return;
  }

  const lines = fs.readFileSync(envFile, 'utf-8').split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith('#') || !trimmed.includes('=')) {
      continue;
    }

    const [key, ...valueParts] = trimmed.split('=');
    const value = valueParts.join('=').replace(/^["']|["']$/g, '');

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

function readString(key: string, fallback: string): string {
  return process.env[key] || fallback;
}

function readNumber(key: string, fallback: number): number {
  const value = Number(process.env[key]);
  return Number.isFinite(value) && value > 0 ? value : fallback;
}

function readBoolean(key: string, fallback: boolean): boolean {
  const value = process.env[key];

  if (value === undefined) {
    return fallback;
  }

  return ['true', '1', 'yes'].includes(value.toLowerCase());
}

function readEnvironment(): TestEnvironment {
  const value = readString('TEST_ENV', 'qa').toLowerCase();

  if (['qa', 'uat', 'stage', 'prod'].includes(value)) {
    return value as TestEnvironment;
  }

  return 'qa';
}

export const env = {
  environment: readEnvironment(),
  urls: {
    baseUrl: readString('BASE_URL', 'https://rahulshettyacademy.com/client'),
    apiBaseUrl: readString('API_BASE_URL', 'https://rahulshettyacademy.com/api/ecom')
  },
  credentials: {
    username: readString('TEST_USERNAME', ''),
    password: readString('TEST_PASSWORD', '')
  },
  execution: {
    headless: readBoolean('HEADLESS', true),
    workers: readNumber('WORKERS', 2),
    retries: readNumber('RETRIES', 1),
    executionId: readString('PORTAL_EXECUTION_ID', 'local-dev')
  },
  artifacts: {
    trace: readString('TRACE_MODE', 'retain-on-failure') as TraceMode,
    video: readString('VIDEO_MODE', 'retain-on-failure') as VideoMode,
    screenshot: readString('SCREENSHOT_MODE', 'only-on-failure') as ScreenshotMode,
    portalEventsFile: readString('PORTAL_REPORTER_OUTPUT', 'artifacts/realtime/events.jsonl')
  },
  timeouts: {
    test: readNumber('TEST_TIMEOUT_MS', 30_000),
    expect: readNumber('EXPECT_TIMEOUT_MS', 5_000),
    action: readNumber('ACTION_TIMEOUT_MS', 10_000),
    navigation: readNumber('NAVIGATION_TIMEOUT_MS', 30_000)
  }
};

export function hasRuntimeCredentials(): boolean {
  return Boolean(env.credentials.username && env.credentials.password);
}
