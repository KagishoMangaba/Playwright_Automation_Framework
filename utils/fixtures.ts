import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { ConfirmationPage } from '../pages/ConfirmationPage';
import { CheckoutInformationPage } from '../pages/CheckoutInformationPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';

type Pages = {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    cartPage: CartPage;
    confirmationPage: ConfirmationPage;
    checkoutInformationPage: CheckoutInformationPage;
    checkoutOverviewPage: CheckoutOverviewPage;
}

export const test = base.extend<Pages>({
    loginPage: async ({ page }, use) => { await use(new LoginPage(page)); },
    inventoryPage: async ({ page }, use) => { await use(new InventoryPage(page)); },
    cartPage: async ({ page }, use) => { await use(new CartPage(page)); },
    confirmationPage: async ({ page }, use) => { await use(new ConfirmationPage(page)); },
    checkoutInformationPage: async ({ page }, use) => { await use(new CheckoutInformationPage(page)); },
    checkoutOverviewPage: async ({ page }, use) => { await use(new CheckoutOverviewPage(page)); },
});


export { expect };