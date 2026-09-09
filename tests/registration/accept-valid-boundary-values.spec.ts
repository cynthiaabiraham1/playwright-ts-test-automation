import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../../pages/registration.page';

test.describe('Registration form positive and negative scenarios', () => {
  test('Accept valid boundary values and country selections', async ({ page }) => {
    const registration = new RegistrationPage(page);
    // Start from a fresh registration page.
    await registration.goto();

    // Enter valid boundary-style personal and contact data.
    await registration.firstName.fill('A');
    await registration.lastName.fill('B');
    await registration.dateOfBirth.fill('2000-01-01');
    await registration.phone.fill('+61412345678');
    await registration.email.fill(`boundary-${Date.now()}@example.com`);

    // Verify supported country selections and address lookup.
    await registration.country.selectOption('AU');
    await registration.postalCode.fill('2000');
    await registration.houseNumber.fill('42');
    await expect(registration.street).not.toHaveValue('', { timeout: 5000 });
    await registration.country.selectOption('CA');
    await expect(registration.country).toHaveValue('CA');

    // Enter an 8-character password satisfying all complexity rules.
    await registration.password.fill('Aa1!bbbb');
    await expect(registration.password).not.toHaveClass(/is-invalid/);
  });
});
