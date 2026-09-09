import { test, expect } from '@playwright/test';
import { CheckoutPage } from '../../pages/checkout.page';
import { LoginPage } from '../../pages/login.page';
import { ProductPage } from '../../pages/product.page';

test('Reject invalid payment expiration date', async ({ page }) => {
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
  await checkout.useCreditCard('4111-1111-1111-1111', '12/30', '123', 'Test Customer');

  await expect(page.getByText('Invalid date format. Use MM/YYYY.')).toBeVisible();
  await expect(checkout.finish).toBeDisabled();
});
