# Shopping, Checkout, Payment, and Order Test Plan

## Application Overview

Comprehensive functional test plan for the Practice Software Testing demo storefront. It covers authentication, product discovery, cart management, checkout progression, billing validation, demo credit-card payment, order confirmation, and negative scenarios. Tests must use the demo account and test payment data only; no real payment details should be used.

## Test Scenarios

### 1. Storefront shopping and checkout

**Seed:** `tests/seed.spec.ts`

#### 1.1. Sign in and add Hammer products before checkout

**File:** `tests/shopping-payment-order/positive-shopping-checkout.spec.ts`

**Steps:**
  1. Starting from a fresh browser state, open https://practicesoftwaretesting.com/ and navigate to the login page.
    - expect: The storefront and login page load successfully.
  2. Enter admin@practicesoftwaretesting.com and password welcome01, then select Login.
    - expect: The user is authenticated and redirected to the dashboard.
  3. Open the Hammer product and select Add to cart.
    - expect: An item-added confirmation is shown.
  4. Open the Claw Hammer product and select Add to cart.
    - expect: An item-added confirmation is shown.
  5. Open the cart/checkout page.
    - expect: Hammer and Claw Hammer are listed once each.
    - expect: The displayed total is $24.06.
  6. Select Proceed to checkout, continue through the signed-in step, and advance to Billing Address.
    - expect: The Billing Address step is displayed.
    - expect: The order is not submitted.

#### 1.2. Complete checkout with demo credit-card payment

**File:** `tests/shopping-payment-order/positive-payment-order.spec.ts`

**Steps:**
  1. Starting from a fresh browser state, sign in with the demo account and add Hammer and Claw Hammer to the cart.
    - expect: Both products are present in the cart.
  2. Proceed through the cart and signed-in checkout steps to the billing form.
    - expect: The billing address form is displayed.
  3. Select Australia and enter postcode 2000, house number 42, street George Street, city Sydney, and state NSW.
    - expect: All billing fields contain the supplied values.
  4. Continue to the Payment step and select Credit Card.
    - expect: Credit-card fields are displayed.
    - expect: The Confirm button becomes available only after valid payment details are entered.
  5. Enter demo card number 4111-1111-1111-1111, expiration date 12/2030, CVV 123, and cardholder name Test Customer.
    - expect: The payment details are accepted as valid demo data.
  6. Select Confirm.
    - expect: Payment was successful is displayed.
    - expect: The test order is completed.
    - expect: No real payment information is used.

#### 1.3. Reject invalid login credentials

**File:** `tests/shopping-payment-order/negative-authentication.spec.ts`

**Steps:**
  1. Starting from a fresh browser state, open the login page.
    - expect: The login form is displayed.
  2. Enter admin@practicesoftwaretesting.com and the syntactically valid but incorrect password wrongpass1, then select Login.
    - expect: The user remains on the login page.
    - expect: Invalid email or password is displayed.
    - expect: The user is not authenticated.
  3. Enter an invalidly short password such as invalid-password only if the application treats it as a policy-invalid value, then submit.
    - expect: The appropriate password validation message is displayed.
    - expect: Authentication does not occur.

#### 1.4. Prevent checkout with incomplete billing information

**File:** `tests/shopping-payment-order/negative-checkout-validation.spec.ts`

**Steps:**
  1. Starting from a fresh browser state, sign in and add Hammer and Claw Hammer to the cart.
    - expect: Both products are present in the cart.
  2. Proceed to the billing address step and leave required billing fields incomplete.
    - expect: The billing form remains visible.
  3. Select Proceed to checkout without completing the billing address.
    - expect: The checkout does not advance to payment.
    - expect: The billing step remains available for correction.
    - expect: No order or payment is submitted.

#### 1.5. Reject invalid payment details

**File:** `tests/shopping-payment-order/negative-payment-validation.spec.ts`

**Steps:**
  1. Starting from a fresh browser state, sign in, add Hammer and Claw Hammer, complete the billing address with valid demo values, and open the Payment step.
    - expect: The Payment step is displayed.
  2. Select Credit Card and enter an incorrectly formatted expiration date such as 12/30.
    - expect: The message Invalid date format. Use MM/YYYY. is displayed.
    - expect: Confirm remains disabled or payment cannot be submitted.
  3. Replace the expiration date with 12/2030 and leave one or more required card fields empty, then attempt to confirm.
    - expect: The payment cannot be completed.
    - expect: The user remains on the Payment step with fields available for correction.
  4. Enter valid demo payment data and confirm.
    - expect: Payment succeeds only after all required payment fields are valid.
