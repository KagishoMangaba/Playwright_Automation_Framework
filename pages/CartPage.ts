import { Page, Locator } from '@playwright/test';
import { Logger } from '../utils/logger';
import { InteractUtil } from '../utils/Interact';

export class CartPage {
    private readonly cartItems: Locator;
    private readonly checkoutButton: Locator;
    private readonly items: Locator;

    private readonly log: Logger;
    private readonly interact: InteractUtil;

    constructor(private readonly page: Page) {
        this.log      = new Logger('CartPage');
        this.interact = new InteractUtil(this.log);
        this.cartItems      = page.locator('.cart_item');
        this.checkoutButton = page.locator('#checkout');
        this.items          = page.locator('.inventory_item_name');
    }

    async getCartCount(): Promise<number> {
        return await this.interact.getCount(this.cartItems, 'Cart Items');
    }   


    async removeItem(itemName: string): Promise<void> {
        const removeBtn = this.cartItems
            .filter({ hasText: itemName })
            .locator('.btn.btn_secondary.btn_small.cart_button');
        await this.interact.click(removeBtn, `Remove Button - ${itemName}`);
    }


    async proceedToCheckout(): Promise<void> {
        await this.interact.click(this.checkoutButton, 'Checkout Button');
    }


    async verifyProductExists(itemName: string): Promise<boolean> {
        const contents = await this.items.allTextContents();
        this.log.info(`Checking if "${itemName}" exists in cart`);
        return contents.includes(itemName);
    }
}