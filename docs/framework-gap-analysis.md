# Framework Gap Analysis

## Business View

The original project proves Playwright capability, but it is not yet ready for company-wide adoption because configuration, reporting, data, and execution standards are not centralized.

Business needs:

- predictable execution across local, CI, and remote runner
- test history and evidence for failures
- secure handling of credentials
- traceable environment and browser coverage
- simple onboarding for new SDETs and developers
- future portal integration without rewriting tests

## SDET View

Current gaps identified:

- hardcoded URL and credentials
- mixed JavaScript and TypeScript implementations
- duplicate page object and utility folders
- generated reports committed beside source code
- no standard tag strategy
- no central environment model
- no failure classification
- no runner/portal execution event contract
- CI uses older Node and GitHub Action versions

Framework standards added in this pass:

- `src/config/env.ts` centralizes runtime settings
- `src/fixtures/test-fixtures.ts` provides reusable test fixtures
- `src/pages/` creates TypeScript page objects
- `src/api/` creates a typed API helper layer
- `src/reporters/portal-reporter.ts` emits portal-ready execution events
- `playwright.config.ts` standardizes browser projects, artifacts, retries, workers, and reports

## Developer View

The first implementation keeps legacy files available and adds a modern path beside them. This reduces migration risk. Future cleanup can gradually retire:

- `pageobjects/`
- `pageobjects_ts/`
- `utils/`
- `utils_ts/`
- old root-level `tests/*.js`
- `playwright.config.js`
- `playwright.config1.js`

## Feedback Loop

Use this loop for every framework change:

1. Business checks whether the test supports a real workflow or risk.
2. SDET checks stability, data, tags, parallel behavior, and debug artifacts.
3. Developer checks code structure, typing, maintainability, and CI impact.
4. Run typecheck and selected tests.
5. Capture feedback and revise.
