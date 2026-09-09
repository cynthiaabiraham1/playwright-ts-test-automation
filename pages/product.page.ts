import { expect, Locator, Page } from '@playwright/test';

export class ProductPage {
  readonly addToCart: Locator;

  constructor(private readonly page: Page) {
    this.addToCart = page.locator('[data-test="add-to-cart"]');
  }

  async goto(productId: string) {
    await this.page.goto(`/product/${productId}`);
  }

  async addToCartAndConfirm() {
    await this.addToCart.click();
    await expect(this.page.getByRole('alert')).toContainText('Product added to shopping cart.');
  }
}
