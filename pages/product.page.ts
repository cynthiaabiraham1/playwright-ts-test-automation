import { expect, Locator, Page } from '@playwright/test';

export class ProductPage {
  readonly addToCart: Locator;

  constructor(private readonly page: Page) {
    this.addToCart = page.locator('[data-test="add-to-cart"]');
  }

  async gotoByName(productName: string) {
    const response = await this.page.request.get(
      'https://api.practicesoftwaretesting.com/products?page=0&size=50',
    );
    if (!response.ok()) {
      throw new Error(`Product API request failed with status ${response.status()}`);
    }

    const body = (await response.json()) as {
      data: Array<{ id: string; name: string }>;
    };
    const product = body.data.find(({ name }) => name === productName);
    if (!product) {
      throw new Error(`Product "${productName}" was not found in the product API response`);
    }

    await this.page.goto(`/product/${product.id}`);
    await expect(this.addToCart).toBeVisible();
  }

  async addToCartAndConfirm() {
    await this.addToCart.click();
    await expect(this.page.getByRole('alert')).toContainText('Product added to shopping cart.');
  }
}
