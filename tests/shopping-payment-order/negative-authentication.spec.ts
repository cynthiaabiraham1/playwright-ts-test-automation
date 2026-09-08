import { test, expect } from '@playwright/test';

test.describe('Shopping, Checkout, Payment, and Order Test Plan', () => {
  test('Reject invalid login credentials', async ({ page }) => {
    // 1. Open the login page.
    await page.goto('https://practicesoftwaretesting.com/auth/login');

    // 2. Enter the demo account email and invalid password.
    await page.locator('[data-test="email"]').fill('admin@practicesoftwaretesting.com');
    await page.locator('[data-test="password"]').fill('wrongpass1');

    // 3. Submit the invalid login attempt.
    await page.locator('[data-test="login-submit"]').click();

    // 4. Verify the authentication error.
    await expect(page.getByText('Invalid email or password')).toBeVisible();
    await expect(page).toHaveURL(/\/auth\/login$/);
  });
});
