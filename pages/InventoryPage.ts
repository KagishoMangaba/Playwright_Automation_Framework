import { Page, Locator } from '@playwright/test';

export class InventoryPage {

    private readonly page: Page;

    private readonly inventoryTitle: Locator;
    private readonly cartLink: Locator;
    private readonly inventoryItems: Locator;

    constructor(page: Page) {
        this.page = page;

        this.inventoryTitle = page.locator('.title');
        this.cartLink = page.locator('.shopping_cart_link');
        this.inventoryItems = page.locator('.inventory_item');
    }

    // Get specific item by name
    private getItem(itemName: string): Locator {
        return this.inventoryItems.filter({ hasText: itemName });
    }

    // Get "Add to Cart" button inside item
    private getAddButton(itemName: string): Locator {
        return this.getItem(itemName).locator('button');
    }

    // Add item to cart
    async addItemToCart(itemName: string) {
        await this.getAddButton(itemName).click();
    }

    // Navigate to cart
    async goToCart() {
        await this.cartLink.click();
    }
}