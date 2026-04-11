import { Page, Locator, expect } from '@playwright/test';

export class ConfirmationPage {
  private readonly confirmationMessage: Locator;

  constructor(private page: Page) {
    this.confirmationMessage = page.locator('.complete-header');
  }

  getConfirmationMessage(): Locator {
    return this.confirmationMessage;
  }

  async assertConfirmationMessageVisible(): Promise<void> {
    await expect(this.confirmationMessage).toBeVisible();
  }

  async assertConfirmationMessageText(expectedText: string): Promise<void> {
    await expect(this.confirmationMessage).toHaveText(expectedText);
  }
}