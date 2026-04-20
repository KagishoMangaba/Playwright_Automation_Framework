import { Page, Locator } from '@playwright/test';
import { Logger } from '../utils/logger';
import { InteractUtil } from '../utils/Interact';

export class InventoryPage {
    private readonly inventoryTitle: Locator;
    private readonly cartLink: Locator;
    private readonly inventoryItems: Locator;

    private readonly log: Logger;
    private readonly interact: InteractUtil;

    constructor(private readonly page: Page) {
        this.log      = new Logger('InventoryPage');
        this.interact = new InteractUtil(this.log);

        this.inventoryTitle  = page.locator('.title');
        this.cartLink        = page.locator('.shopping_cart_link');
        this.inventoryItems  = page.locator('.inventory_item');
    }

    private getItem(itemName: string): Locator {
        return this.inventoryItems.filter({ hasText: itemName });
    }

    private getAddButton(itemName: string): Locator {
        return this.getItem(itemName).locator('button');
    }

    async addItemToCart(itemName: string): Promise<void> {
        await this.interact.click(this.getAddButton(itemName), `Add to Cart - ${itemName}`);
    }

    async goToCart(): Promise<void> {
        await this.interact.click(this.cartLink, 'Cart Link');
    }

    async getTitle(): Promise<string> {
        return await this.interact.getText(this.inventoryTitle, 'Inventory Title');
    }

    async getItemCount(): Promise<number> {
        return await this.interact.getCount(this.inventoryItems, 'Inventory Items');
    }
}