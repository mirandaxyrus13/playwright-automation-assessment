# Playwright Automation Framework

TypeScript Playwright framework for **UI** and **API** tests, with GitHub Actions CI.

## Stack

- Playwright Test
- Data Transfer Object
- Web Elements
- API Core
- Third Party Library
- Page Object Model for UI
- API client layer for HTTP tests
- Shared fixtures

## Project layout

```
src/
  api/          API clients
  config/       environment config
  core/         library, web elements, API core objects
  fixtures/     Playwright fixtures
  pages/        page objects
  dto/          data transfer object
tests/
  ui/           browser tests
  api/          API tests
```

## Setup

```bash
nvm use
npm install
npx playwright install --with-deps
```

## Run tests

```bash
npm run test:test:chrome:ui #UI Chrome Browser Test Runs
npm run test:test:firefox:ui #UI Firefox Browser Test Runs
npm run test:test:webkit:ui #UI WebKit Browser Test Runs   

npm run test:api:test #API Test Runs

```