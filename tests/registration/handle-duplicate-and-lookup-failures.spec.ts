import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../../pages/registration.page';

test.describe('Registration form positive and negative scenarios', () => {
  test('Handle duplicate emails and address lookup failures', async ({ page }) => {
    const registration = new RegistrationPage(page);
    // Start from a fresh registration page.
    await registration.goto();

    // Use an invalid postal code to exercise address lookup failure handling.
    await registration.country.selectOption('AU');
    await registration.postalCode.fill('0000');
    await registration.houseNumber.fill('999999');
    await expect(registration.street).toBeEditable();

    // Attempt submission with unresolved required address data.
    await registration.email.fill('existing@example.com');
    await registration.password.fill('Valid@123');
    await registration.submit.click();

    // Verify the page remains on registration rather than showing false success.
    await expect(page).toHaveURL(/\/auth\/register$/);
  });
});
