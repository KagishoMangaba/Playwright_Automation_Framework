import { Page, Locator } from '@playwright/test';
import { Logger } from '../utils/logger';
import { InteractUtil } from '../utils/Interact';

export class CheckoutOverviewPage {
    private readonly finishButton: Locator;
    private readonly cancelButton: Locator;

    private readonly log: Logger;
    private readonly interact: InteractUtil;

    constructor(private readonly page: Page) {
        this.log      = new Logger('CheckoutOverviewPage');
        this.interact = new InteractUtil(this.log);
        this.finishButton = page.locator('#finish');
        this.cancelButton = page.locator('#cancel');
    }

    async clickFinish(): Promise<void> {
        await this.interact.click(this.finishButton, 'Finish Button');
    }

    async clickCancel(): Promise<void> {
        await this.interact.click(this.cancelButton, 'Cancel Button');
    }

    async hasItem(itemName: string): Promise<boolean> {
        const item = this.page.locator('.inventory_item_name', { hasText: itemName });
        const count = await this.interact.getCount(item, `Item - ${itemName}`);
        return count > 0;
    }
}