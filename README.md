# TestMate Enterprise

This repository contains the TestMate enterprise automation ecosystem.

## Projects

- `playwright-enterprise/`: Playwright TypeScript automation framework, runner, reference tests, and portal-compatible reporting.
- `testmate-portal/`: Next.js portal/control-plane application for execution requests, run visibility, and future backend integration.

Keep framework code and portal code isolated by project folder. Shared execution contracts can move into a dedicated package later when both sides need them.
