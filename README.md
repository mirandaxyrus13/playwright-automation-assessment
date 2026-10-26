# Playwright Automation Framework

TypeScript Playwright framework for **UI** and **API** tests, with GitHub Actions CI.

## Stack

- Playwright Test
- TypeScript (strict)
- Page Object Model for UI
- API client layer for HTTP tests
- Shared fixtures
- GitHub Actions pipeline (`ubuntu-latest`, Node 22)

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

Sample UI coverage uses [Sauce Demo](https://www.saucedemo.com). Sample API coverage uses [JSONPlaceholder](https://jsonplaceholder.typicode.com).

## CI

On push, pull request, and manual dispatch, `.github/workflows/playwright.yml`:

1. Installs dependencies with `npm ci`
2. Typechecks with `tsc --noEmit`
3. Installs browsers with OS dependencies
4. Runs the full Playwright suite
5. Uploads the HTML report and JUnit/trace artifacts
