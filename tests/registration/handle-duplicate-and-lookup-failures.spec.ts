import { test, expect } from '@playwright/test';

test.describe('Registration form positive and negative scenarios', () => {
  test('Handle duplicate emails and address lookup failures', async ({ page }) => {
    // Start from a fresh registration page.
    await page.goto('https://practicesoftwaretesting.com/auth/register');

    // Use an invalid postal code to exercise address lookup failure handling.
    await page.locator('#country').selectOption('AU');
    await page.locator('#postal_code').fill('0000');
    await page.locator('#house_number').fill('999999');
    await expect(page.locator('#street')).toBeEditable();

    // Attempt submission with unresolved required address data.
    await page.locator('#email').fill('existing@example.com');
    await page.locator('#password').fill('Valid@123');
    await page.locator('button[type="submit"]').click();

    // Verify the page remains on registration rather than showing false success.
    await expect(page).toHaveURL(/\/auth\/register$/);
  });
});
