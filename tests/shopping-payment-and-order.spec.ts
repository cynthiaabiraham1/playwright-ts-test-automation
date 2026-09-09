import { test, expect } from '@playwright/test';
import { CheckoutPage } from '../pages/checkout.page';
import { LoginPage } from '../pages/login.page';
import { ProductPage } from '../pages/product.page';

test('Place an order with Hammer and Claw Hammer using demo payment', async ({ page }) => {
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
  await checkout.expectCartContainsProducts();
  await checkout.openBilling();
  await checkout.fillBillingAddress({
    country: 'AU',
    postalCode: '2000',
    houseNumber: '42',
    street: 'George Street',
    city: 'Sydney',
    state: 'NSW',
  });
  await checkout.openPayment();
  await checkout.useCreditCard('4111-1111-1111-1111', '12/2030', '123', 'Test Customer');
  await checkout.finish.click();
  await expect(page.getByText('Payment was successful')).toBeVisible();
});
