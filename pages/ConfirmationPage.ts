import { Page, Locator } from '@playwright/test';
import { Logger } from '../utils/logger';
import { InteractUtil } from '../utils/Interact';

export class ConfirmationPage {
    private readonly confirmationMessage: Locator;

    private readonly log: Logger;
    private readonly interact: InteractUtil;

    constructor(private readonly page: Page) {
        this.log      = new Logger('ConfirmationPage');
        this.interact = new InteractUtil(this.log);

        this.confirmationMessage = page.locator('.complete-header');
    }

    getConfirmationMessage(): Locator {
        return this.confirmationMessage;
    }

    async getConfirmationMessageText(): Promise<string> {
        return await this.interact.getText(this.confirmationMessage, 'Confirmation Message');
    }

    async isConfirmationMessageVisible(): Promise<boolean> {
        return await this.interact.isVisible(this.confirmationMessage, 'Confirmation Message');
    }
}