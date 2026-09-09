import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../../pages/registration.page';

test.describe('Registration form positive and negative scenarios', () => {
  test('Reject a blank submission', async ({ page }) => {
    const registration = new RegistrationPage(page);
    // Start from a fresh registration page and submit without entering data.
    await registration.goto();
    await registration.submit.click();

    // Verify required-field errors are visible.
    await expect(page.getByText('First name is required')).toBeVisible();
    await expect(page.getByText('Email is required')).toBeVisible();
    await expect(page.getByText('Password is required')).toBeVisible();
    await expect(page).toHaveURL(/\/auth\/register$/);
  });
});
