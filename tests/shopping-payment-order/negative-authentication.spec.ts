import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';

test('Reject invalid login credentials', async ({ page }) => {
  const login = new LoginPage(page);

  await login.goto();
  await login.login('admin@practicesoftwaretesting.com', 'wrongpass1');
  await expect(page.getByText('Invalid email or password')).toBeVisible();
  await expect(page).toHaveURL(/\/auth\/login$/);
});
