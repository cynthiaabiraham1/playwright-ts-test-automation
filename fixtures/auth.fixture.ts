import { Page, test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

type AuthFixtures = {
  authenticatedPage: Page;
};

export const test = base.extend<AuthFixtures>({
  authenticatedPage: async ({ page }, use) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.login('admin@practicesoftwaretesting.com', 'welcome01');
    await login.expectDashboard();

    await use(page);
  },
});

export { expect } from '@playwright/test';
