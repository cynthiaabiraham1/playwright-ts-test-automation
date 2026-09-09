import { test, expect } from '@playwright/test';
import { CheckoutPage } from '../pages/checkout.page';
import { LoginPage } from '../pages/login.page';
import { ProductPage } from '../pages/product.page';

test('Sign in, add hammer products, reach checkout, and validate negative scenarios', async ({ page }) => {
  const login = new LoginPage(page);
  const product = new ProductPage(page);
  const checkout = new CheckoutPage(page);

  await page.goto('/');
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

  await login.goto();
  await login.login('admin@practicesoftwaretesting.com', 'wrongpass1');
  await expect(page.getByText('Invalid email or password')).toBeVisible();
  await login.login('admin@practicesoftwaretesting.com', 'welcome01');
  await login.expectDashboard();
  await checkout.goto();
  await checkout.openBilling();
  await expect(checkout.proceedFromBilling).toBeDisabled();
});
