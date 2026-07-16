import { request } from '@playwright/test';
import { EcommerceApi } from '../../../src/api/ecommerce-api';
import { env, hasRuntimeCredentials } from '../../../src/config/env';
import { expect, test } from '../../../src/fixtures/test-fixtures';

test.describe('@api @smoke ecommerce auth api', () => {
  test.beforeEach(() => {
    test.skip(!hasRuntimeCredentials(), 'Set TEST_USERNAME and TEST_PASSWORD to run authenticated API tests.');
  });

  test('customer can authenticate through API', async () => {
    const apiContext = await request.newContext();
    const api = new EcommerceApi(apiContext);

    const token = await api.login(env.credentials.username, env.credentials.password);

    expect(token).toBeTruthy();
    await apiContext.dispose();
  });
});
