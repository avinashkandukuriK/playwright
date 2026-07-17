import { env, hasRuntimeCredentials } from '../../../src/config/env';
import { expect, test } from '../../../src/fixtures/test-fixtures';

test.describe('@web @smoke ecommerce order flow', () => {
  test.beforeEach(() => {
    test.skip(!hasRuntimeCredentials(), 'Set TEST_USERNAME and TEST_PASSWORD to run authenticated order tests.');
  });

  test('customer can place an order and find it in order history', async ({ app, orderData }) => {
    await app.login.goto();
    await app.login.login(orderData.username, orderData.password);

    await app.dashboard.addProductToCart(orderData.productName);
    await app.dashboard.openCart();

    await app.cart.expectProductVisible(orderData.productName);
    await app.cart.checkout();

    await app.ordersReview.selectCountry(orderData.countryCode, orderData.countryName);
    const orderId = await app.ordersReview.submitOrderAndGetOrderId();

    await app.dashboard.openOrders();
    await app.ordersHistory.openOrder(orderId);
    await app.ordersHistory.expectOrderId(orderId);

    expect(env.environment).toBeDefined();
  });
});
