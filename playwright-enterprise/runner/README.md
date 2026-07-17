# Runner

The runner is the stable execution entry point for portal/backend runs and advanced manual runs.

Manual Playwright commands remain supported through `npm run test:*`. The runner adds a controlled parameter layer for systems that should not build raw Playwright commands directly.

## Manual Runner Examples

```bash
node runner/run-tests.cjs --grep=@reference --project=chromium
node runner/run-tests.cjs --portal --execution-id=local-dev --grep=@reference --project=chromium
```

Windows wrapper:

```powershell
.\runner\run-tests.ps1 --portal --execution-id local-dev --grep @reference --project chromium
```

Linux/macOS wrapper:

```bash
./runner/run-tests.sh --portal --execution-id local-dev --grep @reference --project chromium
```

## Backend Contract

A backend or control plane should call the runner with explicit parameters:

```bash
node runner/run-tests.cjs \
  --portal \
  --execution-id=run-123 \
  --env=qa \
  --grep=@smoke \
  --project=chromium \
  --workers=2 \
  --headless=true
```

The runner validates known framework options, sets environment variables, and launches Playwright without shell string interpolation.

## Supported Options

- `--portal`
- `--execution-id <id>`
- `--env <qa|uat|stage|prod>`
- `--grep <tag-or-pattern>`
- `--project <name>`
- `--workers <number>`
- `--retries <number>`
- `--headless <true|false>`
- `--headed`
- `--base-url <url>`
- `--api-base-url <url>`
- `--username <value>`
- `--password <value>`
- `--portal-output <path>`
- `--config <path>`

Unknown arguments are passed through to Playwright so developers can still use normal Playwright flags while debugging.
