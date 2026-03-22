import {test , expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { USERS } from '../utils/constants';


test('Login works' , async ({page}) => {

    const loginPage = new LoginPage(page)
    const inventoryPage = new InventoryPage(page);
    await page.goto('https://www.saucedemo.com/')
    await loginPage.login(USERS.standard.username , USERS.standard.password)
    await expect(page).toHaveTitle("Swag Labs")
    await expect(page).toHaveURL(/inventory/)

});


test('Login should fail when using incorrect credentials and it should display the correct error message' , async ({page}) => {

    const loginPage = new LoginPage(page)
    const inventoryPage = new InventoryPage(page)

    await page.goto('https://www.saucedemo.com/')
    await loginPage.login('Kagisho' , 'mangaba')
    await expect(loginPage.errorMessage).toBeVisible();

});



test('the user attempts to login with only vald username and empty field for password' , async ({page}) => {

const loginPage = new LoginPage(page)
await page.goto('https://www.saucedemo.com/')
await loginPage.login(USERS.standard.username , "")
await expect(loginPage.errorMessage).toHaveText('Epic sadface: Password is required')

});



test('The user leaves both the username and passoword field open' , async ({page}) => {
    const loginPage = new LoginPage(page)

    await page.goto('https://www.saucedemo.com/')
    await loginPage.login('' , '')
    await expect(loginPage.errorMessage).toBeVisible


});



 test('The user attempts to login into their account leaving the username field empty and inputing password' , async ({page}) => {
    const loginPage = new LoginPage(page)

    await page.goto('https://www.saucedemo.com/')
    await loginPage.login('' , USERS.standard.password)
    await expect(loginPage.errorMessage).toBeVisible


});



test('A logged in user attempts to log out of their existing account' , async ({page}) => {

    const loginPage = new LoginPage(page)
    const inventoryPage = new InventoryPage(page);

    await page.goto('https://www.saucedemo.com/')
    await loginPage.login(USERS.standard.username , USERS.standard.password)
    await expect(page).toHaveTitle("Swag Labs")
    await expect(page).toHaveURL(/inventory/)
    await loginPage.logout();
    

});



