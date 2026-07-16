import type { Page } from '@playwright/test';
import { SauceCartPage } from './cart-page';
import { SauceCheckoutPage } from './checkout-page';
import { SauceInventoryPage } from './inventory-page';
import { SauceLoginPage } from './login-page';

export class SauceApp {
  readonly login: SauceLoginPage;
  readonly inventory: SauceInventoryPage;
  readonly cart: SauceCartPage;
  readonly checkout: SauceCheckoutPage;

  constructor(page: Page) {
    this.login = new SauceLoginPage(page);
    this.inventory = new SauceInventoryPage(page);
    this.cart = new SauceCartPage(page);
    this.checkout = new SauceCheckoutPage(page);
  }
}
