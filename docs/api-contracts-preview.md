# API Contracts Preview

These contracts are not yet implemented as a portal API. They define the shape we should keep stable while building the runner and portal.

## Create Execution

```json
{
  "projectId": "ecommerce-playwright",
  "repository": "PlayWrightAutomation",
  "branch": "main",
  "commitSha": "exact-commit-sha",
  "environment": "qa",
  "browser": "chromium",
  "grep": "@smoke",
  "workers": 2,
  "retries": 1
}
```

## Runner Heartbeat

```json
{
  "runnerId": "local-runner-01",
  "status": "ONLINE",
  "activeExecutions": 1,
  "capacity": 2,
  "agentVersion": "0.1.0"
}
```

## Test Event

```json
{
  "executionId": "RUN-1001",
  "sequence": 4,
  "timestamp": "2026-07-16T20:00:00.000Z",
  "type": "TEST_FINISHED",
  "testId": "abc123",
  "title": "customer can place an order",
  "status": "FAILED",
  "durationMs": 12450,
  "failureCategory": "TEST_FAILURE"
}
```

## Cancel Execution

```json
{
  "executionId": "RUN-1001",
  "requestedBy": "user@example.com",
  "reason": "User cancelled from portal"
}
```
