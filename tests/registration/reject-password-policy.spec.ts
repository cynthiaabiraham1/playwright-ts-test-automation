import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../../pages/registration.page';

test.describe('Registration form positive and negative scenarios', () => {
  test('Reject passwords that violate policy', async ({ page }) => {
    const registration = new RegistrationPage(page);
    // Complete the non-password fields with test data.
    await registration.goto();
    await registration.firstName.fill('Taylor');
    await registration.lastName.fill('Tester');
    await registration.dateOfBirth.fill('1990-01-15');
    await registration.phone.fill('+61412345678');
    await registration.email.fill(`password-${Date.now()}@example.com`);

    // Try a password that violates length and complexity rules.
    await registration.password.fill('abc');
    await registration.submit.click();

    // Verify password validation feedback is visible.
    await expect(page.getByText('Password must be minimal 6')).toBeVisible();
    await expect(page).toHaveURL(/\/auth\/register$/);

    // Replace it with a compliant password.
    await registration.password.fill('Valid@123');
    await expect(registration.password).toHaveValue('Valid@123');
  });
});
