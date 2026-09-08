import { test, expect } from '@playwright/test';

test.describe('Registration form positive and negative scenarios', () => {
  test('Reject passwords that violate policy', async ({ page }) => {
    // Complete the non-password fields with test data.
    await page.goto('https://practicesoftwaretesting.com/auth/register');
    await page.locator('#first_name').fill('Taylor');
    await page.locator('#last_name').fill('Tester');
    await page.locator('#dob').fill('1990-01-15');
    await page.locator('#phone').fill('+61412345678');
    await page.locator('#email').fill(`password-${Date.now()}@example.com`);

    // Try a password that violates length and complexity rules.
    await page.locator('#password').fill('abc');
    await page.locator('button[type="submit"]').click();

    // Verify password validation feedback is visible.
    await expect(page.getByText('Password must be minimal 6')).toBeVisible();
    await expect(page).toHaveURL(/\/auth\/register$/);

    // Replace it with a compliant password.
    await page.locator('#password').fill('Valid@123');
    await expect(page.locator('#password')).toHaveValue('Valid@123');
  });
});
