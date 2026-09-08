import { test, expect } from '@playwright/test';

test.describe('Shopping, Checkout, Payment, and Order Test Plan', () => {
  test('Prevent checkout with incomplete billing information', async ({ page }) => {
    // 1. Sign in with the demo account and add both Hammer products.
    await page.goto('https://practicesoftwaretesting.com/auth/login');
    await page.locator('[data-test="email"]').fill('admin@practicesoftwaretesting.com');
    await page.locator('[data-test="password"]').fill('welcome01');
    await page.locator('[data-test="login-submit"]').click();
    await expect(page).toHaveURL(/\/admin\/dashboard$/);
    await page.goto('https://practicesoftwaretesting.com/product/01M1ZFB5E1H7NF15H8JYKEMQD2');
    await page.locator('[data-test="add-to-cart"]').click();
    await expect(page.getByRole('alert')).toContainText('Product added to shopping cart.');
    await page.goto('https://practicesoftwaretesting.com/product/01M1ZFB5E5WRW299REAHRH8SRB');
    await page.locator('[data-test="add-to-cart"]').click();
    await expect(page.getByRole('alert')).toContainText('Product added to shopping cart.');

    // 2. Proceed to the billing address step.
    await page.goto('https://practicesoftwaretesting.com/checkout');
    await page.locator('[data-test="proceed-1"]').click();
    await page.locator('[data-test="proceed-2"]').click();

    // 3. Verify the incomplete billing form blocks checkout.
    await expect(page.locator('[data-test="proceed-3"]')).toBeDisabled();
    await expect(page.getByText('Billing Address3')).toBeVisible();
  });
});
