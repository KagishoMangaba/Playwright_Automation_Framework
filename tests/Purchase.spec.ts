import { test, expect } from '../utils/fixtures';
import { ENV } from '../config/env';
import { PRODUCTS } from '../test-data/products';
import { USER_CHECKOUT } from '../test-data/users';
import { URLS } from '../config/urls';

test.beforeEach(async ({ page }) => {
  await page.goto(ENV.BASE_URL);
});



test('Full End-to-End Purchase', async ({
  page,
  loginPage,
  inventoryPage,
  cartPage,
  checkoutInformationPage,
  checkoutOverviewPage,
  confirmationPage,
}) => {
  await loginPage.login(ENV.USERS.STANDARD.username, ENV.USERS.STANDARD.password);
  await expect(page).toHaveTitle('Swag Labs');

  await inventoryPage.addItemToCart(PRODUCTS.BOLT_SHIRT);
  await inventoryPage.goToCart();

  await expect(page).toHaveURL(URLS.CART);
  await expect(cartPage.verifyProductExists(PRODUCTS.BOLT_SHIRT)).resolves.toBe(true);

  await cartPage.proceedToCheckout();
  await checkoutInformationPage.completeCheckout(
    USER_CHECKOUT.firstName,
    USER_CHECKOUT.lastName,
    USER_CHECKOUT.postalCode
  );

  await expect(checkoutOverviewPage.hasItem(PRODUCTS.BOLT_SHIRT)).resolves.toBe(true);
  await checkoutOverviewPage.clickFinish();

  await expect(confirmationPage.confirmationMessage).toBeVisible();
  await expect(confirmationPage.confirmationMessage).toHaveText('Thank you for your order!');
});

test('Checkout fails if First Name is empty', async ({
  page,
  loginPage,
  inventoryPage,
  cartPage,
  checkoutInformationPage,
}) => {
  await loginPage.login(ENV.USERS.STANDARD.username, ENV.USERS.STANDARD.password);
  await inventoryPage.addItemToCart(PRODUCTS.BOLT_SHIRT);
  await inventoryPage.goToCart();
  await expect(page).toHaveURL(URLS.CART);

  await cartPage.proceedToCheckout();
  await checkoutInformationPage.completeCheckout('', USER_CHECKOUT.lastName, USER_CHECKOUT.postalCode);

  await expect(checkoutInformationPage.informationError).toBeVisible();
  await expect(checkoutInformationPage.informationError).toHaveText('Error: First Name is required');
});

test('Checkout fails if Last Name is empty', async ({
  page,
  loginPage,
  inventoryPage,
  cartPage,
  checkoutInformationPage,
}) => {
  await loginPage.login(ENV.USERS.STANDARD.username, ENV.USERS.STANDARD.password);
  await inventoryPage.addItemToCart(PRODUCTS.BOLT_SHIRT);
  await inventoryPage.goToCart();
  await expect(page).toHaveURL(URLS.CART);

  await cartPage.proceedToCheckout();
  await checkoutInformationPage.completeCheckout(USER_CHECKOUT.firstName, '', USER_CHECKOUT.postalCode);

  await expect(checkoutInformationPage.informationError).toBeVisible();
  await expect(checkoutInformationPage.informationError).toHaveText('Error: Last Name is required');
});



test('Checkout fails if Postal Code is empty', async ({
  page,
  loginPage,
  inventoryPage,
  cartPage,
  checkoutInformationPage,
}) => {
  await loginPage.login(ENV.USERS.STANDARD.username, ENV.USERS.STANDARD.password);
  await inventoryPage.addItemToCart(PRODUCTS.BOLT_SHIRT);
  await inventoryPage.goToCart();
  await expect(page).toHaveURL(URLS.CART);

  await cartPage.proceedToCheckout();
  await checkoutInformationPage.completeCheckout(USER_CHECKOUT.firstName, USER_CHECKOUT.lastName, '');

  await expect(checkoutInformationPage.informationError).toBeVisible();
  await expect(checkoutInformationPage.informationError).toHaveText('Error: Postal Code is required');
});



test('Checkout allows empty whitespace inputs but fails properly', async ({
  page,
  loginPage,
  inventoryPage,
  cartPage,
  checkoutInformationPage,
}) => {
  await loginPage.login(ENV.USERS.STANDARD.username, ENV.USERS.STANDARD.password);
  await inventoryPage.addItemToCart(PRODUCTS.BOLT_SHIRT);
  await inventoryPage.goToCart();
  await expect(page).toHaveURL(URLS.CART);

  await cartPage.proceedToCheckout();
  await checkoutInformationPage.completeCheckout('', '', '');

  await expect(checkoutInformationPage.informationError).toBeVisible();
  await expect(checkoutInformationPage.informationError).toHaveText('Error: First Name is required');
});