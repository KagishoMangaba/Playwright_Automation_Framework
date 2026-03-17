import { Page, Locator } from '@playwright/test';

export class CheckoutOverviewPage {
    readonly finishButton: Locator;
    readonly cancelButton: Locator;

    constructor(private page: Page) {
        this.finishButton = page.locator('#finish');
        this.cancelButton = page.locator('#cancel');
    }

    async clickFinish(): Promise<void> {
        await this.finishButton.click();
    }

    async clickCancel(): Promise<void> {
        await this.cancelButton.click();
    }

    async hasItem(itemName: string): Promise<boolean> {
        const item = this.page.locator('.inventory_item_name', { hasText: itemName });
        return (await item.count()) > 0;
    }
}
