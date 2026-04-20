import { test, expect } from '../fixtures/testFixtures';
import { ENV } from '../config/env';
import { PRODUCTS } from '../test-data/products';
import { USER_CHECKOUT } from '../test-data/users';
import { URLS } from '../config/urls';
import { LoginPage } from '../pages/LoginPage';

test.beforeEach(async ({ page, loginPage }) => {
  await page.goto(ENV.BASE_URL);
  await loginPage.login(ENV.USERS.STANDARD.username, ENV.USERS.STANDARD.password);
});



test('User adds a product to cart and verifies it', async ({ page, inventoryPage, cartPage }) => {
  await inventoryPage.addItemToCart(PRODUCTS.backpack);
  await inventoryPage.goToCart();

  await expect(page).toHaveURL(URLS.cart);
  await expect(cartPage.verifyProductExists(PRODUCTS.backpack)).resolves.toBe(true);
});



test('Cart only contains the product that was added', async ({ page, inventoryPage, cartPage }) => {
  await inventoryPage.addItemToCart(PRODUCTS.backpack);
  await inventoryPage.goToCart();

  await expect(page).toHaveURL(URLS.cart);
  await expect(cartPage.verifyProductExists(PRODUCTS.backpack)).resolves.toBe(true);
  await expect(cartPage.verifyProductExists(PRODUCTS.bolt_shirt)).resolves.toBe(false);
});



test('User removes a product from the cart', async ({ page, inventoryPage, cartPage }) => {
  await inventoryPage.addItemToCart(PRODUCTS.backpack);
  await inventoryPage.goToCart();

  await expect(page).toHaveURL(URLS.cart);
  await cartPage.removeItem(PRODUCTS.backpack);

  await expect(cartPage.verifyProductExists(PRODUCTS.backpack)).resolves.toBe(false);
});



test('User adds multiple items to the cart', async ({ page, inventoryPage, cartPage }) => {
  const items = [
    PRODUCTS.backpack,
    PRODUCTS.bolt_shirt,
    PRODUCTS.fleece_jacket,
    PRODUCTS.bike_light,
  ];

  for (const item of items) {
    await inventoryPage.addItemToCart(item);
  }

  await inventoryPage.goToCart();
  await expect(page).toHaveURL(URLS.cart);

  for (const item of items) {
    await expect(cartPage.verifyProductExists(item)).resolves.toBe(true);
  }
});

test('User can complete checkout with an empty cart', async ({ page,  inventoryPage, cartPage, checkoutInformationPage, checkoutOverviewPage, confirmationPage,}) => {
  await inventoryPage.goToCart();
  await expect(page).toHaveURL(URLS.cart);

  await cartPage.proceedToCheckout();

  await checkoutInformationPage.completeCheckout(
    USER_CHECKOUT.firstName,
    USER_CHECKOUT.lastName,
    USER_CHECKOUT.postalCode
  );

  await checkoutOverviewPage.clickFinish();
  await expect(confirmationPage.getConfirmationMessage()).toBeVisible();
  await expect(confirmationPage.getConfirmationMessage()).toHaveText('Thank you for your order!');
});