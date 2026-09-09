import { expect, Locator, Page } from '@playwright/test';

export class ProductPage {
  readonly addToCart: Locator;

  constructor(private readonly page: Page) {
    this.addToCart = page.locator('[data-test="add-to-cart"]');
  }

  async gotoByName(productName: string) {
    await this.page.goto('/');
    const product = this.page
      .locator('a[href^="/product/"]')
      .filter({ has: this.page.getByRole('heading', { name: productName, exact: true }) })
      .first();

    await product.click();
    await expect(this.addToCart).toBeVisible();
  }

  async addToCartAndConfirm() {
    await this.addToCart.click();
    await expect(this.page.getByRole('alert')).toContainText('Product added to shopping cart.');
  }
}
