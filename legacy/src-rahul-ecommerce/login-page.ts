import type { Locator, Page } from '@playwright/test';

export class LoginPage {
  private readonly page: Page;
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly signInButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#userEmail');
    this.passwordInput = page.locator('#userPassword');
    this.signInButton = page.locator("[value='Login']");
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
    await this.page.waitForLoadState('networkidle');
  }
}
