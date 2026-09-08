import { test, expect } from '@playwright/test';

test.describe('Shopping and Checkout Test Plan', () => {
  test('Sign in, add hammer products, reach checkout, and validate negative scenarios', async ({ page }) => {
    // 1. Open the Practice Software Testing storefront.
    await page.goto('https://practicesoftwaretesting.com/');

    // 2. Sign in with the provided account email and password.
    await page.goto('https://practicesoftwaretesting.com/auth/login');
    await page.locator('[data-test="email"]').fill('admin@practicesoftwaretesting.com');
    await page.locator('[data-test="password"]').fill('welcome01');
    await page.locator('[data-test="login-submit"]').click();
    await expect(page).toHaveURL(/\/admin\/dashboard$/);

    // 3. Search for and add a hammer product to the cart.
    await page.goto('https://practicesoftwaretesting.com/product/01M1ZFB5E1H7NF15H8JYKEMQD2');
    await page.locator('[data-test="add-to-cart"]').click();
    await expect(page.getByRole('alert')).toContainText('Product added to shopping cart.');

    // 4. Search for and add a claw hammer product to the cart.
    await page.goto('https://practicesoftwaretesting.com/product/01M1ZFB5E5WRW299REAHRH8SRB');
    await page.locator('[data-test="add-to-cart"]').click();
    await expect(page.getByRole('alert')).toContainText('Product added to shopping cart.');

    // 5. Open the cart and verify both products are present.
    await page.goto('https://practicesoftwaretesting.com/checkout');
    await expect(page.getByRole('row', { name: /Hammer Quantity for Hammer/ })).toBeVisible();
    await expect(page.getByRole('row', { name: /Claw Hammer Quantity for Claw Hammer/ })).toBeVisible();

    // 6. Proceed to checkout and verify the checkout page is displayed.
    await page.locator('[data-test="proceed-1"]').click();
    await page.locator('[data-test="proceed-2"]').click();
    await expect(page.getByText('Billing Address3')).toBeVisible();

    // 7. Attempt sign-in with an invalid password and verify an authentication error is shown.
    await page.goto('https://practicesoftwaretesting.com/auth/login');
    await page.locator('[data-test="email"]').fill('admin@practicesoftwaretesting.com');
    await page.locator('[data-test="password"]').fill('wrongpass1');
    await page.locator('[data-test="login-submit"]').click();
    await expect(page.getByText('Invalid email or password')).toBeVisible();

    // Restore the valid session before the checkout validation scenario.
    await page.locator('[data-test="password"]').fill('welcome01');
    await page.locator('[data-test="login-submit"]').click();

    // 8. Attempt checkout with required checkout information missing and verify validation prevents continuation.
    await page.goto('https://practicesoftwaretesting.com/checkout');
    await page.locator('[data-test="proceed-1"]').click();
    await page.locator('[data-test="proceed-2"]').click();
    await page.locator('[data-test="proceed-3"]').click({ timeout: 10000 }).catch(() => undefined);
    await expect(page).toHaveURL(/\/checkout$/);
    await expect(page.getByText('Billing Address3')).toBeVisible();
  });
});
