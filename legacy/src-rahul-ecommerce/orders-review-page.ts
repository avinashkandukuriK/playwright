import { expect, type Locator, type Page } from '@playwright/test';

export class OrdersReviewPage {
  private readonly countryInput: Locator;
  private readonly countryDropdown: Locator;
  private readonly submitButton: Locator;
  private readonly orderConfirmationText: Locator;
  private readonly orderId: Locator;

  constructor(page: Page) {
    this.countryInput = page.locator("[placeholder*='Country']");
    this.countryDropdown = page.locator('.ta-results');
    this.submitButton = page.locator('.action__submit');
    this.orderConfirmationText = page.locator('.hero-primary');
    this.orderId = page.locator('.em-spacer-1 .ng-star-inserted');
  }

  async selectCountry(countryCode: string, countryName: string): Promise<void> {
    await this.countryInput.pressSequentially(countryCode);
    await this.countryDropdown.waitFor();
    await this.countryDropdown.locator('button', { hasText: countryName }).click();
  }

  async submitOrderAndGetOrderId(): Promise<string> {
    await this.submitButton.click();
    await expect(this.orderConfirmationText).toHaveText(' Thankyou for the order. ');

    const value = await this.orderId.textContent();

    if (!value) {
      throw new Error('Order confirmation did not include an order id.');
    }

    return value;
  }
}
