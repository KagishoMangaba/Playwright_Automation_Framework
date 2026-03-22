import { Page, Locator } from '@playwright/test';

export class CartPage {
    // Locators
   readonly cartTitle: Locator;
   readonly cartItems: Locator;
   readonly checkoutButton: Locator;

    constructor(private page: Page) {
        this.cartTitle = page.locator('.title'); // usually "Your Cart"
        this.cartItems = page.locator('.cart_item'); // all items in cart
        this.checkoutButton = page.locator('#checkout'); // checkout button
        
    }

    // Get number of items in cart
    async getCartCount(): Promise<number> {
        return await this.cartItems.count();
    }

    // Remove an item by name
    async removeItem(itemName: string) {
        const item = this.cartItems.filter({ hasText: itemName });
        const removeBtn = item.locator('.btn.btn_secondary.btn_small.cart_button'); // remove button inside this item
        await removeBtn.click();
    }

    // Click checkout
    async proceedToCheckout() {
        await this.checkoutButton.click();
    }

    // Optional: check cart page title
    async checkTitle(expected: string) {
        const title = await this.cartTitle.textContent();
        if (title !== expected) {
            throw new Error(`Expected title "${expected}", got "${title}"`);
        }
    }

   // cartPage.ts
async verifyProductExists(itemName: string): Promise<boolean> {
    const item = this.page.locator('.cart_item', { hasText: itemName });
    return await item.count() > 0;
}
}