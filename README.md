# API + Performance Testing Project

## Overview
Dedicated project for REST API testing (Playwright) and performance/load 
testing (k6) — part of a multi-stack QA portfolio build.

## Tech Stack
- Playwright (API testing)
- k6 (performance/load testing)
- TypeScript
- GitHub Actions (CI/CD)

## Roadmap
- [x] Project scaffold + CI setup
- [x] CRUD API tests (JSONPlaceholder)
- [x] Auth flow tests (Reqres)
- [x] Schema validation (Zod)
- [x] Negative/error test coverage (400/404)
- [ ] Performance testing (k6)

## Status
🚧 Work in progress

## Known Limitations
- Reqres.in's public documentation initially suggested all `/api/*` endpoints 
  require an `x-api-key` header. Empirical testing revealed that only the 
  paid "Projects/Collections" feature enforces this — the classic demo 
  endpoints (`/users`, `/login`, `/register`) used in this suite are public 
  and require no authentication. Tests were adjusted to reflect actual, 
  verified API behavior rather than assumed behavior.