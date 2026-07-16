import type { Page } from '@playwright/test';
import { CartPage } from './cart-page';
import { DashboardPage } from './dashboard-page';
import { LoginPage } from './login-page';
import { OrdersHistoryPage } from './orders-history-page';
import { OrdersReviewPage } from './orders-review-page';

export class Application {
  readonly login: LoginPage;
  readonly dashboard: DashboardPage;
  readonly cart: CartPage;
  readonly ordersReview: OrdersReviewPage;
  readonly ordersHistory: OrdersHistoryPage;

  constructor(page: Page) {
    this.login = new LoginPage(page);
    this.dashboard = new DashboardPage(page);
    this.cart = new CartPage(page);
    this.ordersReview = new OrdersReviewPage(page);
    this.ordersHistory = new OrdersHistoryPage(page);
  }
}
