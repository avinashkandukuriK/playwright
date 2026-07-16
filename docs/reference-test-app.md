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
npm run test:cmd -- --grep @reference
```

## Run In Portal Mode

Portal mode currently uses the same Playwright execution path, but sets `PORTAL_MODE=true` and writes reporter events to:

```text
artifacts/realtime/events.jsonl
```

```bash
npm run test:portal -- --grep @reference
```

Later, the runner agent will call the same script with an execution ID, selected browser, environment, branch, and commit.

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
