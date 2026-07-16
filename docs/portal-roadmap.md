# Portal Roadmap

## Phase 1: Enterprise Framework

Goal: make the Playwright code clean, stable, typed, and remotely executable.

Delivered in this scaffold:

- environment config
- TypeScript page objects
- Playwright fixtures
- API helper
- browser projects
- artifact structure
- portal-ready reporter events
- CI workflow
- framework standards

## Phase 2: Local Runner Agent

Goal: run tests through a separate process that can later become a Dockerized remote runner.

Scope:

- runner command builder
- execution ID support
- run by tag, file, browser, environment
- cancellation support
- heartbeat file or HTTP heartbeat
- artifact upload abstraction
- parse JSON results

## Phase 3: Portal Control Plane

Goal: add a Next.js portal deployable to Vercel.

Initial screens:

- Dashboard
- Test Runner
- Live Execution
- Results
- Execution History
- Projects and Runners
- Settings

Initial backend capabilities:

- create execution
- queue execution
- receive reporter events
- receive runner heartbeat
- cancel execution
- list history
- serve artifact metadata

## Phase 4: Enterprise Adoption

Goal: make the model usable by companies.

Scope:

- GitHub repository, branch, and commit selection
- self-hosted runner agent
- Dockerized execution isolation
- PostgreSQL and Prisma
- SSO/RBAC-ready authorization model
- secrets abstraction
- artifact storage abstraction
- audit log
- flaky test tracking
- quality gates

## Architecture Principle

The portal should control execution. It should not own the test logic. Developers continue writing normal Playwright TypeScript tests.
