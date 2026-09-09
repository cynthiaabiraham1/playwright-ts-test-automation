# Playwright Test Project

End-to-end tests for the [Practice Software Testing](https://practicesoftwaretesting.com/) demo application, built with Playwright and TypeScript.

## Prerequisites

- Node.js 18 or later
- npm
- Java 8 or later (required to generate Allure reports)

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

## Allure reporting

This project generates Allure results through `allure-playwright`. The Allure command-line tool requires Java.

Run the tests and generate an Allure HTML report in one command:

```bash
npm run test:allure
```

Alternatively, generate the report from existing test results:

```bash
npx allure generate allure-results --clean -o allure-report
```

Open the generated Allure report:

```bash
npm run report:allure
```

Allure result files are written to `allure-results/` and the generated report is stored in `allure-report/`. Both directories are excluded from Git.

## CI/CD

GitHub Actions runs the Playwright suite automatically for pushes to `main` and `development`, pull requests targeting `main`, and manual workflow runs.

The workflow is defined in [`.github/workflows/playwright.yml`](./.github/workflows/playwright.yml). It:

1. Installs Node.js dependencies with `npm ci`.
2. Installs Chromium, Firefox, and WebKit with their Linux dependencies.
3. Runs the full Playwright suite.
4. Uploads the HTML Playwright report, test results, and Allure results as workflow artifacts.

Reports can be downloaded from the completed workflow run in the GitHub Actions tab.

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
- Reporters: HTML and Allure
- Retries: enabled on CI only

The shopping and checkout tests use the demo account and demo payment details documented in the test plans. Do not use real payment information.
