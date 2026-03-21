import { Page, Locator } from '@playwright/test';

export class ConfirmationPage {
    readonly confirmationMessage: Locator;


    constructor(private page: Page) {
    this.confirmationMessage = page.locator('.complete-header');


}

 async getConfirmationMessgage() {
        return await this.confirmationMessage.textContent()
    }

}