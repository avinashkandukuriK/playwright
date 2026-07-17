import { expect, type Locator, type Page } from '@playwright/test';

export class SauceInventoryPage {
  private readonly page: Page;
  private readonly title: Locator;
  private readonly inventoryItems: Locator;
  private readonly cartBadge: Locator;
  private readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.title).toHaveText('Products');
    await expect(this.inventoryItems).toHaveCount(6);
  }

  async addProduct(productName: string): Promise<void> {
    const item = this.inventoryItems.filter({ hasText: productName });
    await item.locator('button').click();
    await expect(this.cartBadge).toHaveText('1');
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }
}
