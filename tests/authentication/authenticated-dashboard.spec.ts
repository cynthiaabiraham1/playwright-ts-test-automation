import { expect, test } from '../../fixtures/auth.fixture';

test('Authenticate with the demo account using the auth fixture', async ({ authenticatedPage }) => {
  await expect(authenticatedPage).toHaveURL(/\/admin\/dashboard$/);
});
