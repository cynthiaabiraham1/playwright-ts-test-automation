import { test, expect } from '@playwright/test';

test.describe('Shopping, Checkout, Payment, and Order Test Plan', () => {
  test('Place an order with Hammer and Claw Hammer using demo payment', async ({ page }) => {
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

    // 3. Verify the cart contents and total.
    await page.goto('https://practicesoftwaretesting.com/checkout');
    await expect(page.getByRole('row', { name: /Hammer Quantity for Hammer/ })).toBeVisible();
    await expect(page.getByRole('row', { name: /Claw Hammer Quantity for Claw Hammer/ })).toBeVisible();
    await expect(page.getByText('$24.06')).toBeVisible();

    // 4. Complete the billing address.
    await page.locator('[data-test="proceed-1"]').click();
    await page.locator('[data-test="proceed-2"]').click();
    await page.locator('[data-test="country"]').selectOption('AU');
    await page.locator('[data-test="postal_code"]').fill('2000');
    await page.locator('[data-test="house_number"]').fill('42');
    await page.locator('[data-test="street"]').fill('George Street');
    await page.locator('[data-test="city"]').fill('Sydney');
    await page.locator('[data-test="state"]').fill('NSW');
    await page.locator('[data-test="proceed-3"]').click();

    // 5. Submit valid demo payment details.
    await page.locator('[data-test="payment-method"]').selectOption('credit-card');
    await page.locator('[data-test="credit_card_number"]').fill('4111-1111-1111-1111');
    await page.locator('[data-test="expiration_date"]').fill('12/2030');
    await page.locator('[data-test="cvv"]').fill('123');
    await page.locator('[data-test="card_holder_name"]').fill('Test Customer');

    // 6. Verify payment success.
    await page.locator('[data-test="finish"]').click();
    await expect(page.getByText('Payment was successful')).toBeVisible();
  });
});
