# TestMate Portal Goal

This app is the portal/control-plane surface for the TestMate enterprise automation ecosystem.

Keep this project focused on portal concerns:

- execution request UI
- run status and history
- artifact and event visibility
- future backend integration with `../playwright-enterprise/runner/run-tests.cjs`

Do not move Playwright framework code into this app. Shared execution contracts can move into a dedicated package later.

Use Next.js App Router, TypeScript, and production-safe Vercel deployment patterns.
