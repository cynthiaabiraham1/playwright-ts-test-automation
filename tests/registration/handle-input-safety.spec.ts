import { test, expect } from '@playwright/test';

test.describe('Registration form positive and negative scenarios', () => {
  test('Safely handle injection-like and excessive input', async ({ page }) => {
    // Start from a fresh registration page.
    await page.goto('https://practicesoftwaretesting.com/auth/register');

    // Enter script-like input into a text field.
    const scriptLikeValue = '<script>alert(1)</script>';
    await page.locator('#first_name').fill(scriptLikeValue);

    // Verify the value is treated as literal data.
    await expect(page.locator('#first_name')).toHaveValue(scriptLikeValue);

    // Enter an excessive value and verify the page remains usable.
    await page.locator('#last_name').fill('x'.repeat(500));
    await expect(page.locator('#last_name')).toHaveValue('x'.repeat(500));
    await expect(page.getByRole('button', { name: 'Register' })).toBeVisible();
  });
});
