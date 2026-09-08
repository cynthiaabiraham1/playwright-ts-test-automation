import { test, expect } from '@playwright/test';

test.describe('Shopping, Checkout, Payment, and Order Test Plan', () => {
  test('Sign in and add Hammer products before checkout', async ({ page }) => {
    // 1. Sign in with the demo account.
    await page.goto('https://practicesoftwaretesting.com/auth/login');
    await page.locator('[data-test="email"]').fill('admin@practicesoftwaretesting.com');
    await page.locator('[data-test="password"]').fill('welcome01');
    await page.locator('[data-test="login-submit"]').click();
    await expect(page).toHaveURL(/\/admin\/dashboard$/);

    // 2. Add Hammer and Claw Hammer to the cart.
    await page.goto('https://practicesoftwaretesting.com/product/01M1ZFB5E1H7NF15H8JYKEMQD2');
    await page.locator('[data-test="add-to-cart"]').click();
    await expect(page.getByRole('alert')).toContainText('Product added to shopping cart.');
    await page.goto('https://practicesoftwaretesting.com/product/01M1ZFB5E5WRW299REAHRH8SRB');
    await page.locator('[data-test="add-to-cart"]').click();
    await expect(page.getByRole('alert')).toContainText('Product added to shopping cart.');

    // 3. Verify both products and the total.
    await page.goto('https://practicesoftwaretesting.com/checkout');
    await expect(page.getByRole('row', { name: /Hammer Quantity for Hammer/ })).toBeVisible();
    await expect(page.getByRole('row', { name: /Claw Hammer Quantity for Claw Hammer/ })).toBeVisible();
    await expect(page.getByText('$24.06')).toBeVisible();

    // 4. Proceed through checkout to Billing Address.
    await page.locator('[data-test="proceed-1"]').click();
    await page.locator('[data-test="proceed-2"]').click();
    await expect(page.getByText('Billing Address3')).toBeVisible();
  });
});
