import { test, expect } from '@playwright/test';

test.describe('Registration form positive and negative scenarios', () => {
  test('Accept valid boundary values and country selections', async ({ page }) => {
    // Start from a fresh registration page.
    await page.goto('https://practicesoftwaretesting.com/auth/register');

    // Enter valid boundary-style personal and contact data.
    await page.locator('#first_name').fill('A');
    await page.locator('#last_name').fill('B');
    await page.locator('#dob').fill('2000-01-01');
    await page.locator('#phone').fill('+61412345678');
    await page.locator('#email').fill(`boundary-${Date.now()}@example.com`);

    // Verify supported country selections and address lookup.
    await page.locator('#country').selectOption('AU');
    await page.locator('#postal_code').fill('2000');
    await page.locator('#house_number').fill('42');
    await expect(page.locator('#street')).not.toHaveValue('', { timeout: 5000 });
    await page.locator('#country').selectOption('CA');
    await expect(page.locator('#country')).toHaveValue('CA');

    // Enter an 8-character password satisfying all complexity rules.
    await page.locator('#password').fill('Aa1!bbbb');
    await expect(page.locator('#password')).not.toHaveClass(/is-invalid/);
  });
});
