import {test , expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutInformationPage } from '../pages/CheckoutInformationPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';

test('Login works' , async ({page}) => {


    const login = new LoginPage(page)
    const inventory = new InventoryPage(page)
    const cartPage = new CartPage(page)
    const checkoutInfo = new CheckoutInformationPage(page)
    const checkoutOverview = new CheckoutOverviewPage(page)

    await page.goto('https://www.saucedemo.com/')
    await login.login('standard_user' , 'secret_sauce')
    await inventory.addItemToCart('Sauce Labs Bolt T-Shirt')
    await inventory.goToCart();
    expect(await cartPage.verifyProductExists('Sauce Labs Bolt T-Shirt')).toBe(true);
    await cartPage.proceedToCheckout();
    await checkoutInfo.completeCheckout('kagisho' , 'prince' , '12345');
    expect(await checkoutOverview.hasItem('Sauce Labs Bolt T-Shirt')).toBe(true);



    

});