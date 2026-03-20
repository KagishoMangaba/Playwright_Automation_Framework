import {test , expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test('Login works' , async ({page}) => {

    const login = new LoginPage(page)
    const inventory = new InventoryPage(page);

    await page.goto('https://www.saucedemo.com/')
    await login.login('standard_user' , 'secret_sauce')
    await expect(page).toHaveTitle("Swag Labs")
    await expect(page).toHaveURL(/inventory/)

});

test('Login should fail when using incorrect credentials and it should display the correct error message' , async ({page}) => {

    const loginPage = new LoginPage(page)
    const inventoryPage = new InventoryPage(page)

    await page.goto('https://www.saucedemo.com/')
    await loginPage.login('Kagisho' , 'mangaba')
    await expect(loginPage.errorMessage).toBeVisible

});