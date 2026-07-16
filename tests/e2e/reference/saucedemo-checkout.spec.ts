import { env } from '../../../src/config/env';
import { expect, test } from '../../../src/fixtures/test-fixtures';
import { SauceApp } from '../../../src/pages/saucedemo/sauce-app';

test.describe('@reference @web @smoke SauceDemo checkout', () => {
  test('standard user can complete a checkout from command line or portal mode', async ({ page }) => {
    const app = new SauceApp(page);
    const productName = 'Sauce Labs Backpack';

    await app.login.goto();
    await app.login.login(env.credentials.username, env.credentials.password);

    await app.inventory.expectLoaded();
    await app.inventory.addProduct(productName);
    await app.inventory.openCart();

    await app.cart.expectProduct(productName);
    await app.cart.checkout();

    await app.checkout.enterCustomerInfo('Automation', 'User', '60007');
    await app.checkout.finishOrder();
    await app.checkout.expectOrderComplete();

    expect(process.env.PORTAL_MODE || 'false').toBeDefined();
  });
});
