import { test, expect } from '../utils/fixtures';
import { USERS, PRODUCTS, USER_CHECKOUT, NAVIGATE } from '../utils/constants';
import {f}




test('User adds a product to cart and verifies it', async ({ page, loginPage, inventoryPage, cartPage }) => {


    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await expect(page).toHaveTitle("Swag Labs");
    await inventoryPage.addItemToCart(PRODUCTS.backpack);
    await inventoryPage.goToCart();
    expect(await cartPage.verifyProductExists(PRODUCTS.backpack)).toBeTruthy();
});


test('user adds backpack but cart should not contain a different product', async ({ loginPage, inventoryPage, cartPage }) => {

    await loginPage.login(USERS.standard.username, USERS.standard.password)

    await inventoryPage.addItemToCart(PRODUCTS.backpack)
    await inventoryPage.goToCart();

    // Positive assertion
    const backpackExists = await cartPage.verifyProductExists(PRODUCTS.backpack);
    expect(backpackExists).toBe(true);

    // Negative assertion
    const boltShirtExists = await cartPage.verifyProductExists(PRODUCTS.boltShirt);
    expect(boltShirtExists).toBe(false);
});


test('The users attempts to add a product to cart and then tries to remove the product form the cart' , async ({page, loginPage, inventoryPage, cartPage}) => {

    

    await loginPage.login(USERS.standard.username , USERS.standard.password)
    await expect(page).toHaveTitle("Swag Labs")
    await inventoryPage.addItemToCart(PRODUCTS.backpack)
    await inventoryPage.goToCart();
    await cartPage.removeItem(PRODUCTS.backpack);
    expect(await cartPage.verifyProductExists(PRODUCTS.backpack)).toBe(false);

});


test('The user attempts to add multiple Items to the cart ' , async ({page, loginPage, inventoryPage, cartPage}) => {




    await loginPage.login(USERS.standard.username , USERS.standard.password)
    await expect(page).toHaveTitle("Swag Labs")
    await inventoryPage.addItemToCart(PRODUCTS.backpack)
    await inventoryPage.addItemToCart(PRODUCTS.boltShirt)
    await inventoryPage.addItemToCart(PRODUCTS.fleeceJacket)
    await inventoryPage.addItemToCart(PRODUCTS.bikeLight)
    await inventoryPage.goToCart();

    expect(await cartPage.verifyProductExists(PRODUCTS.backpack)).toBe(true)
    expect(await cartPage.verifyProductExists(PRODUCTS.boltShirt)).toBe(true)
    expect(await cartPage.verifyProductExists(PRODUCTS.fleeceJacket)).toBe(true)
    expect(await cartPage.verifyProductExists(PRODUCTS.bikeLight)).toBe(true)


});

test('The user attempts to complete an order without putting anything in cart' , async ({page, loginPage, inventoryPage, cartPage , checkoutInformationPage , checkoutOverviewPage , confirmationPage }) => {
    await loginPage.login(USERS.standard.username , USERS.standard.password)
    await expect(page).toHaveTitle("Swag Labs")
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();
    await checkoutInformationPage.completeCheckout(USER_CHECKOUT.firstname , USER_CHECKOUT.lastname , USER_CHECKOUT.postalCode);
    await checkoutOverviewPage.clickFinish();
    await expect(confirmationPage.confirmationMessage).toBeVisible
    await expect(confirmationPage.confirmationMessage).toHaveText('Thank you for your order!')
    //This test is not stable or reliable, will have better validations

});
