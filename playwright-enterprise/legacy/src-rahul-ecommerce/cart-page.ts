import { expect, type Locator, type Page } from '@playwright/test';

export class CartPage {
  private readonly page: Page;
  private readonly firstCartLine: Locator;
  private readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstCartLine = page.locator('div li').first();
    this.checkoutButton = page.getByText('Checkout');
  }

  async expectProductVisible(productName: string): Promise<void> {
    await this.firstCartLine.waitFor();
    await expect(this.page.locator(`h3:has-text("${productName}")`)).toBeVisible();
  }

  async checkout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
