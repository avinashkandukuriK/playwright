# Automation Standards

## Naming

Test names should include a tag and business-readable behavior:

```ts
test('@web @smoke customer can place an order and find it in order history', async () => {
  // ...
});
```

Recommended tags:

- `@smoke`
- `@regression`
- `@web`
- `@api`
- `@critical`
- `@checkout`
- `@auth`

## Page Objects

Page objects should:

- contain selectors and user actions
- avoid hardcoded test data
- avoid assertions unless the assertion belongs to that page behavior
- use explicit method names such as `addProductToCart` and `submitOrderAndGetOrderId`

Page objects should not:

- store passwords
- read test data files directly
- decide environment URLs
- call portal or CI services

## Test Data

Test data should come from:

- environment variables for secrets
- data builders for scenario defaults
- API setup helpers for generated records
- JSON files only for non-sensitive static data

## Failure Classification

Failures should be classified separately:

- `TEST_FAILURE`: assertion, selector, or expected behavior mismatch
- `APPLICATION_FAILURE`: product defect or business flow failure
- `ENVIRONMENT_FAILURE`: target app, API, or dependency unavailable
- `INFRASTRUCTURE_FAILURE`: browser, runner, network, or timeout issue
- `CONFIGURATION_FAILURE`: missing secret, wrong URL, invalid test setup

## Artifacts

All generated evidence must stay under `artifacts/`:

- Playwright HTML report
- JSON report
- screenshots
- videos
- traces
- portal event stream

This keeps source control clean and gives the future portal one predictable artifact root.
