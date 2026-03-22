import {test , expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { PRODUCTS, USERS } from './utils/constants';


test('The users attempts to add a product to cart and verify that product in cart matches with the from inventory' , async ({page}) => {

const login = new LoginPage(page)
const inventory = new InventoryPage(page)
const cartPage = new CartPage(page)   


await page.goto('https://www.saucedemo.com/')
    await login.login(USERS.standard.username , USERS.standard.password)
    await expect(page).toHaveTitle("Swag Labs")
    await inventory.addItemToCart(PRODUCTS.backpack)
    await inventory.goToCart();
    expect(await cartPage.verifyProductExists(PRODUCTS.backpack)).toBe(true);

});



test('the users adds a product to the cart and the prodcuts found inside the cart do not match' , async({page}) => {

    
const login = new LoginPage(page)
const inventory = new InventoryPage(page)
const cartPage = new CartPage(page)   
 
await page.goto('https://www.saucedemo.com/')
await login.login(USERS.standard.username , USERS.standard.password)
await expect(page).toHaveTitle("Swag Labs")
await inventory.addItemToCart(PRODUCTS.backpack)
await inventory.goToCart();
expect(await cartPage.verifyProductExists(PRODUCTS.boltShirt)).toBe(false);

});




test('The users attempts to add a product to cart and then tries to remove the product form the cart' , async ({page}) => {

const login = new LoginPage(page)
const inventory = new InventoryPage(page)
const cartPage = new CartPage(page)   


await page.goto('https://www.saucedemo.com/')
    await login.login(USERS.standard.username , USERS.standard.password)
    await expect(page).toHaveTitle("Swag Labs")
    await inventory.addItemToCart(PRODUCTS.backpack)
    await inventory.goToCart();
    await cartPage.removeItem(PRODUCTS.backpack);
    expect(await cartPage.verifyProductExists(PRODUCTS.backpack)).toBe(false);

});


test('The user attempts to add multiple Items to the cart ' , async ({page}) => {

const login = new LoginPage(page)
const inventory = new InventoryPage(page)
const cartPage = new CartPage(page)   


await page.goto('https://www.saucedemo.com/')
    await login.login(USERS.standard.username , USERS.standard.password)
    await expect(page).toHaveTitle("Swag Labs")
    await inventory.addItemToCart(PRODUCTS.backpack)
    await inventory.addItemToCart(PRODUCTS.boltShirt)
    await inventory.addItemToCart(PRODUCTS.fleeceJacket)
    await inventory.addItemToCart(PRODUCTS.bikeLight)
    await inventory.goToCart();

    expect(await cartPage.verifyProductExists(PRODUCTS.backpack)).toBe(true)
    expect(await cartPage.verifyProductExists(PRODUCTS.boltShirt)).toBe(true)
    expect(await cartPage.verifyProductExists(PRODUCTS.fleeceJacket)).toBe(true)
    expect(await cartPage.verifyProductExists(PRODUCTS.bikeLight)).toBe(true)


});