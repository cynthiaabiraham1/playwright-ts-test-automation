import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../../pages/registration.page';

test.describe('Registration form positive and negative scenarios', () => {
  test('Safely handle injection-like and excessive input', async ({ page }) => {
    const registration = new RegistrationPage(page);
    // Start from a fresh registration page.
    await registration.goto();

    // Enter script-like input into a text field.
    const scriptLikeValue = '<script>alert(1)</script>';
    await registration.firstName.fill(scriptLikeValue);

    // Verify the value is treated as literal data.
    await expect(registration.firstName).toHaveValue(scriptLikeValue);

    // Enter an excessive value and verify the page remains usable.
    await registration.lastName.fill('x'.repeat(500));
    await expect(registration.lastName).toHaveValue('x'.repeat(500));
    await expect(page.getByRole('button', { name: 'Register' })).toBeVisible();
  });
});
