import { expect, type Page } from '@playwright/test';

export class OrdersHistoryPage {
  constructor(private readonly page: Page) {}

  async openOrder(orderId: string): Promise<void> {
    await this.page.locator('tbody').waitFor();
    const rows = this.page.locator('tbody tr');
    const rowCount = await rows.count();

    for (let index = 0; index < rowCount; index += 1) {
      const rowOrderId = await rows.nth(index).locator('th').textContent();

      if (orderId.includes(rowOrderId?.trim() || '')) {
        await rows.nth(index).locator('button').first().click();
        return;
      }
    }

    throw new Error(`Order was not found in order history: ${orderId}`);
  }

  async expectOrderId(orderId: string): Promise<void> {
    await expect(this.page.locator('.col-text')).toContainText(orderId.replace(/\|/g, '').trim());
  }
}
