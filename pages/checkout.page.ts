import { expect, Locator, Page } from '@playwright/test';

export type BillingAddress = {
  country: string;
  postalCode: string;
  houseNumber: string;
  street: string;
  city: string;
  state: string;
};

export class CheckoutPage {
  readonly proceedFromCart: Locator;
  readonly proceedFromSignIn: Locator;
  readonly proceedFromBilling: Locator;
  readonly paymentMethod: Locator;
  readonly finish: Locator;

  constructor(private readonly page: Page) {
    this.proceedFromCart = page.locator('[data-test="proceed-1"]');
    this.proceedFromSignIn = page.locator('[data-test="proceed-2"]');
    this.proceedFromBilling = page.locator('[data-test="proceed-3"]');
    this.paymentMethod = page.locator('[data-test="payment-method"]');
    this.finish = page.locator('[data-test="finish"]');
  }

  async goto() {
    await this.page.goto('/checkout');
  }

  async expectCartContainsProducts() {
    await expect(this.page.getByRole('row', { name: /Hammer Quantity for Hammer/ })).toBeVisible();
    await expect(this.page.getByRole('row', { name: /Claw Hammer Quantity for Claw Hammer/ })).toBeVisible();
    await expect(this.page.getByText('$24.06')).toBeVisible();
  }

  async openBilling() {
    await this.proceedFromCart.click();
    await this.proceedFromSignIn.click();
    await expect(this.page.getByText('Billing Address3')).toBeVisible();
  }

  async fillBillingAddress(address: BillingAddress) {
    await this.page.locator('[data-test="country"]').selectOption(address.country);
    await this.page.locator('[data-test="postal_code"]').fill(address.postalCode);
    await this.page.locator('[data-test="house_number"]').fill(address.houseNumber);
    await this.page.locator('[data-test="street"]').fill(address.street);
    await this.page.locator('[data-test="city"]').fill(address.city);
    await this.page.locator('[data-test="state"]').fill(address.state);
  }

  async openPayment() {
    await this.proceedFromBilling.click();
  }

  async useCreditCard(number: string, expiration: string, cvv: string, holder: string) {
    await this.paymentMethod.selectOption('credit-card');
    await this.page.locator('[data-test="credit_card_number"]').fill(number);
    await this.page.locator('[data-test="expiration_date"]').fill(expiration);
    await this.page.locator('[data-test="cvv"]').fill(cvv);
    await this.page.locator('[data-test="card_holder_name"]').fill(holder);
  }
}
