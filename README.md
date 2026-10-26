# Playwright Automation Framework

TypeScript Playwright framework for **UI** and **API** tests, with GitHub Actions CI.

## Stack

- Playwright Test
- TypeScript (strict)
- Page Object Model for UI
- API client layer for HTTP tests
- Shared fixtures

## Project layout

```
src/
  api/          API clients
  config/       environment config
  fixtures/     Playwright fixtures
  pages/        page objects
  types/        shared types
tests/
  ui/           browser tests
  api/          HTTP tests
.github/workflows/playwright.yml
```

## Setup

```bash
nvm use
npm install
npx playwright install --with-deps
cp .env.example .env
```

## Run tests

```bash
npm test              # UI (Chromium, Firefox, WebKit) + API
npm run test:ui       # UI browsers only
npm run test:api      # API only
npm run test:chromium # Chromium UI only
npm run typecheck     # TypeScript check (also runs in CI)
npm run report        # open last HTML report
```
