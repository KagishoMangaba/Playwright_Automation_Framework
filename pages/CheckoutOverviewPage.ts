import { Page, Locator , expect } from '@playwright/test';
import { Logger } from '../utils/logger';
import { InteractUtil } from '../utils/Interact';
import { L } from '@faker-js/faker/dist/airline-eVQV6kbz';
import console from 'node:console';

export class CheckoutOverviewPage {
    private readonly finishButton: Locator;
    private readonly cancelButton: Locator;

    private readonly productQty: Locator;
    private readonly paymentInformation:Locator;
    private readonly shippingInformation: Locator;
    private readonly itemTotal: Locator;
    private readonly taxAmount: Locator;
    private readonly totalAmount: Locator;

    private readonly log: Logger;
    private readonly interact: InteractUtil;

    constructor(private readonly page: Page) {
        this.log      = new Logger('CheckoutOverviewPage');
        this.interact = new InteractUtil(this.log);
        this.finishButton = page.locator('#finish');
        this.cancelButton = page.locator('#cancel');

        this.productQty = page.locator('.cart_quantity');
        this.paymentInformation = page.locator('[data-test="payment-info-value"]');
        this.shippingInformation = page.locator('[data-test="shipping-info-value"]');
        this.itemTotal = page.locator('[data-test="subtotal-label"]');
        this.taxAmount = page.locator('[data-test="tax-label"]');
        this.totalAmount = page.locator('[data-test="total-label"]')

        

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

   async verifyProductHasCorrectQty(itemName: string, expectedQty: number): Promise<void> {
    const itemContainer = this.page.locator('.cart_item', {
        has: this.page.locator('.inventory_item_name', { hasText: itemName })
    });

    const qty = itemContainer.locator('[data-test="item-quantity"]');
    await expect(qty).toHaveText(String(expectedQty));
    
}

}