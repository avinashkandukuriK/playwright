import { expect, type Locator, type Page } from '@playwright/test';

export class DashboardPage {
  private readonly page: Page;
  private readonly productCards: Locator;
  private readonly productTitles: Locator;
  private readonly cartLink: Locator;
  private readonly ordersLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productCards = page.locator('.card-body');
    this.productTitles = page.locator('.card-body b');
    this.cartLink = page.locator("[routerlink*='cart']");
    this.ordersLink = page.locator("button[routerlink*='myorders']");
  }

  async addProductToCart(productName: string): Promise<void> {
    await expect(this.productTitles.first()).toBeVisible();
    const productCount = await this.productCards.count();

    for (let index = 0; index < productCount; index += 1) {
      const card = this.productCards.nth(index);

      if ((await card.locator('b').textContent())?.trim() === productName) {
        await card.getByText('Add To Cart').click();
        return;
      }
    }

    throw new Error(`Product not found on dashboard: ${productName}`);
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  async openOrders(): Promise<void> {
    await this.ordersLink.click();
  }
}
