# Reference Test Application

The public template uses SauceDemo as the default reference application:

```text
https://www.saucedemo.com
```

Default credentials:

```text
Username: standard_user
Password: secret_sauce
```

Why this app:

- it is publicly available
- it is designed for test automation practice
- it supports login, inventory, cart, checkout, and negative login scenarios
- it works for command-line execution now and portal execution later

## Run From Command Line

```bash
npm run test:reference
```

or:

```bash
npm run test:cmd -- --grep=@reference
```

## Run In Portal Mode

Portal mode currently uses the runner to set `PORTAL_MODE=true`, pass execution parameters, and write reporter events to:

```text
artifacts/realtime/events.jsonl
```

```bash
npm run test:portal -- --grep=@reference
```

The backend/control plane can call the runner with an execution ID, selected browser, environment, and other parameters:

```bash
node runner/run-tests.cjs --portal --execution-id=run-123 --env=qa --grep=@reference --project=chromium
```

## Replace With Your Application

Update `.env`:

```text
BASE_URL=https://your-app-url
TEST_USERNAME=your-test-user
TEST_PASSWORD=your-test-password
```

Then create your own page objects under:

```text
src/pages/your-app/
```

and specs under:

```text
tests/e2e/your-app/
```
