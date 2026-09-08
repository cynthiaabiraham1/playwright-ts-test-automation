# Registration Form Test Plan

## Application Overview

Functional test plan for https://practicesoftwaretesting.com/auth/register covering positive registration, required fields, field formats, password policy, address lookup, duplicate accounts, and input safety. Each scenario starts from a fresh registration page and successful-registration cases use isolated unique email data.

## Test Scenarios

### 1. Registration form positive and negative scenarios

**Seed:** `tests/seed.spec.ts`

#### 1.1. Register with valid data

**File:** `tests/registration/positive-registration.spec.ts`

**Steps:**
  1. Start from a fresh registration page.
    - expect: The registration form is displayed with personal, date, country, address, phone, email, password, and Register controls.
  2. Enter valid names, a valid YYYY-MM-DD date of birth, phone number, and a unique email address.
    - expect: The values are accepted without field-level validation errors.
  3. Select Australia, enter postal code 2000 and house number 42, and wait for lookup.
    - expect: Street, city, and state are populated with address data consistent with the selected country and postal code.
  4. Enter a password satisfying every stated rule, such as Valid@123, then click Register.
    - expect: The password-strength feedback updates.
    - expect: Registration succeeds with the application's success confirmation or expected post-registration/sign-in redirect.
    - expect: No validation errors are shown and no duplicate account is created.

#### 1.2. Accept valid boundary values and country selections

**File:** `tests/registration/positive-boundaries.spec.ts`

**Steps:**
  1. Start from a fresh registration page and enter the shortest valid names, a valid date at the supported age boundary, valid contact data, and a unique email.
    - expect: Boundary values that meet the documented rules are accepted.
  2. Select representative supported countries, including Australia and Canada, and use valid postal codes for each.
    - expect: The selected country is retained and address lookup returns country-consistent data.
  3. Enter a password exactly 8 characters long that includes upper and lowercase letters, a number, and a special character.
    - expect: The password is accepted when all required rules are satisfied.
  4. Add surrounding whitespace to non-password fields and submit with otherwise valid data.
    - expect: Whitespace is trimmed or handled consistently without corrupting the submitted values.

#### 1.3. Reject a blank submission

**File:** `tests/registration/negative-required-fields.spec.ts`

**Steps:**
  1. Start from a fresh registration page and click Register without entering any data.
    - expect: The page remains on the registration form.
  2. Review the validation feedback.
    - expect: Required errors are shown for first name, last name, date of birth, country, postal code, house number, street, city, state, phone, email, and password.
    - expect: No account is created and no partial submission is accepted.

#### 1.4. Reject malformed date, phone, email, and address values

**File:** `tests/registration/negative-format-validation.spec.ts`

**Steps:**
  1. Start from a fresh registration page and enter valid values in every field except one invalid value at a time.
    - expect: The valid values are accepted.
  2. Test malformed and impossible dates, including malformed text, an impossible calendar date, and a future date.
    - expect: A clear date-format or date-range error is displayed and submission is blocked.
  3. Test alphabetic or too-short phone values, malformed email values, and invalid postal code or house number values.
    - expect: The relevant field shows a clear validation error and the form does not submit.

#### 1.5. Reject passwords that violate policy

**File:** `tests/registration/negative-password-policy.spec.ts`

**Steps:**
  1. Complete all non-password fields with valid isolated test data.
    - expect: Only the password remains invalid or incomplete.
  2. Try empty, shorter-than-8, lowercase-only, uppercase-only, no-number, no-special-character, whitespace-containing, and invalid-character passwords.
    - expect: Each non-compliant password is rejected with feedback identifying the unmet rule.
    - expect: The strength indicator updates consistently and does not imply an invalid password is acceptable.
  3. Replace the value with a compliant password and submit.
    - expect: The password validation errors clear and the form can proceed if all other fields are valid.

#### 1.6. Handle duplicate emails and address lookup failures

**File:** `tests/registration/negative-duplicate-and-lookup.spec.ts`

**Steps:**
  1. Complete the form with valid data and an email address already associated with an existing account, then submit.
    - expect: Registration is rejected without creating a second account.
    - expect: A clear duplicate-email error is shown and entered values are retained.
  2. Start fresh, select a supported country, and enter an invalid or unavailable postal code and house number.
    - expect: Lookup failure is surfaced clearly and does not silently populate incorrect address data.
  3. Attempt to submit while required address data is unresolved or inconsistent.
    - expect: Submission is blocked until valid address data is provided, without crashing or erasing unrelated values.

#### 1.7. Safely handle injection-like and excessive input

**File:** `tests/registration/negative-input-safety.spec.ts`

**Steps:**
  1. Enter script-like, HTML-like, SQL-like, emoji, very long, and whitespace-only values into text fields one variation at a time.
    - expect: Input is treated as data; no script executes and no markup is rendered as trusted HTML.
  2. Submit each variation with other fields valid.
    - expect: The application either accepts permitted characters or shows a clear validation/length error.
    - expect: The layout remains intact, no unexpected navigation occurs, and no sensitive server details are exposed.
