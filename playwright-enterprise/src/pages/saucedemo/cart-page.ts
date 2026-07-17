import { expect, type Page } from '@playwright/test';

export class SauceCartPage {
  constructor(private readonly page: Page) {}

  async expectProduct(productName: string): Promise<void> {
    await expect(this.page.locator('[data-test="inventory-item-name"]')).toContainText(productName);
  }

  async checkout(): Promise<void> {
    await this.page.locator('[data-test="checkout"]').click();
  }
}
