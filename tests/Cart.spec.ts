import { test, expect } from '../utils/fixtures';
import { ENV } from '../config/env';
import { PRODUCTS } from '../test-data/products';
import { USER_CHECKOUT } from '../test-data/users';
import { URLS } from '../config/urls';

test.beforeEach(async ({ page }) => {
  await page.goto(ENV.BASE_URL);
});



test('User adds a product to cart and verifies it', async ({ page, loginPage, inventoryPage, cartPage }) => {
  await loginPage.login(ENV.USERS.STANDARD.username, ENV.USERS.STANDARD.password);

  await expect(page).toHaveTitle('Swag Labs');
  await inventoryPage.addItemToCart(PRODUCTS.BACKPACK);
  await inventoryPage.goToCart();

  await expect(page).toHaveURL(URLS.CART);
  await expect(cartPage.verifyProductExists(PRODUCTS.BACKPACK)).resolves.toBe(true);
});



test('User adds backpack but cart should not contain a different product', async ({ page, loginPage, inventoryPage, cartPage }) => {
  await loginPage.login(ENV.USERS.STANDARD.username, ENV.USERS.STANDARD.password);

  await inventoryPage.addItemToCart(PRODUCTS.BACKPACK);
  await inventoryPage.goToCart();

  await expect(page).toHaveURL(URLS.CART);

  await expect(cartPage.verifyProductExists(PRODUCTS.BACKPACK)).resolves.toBe(true);
  await expect(cartPage.verifyProductExists(PRODUCTS.BOLT_SHIRT)).resolves.toBe(false);
});



test('User removes a product from the cart', async ({ page, loginPage, inventoryPage, cartPage }) => {
  await loginPage.login(ENV.USERS.STANDARD.username, ENV.USERS.STANDARD.password);

  await expect(page).toHaveTitle('Swag Labs');

  await inventoryPage.addItemToCart(PRODUCTS.BACKPACK);
  await inventoryPage.goToCart();

  await expect(page).toHaveURL(URLS.CART);

  await cartPage.removeItem(PRODUCTS.BACKPACK);

  await expect(cartPage.verifyProductExists(PRODUCTS.BACKPACK)).resolves.toBe(false);
});



test('User adds multiple items to the cart', async ({ page, loginPage, inventoryPage, cartPage }) => {
  await loginPage.login(ENV.USERS.STANDARD.username, ENV.USERS.STANDARD.password);

  await expect(page).toHaveTitle('Swag Labs');

  const items = [
    PRODUCTS.BACKPACK,
    PRODUCTS.BOLT_SHIRT,
    PRODUCTS.FLEECE_JACKET,
    PRODUCTS.BIKE_LIGHT,
  ];

  for (const item of items) {
    await inventoryPage.addItemToCart(item);
  }

  await inventoryPage.goToCart();
  await expect(page).toHaveURL(URLS.CART);

  for (const item of items) {
    await expect(cartPage.verifyProductExists(item)).resolves.toBe(true);
  }
});



test('User attempts checkout with empty cart', async ({ page, loginPage, inventoryPage, cartPage, checkoutInformationPage, checkoutOverviewPage, confirmationPage }) => {
  await loginPage.login(ENV.USERS.STANDARD.username, ENV.USERS.STANDARD.password);

  await expect(page).toHaveTitle('Swag Labs');

  await inventoryPage.goToCart();
  await expect(page).toHaveURL(URLS.CART);

  await cartPage.proceedToCheckout();

  await checkoutInformationPage.completeCheckout(
    USER_CHECKOUT.firstName,
    USER_CHECKOUT.lastName,
    USER_CHECKOUT.postalCode
  );

  await checkoutOverviewPage.clickFinish();

  await expect(confirmationPage.confirmationMessage).toBeVisible();
  await expect(confirmationPage.confirmationMessage).toHaveText('Thank you for your order!');
});