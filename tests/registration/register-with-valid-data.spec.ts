import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../../pages/registration.page';

test.describe('Registration form positive and negative scenarios', () => {
  test('Register with valid data', async ({ page }) => {
    const registration = new RegistrationPage(page);
    // Start from a fresh registration page.
    await registration.goto();

    // Enter valid names, date of birth, phone number, and a unique email address.
    await registration.firstName.fill('Taylor');
    await registration.lastName.fill('Tester');
    await registration.dateOfBirth.fill('1990-01-15');
    await registration.phone.fill('+61412345678');
    await registration.email.fill(`test-${Date.now()}@example.com`);

    // Select Australia, enter a valid postal code and house number, and wait for lookup.
    await registration.country.selectOption('AU');
    await registration.postalCode.fill('2000');
    await registration.houseNumber.fill('42');
    await expect(registration.street).not.toHaveValue('', { timeout: 5000 });

    // Enter a compliant password and submit the registration.
    await registration.password.fill('Valid@123');
    await registration.submit.click();

    // Verify the form proceeds without validation errors.
    await expect(registration.email).not.toHaveClass(/is-invalid/);
  });
});
