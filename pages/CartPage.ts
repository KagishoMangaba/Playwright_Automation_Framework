import { Page, Locator } from '@playwright/test';

export class CartPage {
  private readonly cartItems: Locator;
  private readonly checkoutButton: Locator;
  private readonly removeBtn: Locator;
  private readonly items: Locator;

  constructor(private page: Page) {
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('#checkout');
    this.removeBtn = page.locator('.btn.btn_secondary.btn_small.cart_button');
    this.items = page.locator('.inventory_item_name');
  }


  async getCartCount(): Promise<number> {
    return await this.cartItems.count();
  }


  async removeItem(itemName: string): Promise<void> {
    await this.cartItems
      .filter({ hasText: itemName })
      .locator('.btn.btn_secondary.btn_small.cart_button')
      .click();
  }


  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }



  async verifyProductExists(itemName: string): Promise<boolean> {
    return (await this.items.allTextContents()).includes(itemName);
  }
}