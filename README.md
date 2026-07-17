# Playwright Automation Enterprise Framework

This project is the first step toward an enterprise-ready real-time Playwright execution platform. The immediate goal is to convert the existing automation code into a clean SDET framework. The future goal is to connect this framework to a portal/control plane that can run tests remotely, stream status, manage artifacts, and support company adoption.

## Current Phase

Phase 1 focuses on the automation framework:

- TypeScript-first Playwright structure
- Environment-driven configuration
- Secure credential handling through environment variables
- Standard page object model
- Reusable fixtures
- API helper layer
- Browser/device projects
- JSON, HTML, and portal-event reporting
- CI-ready GitHub Actions workflow
- Clean artifact output under `artifacts/`

Legacy training files from the original project are preserved under `legacy/` only for migration reference. The public template surface lives under `src/`, `tests/e2e/reference/`, and `docs/`.

The default runnable reference app is SauceDemo:

```text
https://www.saucedemo.com
```

This gives public users a working command-line test target immediately, while the same tests also emit portal-ready reporter events.

## Folder Structure

```text
src/
  config/              environment and runtime configuration
  fixtures/            custom Playwright fixtures
  pages/saucedemo/     reference app page objects
  reporters/           custom reporter for portal-ready events
  types/               shared execution contracts

runner/                parameterized execution entry points for backend/portal runs

tests/e2e/
  reference/           runnable SauceDemo sample specs

artifacts/             generated reports, traces, videos, screenshots, JSON
docs/                  framework and portal documentation
legacy/                original project files kept for migration reference
```

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create local environment file:

```bash
copy .env.example .env
```

3. Update `.env` with valid test credentials.

4. Run tests:

```bash
npm test
```

Useful commands:

```bash
npm run test:reference
npm run test:cmd
npm run test:runner -- --grep=@reference --project=chromium
npm run test:portal -- --grep=@reference
npm run test:smoke
npm run test:web
npm run test:api
npm run test:headed
npm run report
npm run typecheck
```

## Public Template Surface

For a clean public repository, new users should focus on:

```text
src/config/
src/fixtures/
src/pages/saucedemo/
src/reporters/
src/types/
tests/e2e/reference/
docs/
```

The `legacy/` folder is not part of the generic framework. It is kept only to show where the original project came from and can be deleted once migration is complete.

## SDET Operating Model

Every new test should answer:

- What business risk does this cover?
- Is this UI, API, or end-to-end?
- Which tag should run it: `@smoke`, `@regression`, `@web`, `@api`?
- What data does it require?
- Can it run in parallel?
- What artifact helps debug failure?
- Does failure mean product defect, environment issue, test issue, or infrastructure issue?

## Portal Readiness

Manual Playwright execution remains first-class for local development. Portal/backend execution should go through the runner:

```bash
node runner/run-tests.cjs --portal --execution-id=run-123 --grep=@reference --project=chromium
```

The custom reporter writes JSONL events to:

```text
artifacts/realtime/events.jsonl
```

These events are intentionally shaped for a future portal:

- execution started
- test started
- test finished
- execution finished
- status
- duration
- retry
- failure category

In the next phase, this file writer can become an HTTP/WebSocket event publisher without changing the tests.
