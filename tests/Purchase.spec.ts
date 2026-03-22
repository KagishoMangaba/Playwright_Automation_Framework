import {test , expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutInformationPage } from '../pages/CheckoutInformationPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { PRODUCTS, USER_CHECKOUT, USERS } from './utils/constants';
import { ConfirmationPage } from '../pages/ConfirmationPage';


test('Full End to end purchase' , async ({page}) => {


    const login = new LoginPage(page)
    const inventory = new InventoryPage(page)
    const cartPage = new CartPage(page)
    const checkoutInfo = new CheckoutInformationPage(page)
    const checkoutOverview = new CheckoutOverviewPage(page)
    const confirmationPage = new ConfirmationPage(page)

    await page.goto('https://www.saucedemo.com/')
    await login.login(USERS.standard.username , USERS.standard.password)
    await expect(page).toHaveTitle("Swag Labs")
    await inventory.addItemToCart(PRODUCTS.boltShirt)
    await inventory.goToCart();
    expect(await cartPage.verifyProductExists(PRODUCTS.boltShirt)).toBe(true);
    await cartPage.proceedToCheckout();
    await checkoutInfo.completeCheckout(USER_CHECKOUT.firstname , USER_CHECKOUT.lastname , USER_CHECKOUT.postalCode);
    expect(await checkoutOverview.hasItem(PRODUCTS.boltShirt)).toBe(true);
    await checkoutOverview.clickFinish();
    await expect(confirmationPage.confirmationMessage).toBeVisible
    await expect(confirmationPage.confirmationMessage).toHaveText('Thank you for your order!')
    


});


test('The user attempts to complete an order leaving firstname open' , async ({page}) => {


    const login = new LoginPage(page)
    const inventory = new InventoryPage(page)
    const cartPage = new CartPage(page)
    const checkoutInfo = new CheckoutInformationPage(page)
    const checkoutOverview = new CheckoutOverviewPage(page)
    const confirmationPage = new ConfirmationPage(page)

    await page.goto('https://www.saucedemo.com/')
    await login.login(USERS.standard.username , USERS.standard.password)
    await expect(page).toHaveTitle("Swag Labs")
    await inventory.addItemToCart(PRODUCTS.boltShirt)
    await inventory.goToCart();
    expect(await cartPage.verifyProductExists(PRODUCTS.boltShirt)).toBe(true);
    await cartPage.proceedToCheckout();
    await checkoutInfo.completeCheckout('' , USER_CHECKOUT.lastname , USER_CHECKOUT.postalCode);
    await expect(checkoutInfo.informationError).toBeVisible
    await expect(checkoutInfo.informationError).toHaveText('Error: First Name is required')


});