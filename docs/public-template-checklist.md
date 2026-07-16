# Public Template Checklist

Use this checklist before pushing the framework to a public Git repository.

## Required

- `npm install` completes successfully.
- `npm run typecheck` passes.
- `npx playwright install` completes locally or in CI.
- `npm run test:reference` passes against SauceDemo.
- `npm run test:portal -- --grep @reference` creates `artifacts/realtime/events.jsonl`.
- `.env.example` contains only safe demo values.
- No private credentials are committed.
- Generated folders are ignored:
  - `artifacts/`
  - `test-results/`
  - `playwright-report/`
  - `allure-results/`

## Recommended Before Public Release

- Delete `legacy/` if you want a pure template repository.
- Keep `legacy/` if you want to show migration from the original project.
- Add repository description and topics in GitHub.
- Add a license file.
- Add issue templates for framework bugs and feature requests.

## Supported Execution Modes

Command-line mode:

```bash
npm run test:cmd -- --grep @reference
```

Portal-compatible mode:

```bash
npm run test:portal -- --grep @reference
```

Both modes run the same tests. Portal mode additionally marks the run with `PORTAL_MODE=true` and writes execution events through the custom reporter.
