import { Locator, Page } from '@playwright/test';

export class RegistrationPage {
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly dateOfBirth: Locator;
  readonly phone: Locator;
  readonly email: Locator;
  readonly country: Locator;
  readonly postalCode: Locator;
  readonly houseNumber: Locator;
  readonly street: Locator;
  readonly password: Locator;
  readonly submit: Locator;

  constructor(private readonly page: Page) {
    this.firstName = page.locator('#first_name');
    this.lastName = page.locator('#last_name');
    this.dateOfBirth = page.locator('#dob');
    this.phone = page.locator('#phone');
    this.email = page.locator('#email');
    this.country = page.locator('#country');
    this.postalCode = page.locator('#postal_code');
    this.houseNumber = page.locator('#house_number');
    this.street = page.locator('#street');
    this.password = page.locator('#password');
    this.submit = page.locator('button[type="submit"]');
  }

  async goto() {
    await this.page.goto('/auth/register');
  }
}
