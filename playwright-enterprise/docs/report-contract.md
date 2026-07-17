# Report Contract

This document defines the artifact-first contract between the Playwright framework and the TestMate portal.

The portal should read what the framework already produces before introducing database or streaming requirements.

## Current Artifact Outputs

| Artifact | Producer | Portal Use |
| --- | --- | --- |
| `artifacts/realtime/events.jsonl` | `src/reporters/portal-reporter.ts` | Live execution timeline, status, failure category, retry, duration |
| `artifacts/results/results.json` | Playwright JSON reporter | Completed execution summary, browser matrix, suites, test counts |
| `artifacts/playwright-report/` | Playwright HTML reporter | Full rich Playwright report link |
| `artifacts/test-results/` | Playwright test output | Traces, screenshots, videos, error context, attachments |

## Realtime Event Shape

Events are newline-delimited JSON. Each line should conform to `PortalReporterEvent` in `src/types/execution.ts`.

Required fields:

- `executionId`
- `sequence`
- `timestamp`
- `type`

Common optional fields:

- `projectName`
- `testId`
- `title`
- `file`
- `status`
- `durationMs`
- `retry`
- `failureCategory`
- `errorMessage`

## Event Types

- `EXECUTION_STARTED`
- `TEST_STARTED`
- `TEST_FINISHED`
- `EXECUTION_FINISHED`
- `LOG`
- `ARTIFACT_CREATED`

## Failure Categories

- `TEST_FAILURE`
- `APPLICATION_FAILURE`
- `ENVIRONMENT_FAILURE`
- `INFRASTRUCTURE_FAILURE`
- `CONFIGURATION_FAILURE`
- `UNKNOWN_FAILURE`

## Portal MVP Mapping

Dashboard:

- Execution runs from `events.jsonl`
- Failed executions from `TEST_FINISHED` events with failing status
- Failure categories from `failureCategory`
- Browser matrix from `projectName`

Reports:

- Pass rate from `results.json`
- Duration summaries from `durationMs` and Playwright JSON result timing
- Failure trends after multiple runs are retained

Artifacts:

- HTML report link from `artifacts/playwright-report/`
- JSON result link from `artifacts/results/results.json`
- Event stream link from `artifacts/realtime/events.jsonl`
- Trace/screenshot/video links from `artifacts/test-results/`

## Later Phases

Phase 2 should persist parsed execution records in a database.

Phase 3 should stream reporter events over HTTP, SSE, or WebSocket.

Phase 4 should support execution cancellation, retry, and historical trend analysis.
