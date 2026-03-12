import { Page, Locator } from '@playwright/test';

export class InventoryPage {
    // Locators
    inventoryTitle: Locator;

    constructor(private page: Page) {
        this.inventoryTitle = page.locator('.title'); // page title
    }

    // Click "Add to Cart" for a specific item by name
    async addItemToCart(itemName: string) {
        const item = this.page.locator('.inventory_item', { hasText: itemName });
        const addBtn = item.locator('button'); // button inside this specific item
        await addBtn.click();
    }

    // Check inventory page title
    async checkTitle(expected: string) {
        const title = await this.inventoryTitle.textContent();
        if (title !== expected) {
            throw new Error(`Expected title "${expected}", got "${title}"`);
        }
    }

    // Navigate to cart
    async goToCart() {
        const cartLink = this.page.locator('.shopping_cart_link');
        await cartLink.click();
    }
}