import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../../pages/registration.page';

test.describe('Registration form positive and negative scenarios', () => {
  test('Reject malformed date, phone, email, and address values', async ({ page }) => {
    const registration = new RegistrationPage(page);
    // Start from a fresh registration page.
    await registration.goto();

    // Enter malformed date, phone, email, and address values.
    await registration.dateOfBirth.fill('not-a-date');
    await registration.phone.fill('abc');
    await registration.email.fill('invalid-email');
    await registration.postalCode.fill('invalid');
    await registration.houseNumber.fill('not-a-number');
    await registration.submit.click();

    // Verify validation feedback blocks submission.
    await expect(page.getByText('Please enter a valid date in')).toBeVisible();
    await expect(page).toHaveURL(/\/auth\/register$/);
  });
});
