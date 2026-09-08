import { test, expect } from '@playwright/test';

test.describe('Registration form positive and negative scenarios', () => {
  test('Reject malformed date, phone, email, and address values', async ({ page }) => {
    // Start from a fresh registration page.
    await page.goto('https://practicesoftwaretesting.com/auth/register');

    // Enter malformed date, phone, email, and address values.
    await page.locator('#dob').fill('not-a-date');
    await page.locator('#phone').fill('abc');
    await page.locator('#email').fill('invalid-email');
    await page.locator('#postal_code').fill('invalid');
    await page.locator('#house_number').fill('not-a-number');
    await page.locator('button[type="submit"]').click();

    // Verify validation feedback blocks submission.
    await expect(page.getByText('Please enter a valid date in')).toBeVisible();
    await expect(page).toHaveURL(/\/auth\/register$/);
  });
});
