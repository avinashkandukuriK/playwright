import { expect, type Page } from '@playwright/test';

export class SauceCheckoutPage {
  constructor(private readonly page: Page) {}

  async enterCustomerInfo(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.page.locator('[data-test="firstName"]').fill(firstName);
    await this.page.locator('[data-test="lastName"]').fill(lastName);
    await this.page.locator('[data-test="postalCode"]').fill(postalCode);
    await this.page.locator('[data-test="continue"]').click();
  }

  async finishOrder(): Promise<void> {
    await expect(this.page.locator('[data-test="payment-info-label"]')).toBeVisible();
    await this.page.locator('[data-test="finish"]').click();
  }

  async expectOrderComplete(): Promise<void> {
    await expect(this.page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');
  }
}
