# Playwright Test Project

End-to-end tests for the [Practice Software Testing](https://practicesoftwaretesting.com/) demo application, built with Playwright and TypeScript.

## Prerequisites

- Node.js 18 or later
- npm

## Installation

Install the project dependencies:

```bash
npm install
```

Install the Playwright browser binaries:

```bash
npx playwright install
```

## Running tests

Run the complete test suite:

```bash
npx playwright test
```

Run tests in a specific browser:

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

Run a specific test file:

```bash
npx playwright test tests/registration/register-with-valid-data.spec.ts
```

Run tests with the browser UI visible:

```bash
npx playwright test --headed
```

## Viewing the test report

Playwright generates an HTML report after a test run. Open it with:

```bash
npx playwright show-report
```

## Project structure

```text
.
├── fixtures/            # Reusable Playwright fixtures
├── pages/               # Page Object Model classes
├── tests/               # Playwright test suites
│   ├── authentication/  # Authentication fixture scenarios
│   ├── registration/    # Registration form scenarios
│   └── shopping-payment-order/
│                        # Shopping, checkout, and payment scenarios
├── TestPlans/          # Test plans for the supported scenarios
└── playwright.config.ts
```

## Framework approach

### Page Object Model (POM)

Pages in the `pages/` directory use the Page Object Model. Each page class groups its locators and common actions, such as navigating to a page, filling a form, or checking an expected result. Tests can therefore focus on business behavior instead of repeating selectors and low-level browser actions.

For example, [`LoginPage`](./pages/login.page.ts) provides `goto()`, `login()`, and `expectDashboard()` methods that are reused by authentication and shopping tests.

### Fixtures

Reusable test setup is defined in [`fixtures/auth.fixture.ts`](./fixtures/auth.fixture.ts). Its `authenticatedPage` fixture logs in with the demo account before the test runs and provides the already-authenticated page to the test.

The fixture is used by [`authenticated-dashboard.spec.ts`](./tests/authentication/authenticated-dashboard.spec.ts):

```ts
import { expect, test } from '../../fixtures/auth.fixture';

test('Open the dashboard as an authenticated user', async ({ authenticatedPage }) => {
  await expect(authenticatedPage).toHaveURL(/\/admin\/dashboard$/);
});
```

## Test configuration

The test configuration is defined in [`playwright.config.ts`](./playwright.config.ts).

- Base URL: `https://practicesoftwaretesting.com`
- Browsers: Chromium, Firefox, and WebKit
- Test workers: 1
- Reporter: HTML
- Retries: enabled on CI only

The shopping and checkout tests use the demo account and demo payment details documented in the test plans. Do not use real payment information.
