import { env } from '../../../src/config/env';
import { test } from '../../../src/fixtures/test-fixtures';
import { SauceApp } from '../../../src/pages/saucedemo/sauce-app';

test.describe('@reference @web SauceDemo login', () => {
  test('@smoke standard user can login and see inventory', async ({ page }) => {
    const app = new SauceApp(page);
    await app.login.goto();
    await app.login.login(env.credentials.username, env.credentials.password);
    await app.inventory.expectLoaded();
  });

  test('@negative locked user cannot login', async ({ page }) => {
    const app = new SauceApp(page);
    await app.login.goto();
    await app.login.login('locked_out_user', 'secret_sauce');
    await app.login.expectLoginError('Sorry, this user has been locked out.');
  });
});
