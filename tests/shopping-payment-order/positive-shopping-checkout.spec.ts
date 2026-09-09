import { test, expect } from '@playwright/test';
import { CheckoutPage } from '../../pages/checkout.page';
import { LoginPage } from '../../pages/login.page';
import { ProductPage } from '../../pages/product.page';

test('Sign in and add Hammer products before checkout', async ({ page }) => {
  const login = new LoginPage(page);
  const product = new ProductPage(page);
  const checkout = new CheckoutPage(page);

  await login.goto();
  await login.login('admin@practicesoftwaretesting.com', 'welcome01');
  await login.expectDashboard();

  await product.gotoByName('Hammer');
  await product.addToCartAndConfirm();
  await product.gotoByName('Claw Hammer');
  await product.addToCartAndConfirm();

  await checkout.goto();
  await checkout.expectCartContainsProducts();
  await checkout.openBilling();
});
