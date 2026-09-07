# Playwright Test Project

Cross-browser end-to-end tests for a registration form, built with
[Playwright](https://playwright.dev/).

## Prerequisites

- Node.js
- npm

The Playwright configuration currently runs tests against Chromium, Firefox,
and WebKit.

## Installation

```bash
npm install
npx playwright install
```

## Running tests

Run all tests:

```bash
npx playwright test
```

Run tests in a specific browser:

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

Run tests with the browser visible:

```bash
npx playwright test --headed
```

Run the registration password-policy test:

```bash
npx playwright test tests/registration/reject-password-policy.spec.ts
```

Run tests matching a title:

```bash
npx playwright test -g "Register with valid data"
```

Open the HTML report:

```bash
npx playwright show-report
```

## Project structure

```text
tests/
  example.spec.ts
  seed.spec.ts
  registration/
    accept-valid-boundary-values.spec.ts
    handle-duplicate-and-lookup-failures.spec.ts
    handle-input-safety.spec.ts
    register-with-valid-data.spec.ts
    reject-blank-submission.spec.ts
    reject-malformed-values.spec.ts
    reject-password-policy.spec.ts
```

The registration tests cover valid submissions, boundary values, malformed
input, blank submissions, password policy violations, duplicate records,
address lookup failures, and input-safety scenarios.

Generated reports, dependencies, environment files, and temporary files are
excluded from version control through [`.gitignore`](.gitignore).
