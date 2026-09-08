import { test, expect } from '@playwright/test';

test.describe('Registration form positive and negative scenarios', () => {
  test('Register with valid data', async ({ page }) => {
    // Start from a fresh registration page.
    await page.goto('https://practicesoftwaretesting.com/auth/register');

    // Enter valid names, date of birth, phone number, and a unique email address.
    await page.locator('#first_name').fill('Taylor');
    await page.locator('#last_name').fill('Tester');
    await page.locator('#dob').fill('1990-01-15');
    await page.locator('#phone').fill('+61412345678');
    await page.locator('#email').fill(`test-${Date.now()}@example.com`);

    // Select Australia, enter a valid postal code and house number, and wait for lookup.
    await page.locator('#country').selectOption('AU');
    await page.locator('#postal_code').fill('2000');
    await page.locator('#house_number').fill('42');
    await expect(page.locator('#street')).not.toHaveValue('', { timeout: 5000 });

    // Enter a compliant password and submit the registration.
    await page.locator('#password').fill('Valid@123');
    await page.locator('button[type="submit"]').click();

    // Verify the form proceeds without validation errors.
    await expect(page.locator('#email')).not.toHaveClass(/is-invalid/);
  });
});
