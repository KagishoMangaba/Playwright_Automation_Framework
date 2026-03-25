import { test, expect } from '../utils/fixtures';
import { USERS, PRODUCTS, USER_CHECKOUT, NAVIGATE } from '../utils/constants';

test.beforeEach(async ({page,  loginPage }) => {
    await page.goto(NAVIGATE.url);
});



test('Full End to end purchase' , async ({page, loginPage, inventoryPage, cartPage , checkoutInformationPage , checkoutOverviewPage , confirmationPage }) => {


    await loginPage.login(USERS.standard.username , USERS.standard.password)
    await expect(page).toHaveTitle("Swag Labs")
    await inventoryPage.addItemToCart(PRODUCTS.boltShirt)
    await inventoryPage.goToCart();
    expect(await cartPage.verifyProductExists(PRODUCTS.boltShirt)).toBe(true);
    await cartPage.proceedToCheckout();
    await checkoutInformationPage.completeCheckout(USER_CHECKOUT.firstname , USER_CHECKOUT.lastname , USER_CHECKOUT.postalCode);
    expect(await checkoutOverviewPage.hasItem(PRODUCTS.boltShirt)).toBe(true);
    await checkoutOverviewPage.clickFinish();
    await expect(confirmationPage.confirmationMessage).toBeVisible
    await expect(confirmationPage.confirmationMessage).toHaveText('Thank you for your order!')
    
    
});


test('The user attempts to complete an order leaving firstname open' , async ({page, loginPage, inventoryPage, cartPage , checkoutInformationPage , checkoutOverviewPage , confirmationPage }) => {


 
    await loginPage.login(USERS.standard.username , USERS.standard.password)
    await expect(page).toHaveTitle("Swag Labs")
    await inventoryPage.addItemToCart(PRODUCTS.boltShirt)
    await inventoryPage.goToCart();
    expect(await cartPage.verifyProductExists(PRODUCTS.boltShirt)).toBe(true);
    await cartPage.proceedToCheckout();
    await checkoutInformationPage.completeCheckout('' , USER_CHECKOUT.lastname , USER_CHECKOUT.postalCode);
    await expect(checkoutInformationPage.informationError).toBeVisible
    await expect(checkoutInformationPage.informationError).toHaveText('Error: First Name is required')


});




test('The user uses empty tabs when putting in their checkout info ' , async ({page, loginPage, inventoryPage, cartPage , checkoutInformationPage , checkoutOverviewPage , confirmationPage }) => {


 await loginPage.login(USERS.standard.username , USERS.standard.password)
    await expect(page).toHaveTitle("Swag Labs")
    await inventoryPage.addItemToCart(PRODUCTS.boltShirt)
    await inventoryPage.goToCart();
    expect(await cartPage.verifyProductExists(PRODUCTS.boltShirt)).toBe(true);
    await cartPage.proceedToCheckout();
    await checkoutInformationPage.completeCheckout('  ' , '  ' , '  ');
    expect(await checkoutOverviewPage.hasItem(PRODUCTS.boltShirt)).toBe(true);
    await checkoutOverviewPage.clickFinish();
    await expect(confirmationPage.confirmationMessage).toBeVisible
    await expect(confirmationPage.confirmationMessage).toHaveText('Thank you for your order!')


});


test('The user attempts to complete an order leaving LASTNAME field open' , async ({page, loginPage, inventoryPage, cartPage , checkoutInformationPage , checkoutOverviewPage , confirmationPage }) => {


 
    await loginPage.login(USERS.standard.username , USERS.standard.password)
    await expect(page).toHaveTitle("Swag Labs")
    await inventoryPage.addItemToCart(PRODUCTS.boltShirt)
    await inventoryPage.goToCart();
    expect(await cartPage.verifyProductExists(PRODUCTS.boltShirt)).toBe(true);
    await cartPage.proceedToCheckout();
    await checkoutInformationPage.completeCheckout(USER_CHECKOUT.firstname , '' , USER_CHECKOUT.postalCode);
    await expect(checkoutInformationPage.informationError).toBeVisible
    await expect(checkoutInformationPage.informationError).toHaveText('Error: Last Name is required')


});


test('The user attempts to complete an order leaving Postal code field open' , async ({page, loginPage, inventoryPage, cartPage , checkoutInformationPage , checkoutOverviewPage , confirmationPage }) => {


 
    await loginPage.login(USERS.standard.username , USERS.standard.password)
    await expect(page).toHaveTitle("Swag Labs")
    await inventoryPage.addItemToCart(PRODUCTS.boltShirt)
    await inventoryPage.goToCart();
    expect(await cartPage.verifyProductExists(PRODUCTS.boltShirt)).toBe(true);
    await cartPage.proceedToCheckout();
    await checkoutInformationPage.completeCheckout(USER_CHECKOUT.firstname , USER_CHECKOUT.lastname , '');
    await expect(checkoutInformationPage.informationError).toBeVisible
    await expect(checkoutInformationPage.informationError).toHaveText('Erro');
    //Error: Postal Code is required

});

