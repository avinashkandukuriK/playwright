# TestMate Enterprise

This repository contains the TestMate enterprise automation ecosystem.

## Projects

- `playwright-enterprise/`: Playwright TypeScript automation framework, runner, reference tests, and portal-compatible reporting.
- `testmate-portal/`: Portal/control-plane application. This folder is intentionally empty until portal development starts.

Keep framework code and portal code isolated by project folder. Shared execution contracts can move into a dedicated package later when both sides need them.
