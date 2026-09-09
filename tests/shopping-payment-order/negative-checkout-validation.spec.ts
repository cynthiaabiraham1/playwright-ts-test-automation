import { test, expect } from '@playwright/test';
import { CheckoutPage } from '../../pages/checkout.page';
import { LoginPage } from '../../pages/login.page';
import { ProductPage } from '../../pages/product.page';

test('Prevent checkout with incomplete billing information', async ({ page }) => {
  const login = new LoginPage(page);
  const product = new ProductPage(page);
  const checkout = new CheckoutPage(page);

  await login.goto();
  await login.login('admin@practicesoftwaretesting.com', 'welcome01');
  await login.expectDashboard();
  await product.goto('01M203YEW5XJBP338BYVZK6WNG');
  await product.addToCartAndConfirm();
  await product.goto('01M203YEW7JJW6VMJDK3WKPQSC');
  await product.addToCartAndConfirm();

  await checkout.goto();
  await checkout.openBilling();
  await expect(checkout.proceedFromBilling).toBeDisabled();
  await expect(page.getByText('Billing Address3')).toBeVisible();
});
