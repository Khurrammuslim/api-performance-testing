# API + Performance Testing Project

![CI Pipeline](https://github.com/Khurrammuslim/api-performance-testing/actions/workflows/playwright.yml/badge.svg)

## Overview
Dedicated project for REST API testing (Playwright) and performance/load 
testing (k6) — part of a multi-stack QA portfolio build.

## Tech Stack
- Playwright (API testing, TypeScript)
- k6 (load, stress, spike, steady-load testing)
- Zod (API response schema validation)
- json-server (local mock API)
- GitHub Actions CI/CD (parallel jobs, manual performance triggers)

## Project Structure
```
tests/
├── api/
│   ├── posts-crud.spec.ts    # CRUD tests against JSONPlaceholder
│   ├── auth.spec.ts          # Login/register flow tests
│   ├── negative.spec.ts      # 400/404 error scenarios
│   └── user.spec.ts          # Local mock API tests via ApiClient
└── performance/
    ├── smoke-test.js
    ├── load-test.js
    ├── steady-load.js
    ├── stress-test.js
    └── spike-test.js
src/
├── clients/         # Reusable ApiClient class
├── fixtures/         # Custom test fixtures
└── schemas/          # Zod schema definitions
```

## Running Tests
```bash
# API tests (requires mock server)
npm run mock-server        # separate terminal
npx playwright test

# Performance tests
npm run perf:smoke         # fast, runs in CI on every push
npm run perf:load
npm run perf:steady
npm run perf:stress
npm run perf:spike
```

## CI/CD
- `api-tests` and `performance-smoke` run automatically on every push/PR
- Full performance suite (`load`/`stress`/`spike`/`steady`) is triggered 
  manually via GitHub Actions "Run workflow" for on-demand deep analysis

## Roadmap
- [x] Project scaffold + CI setup
- [x] CRUD API tests (JSONPlaceholder)
- [x] Auth flow tests (Reqres)
- [x] Reusable API client + fixtures
- [x] Schema validation (Zod)
- [x] Negative/error test coverage
- [x] k6 load, steady-load, stress, and spike testing
- [x] CI integration with manual performance triggers

## Status
✅ Complete 

## Known Limitations
- Reqres.in's documentation initially suggested API key requirements that 
  turned out to only apply to their paid Projects feature — tests were 
  adjusted based on verified, empirical API behavior.