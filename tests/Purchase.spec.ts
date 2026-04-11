import { test, expect } from '../fixtures/testFixtures';
import { ENV } from '../config/env';
import { PRODUCTS } from '../test-data/products';
import { USER_CHECKOUT } from '../test-data/users';
import { URLS } from '../config/urls';
import errrorMessages from '../test-data/messages/checkoutInfoError.json';

test.beforeEach(async ({ page, loginPage }) => {
  await page.goto(ENV.BASE_URL);
  await loginPage.login(ENV.USERS.STANDARD.username, ENV.USERS.STANDARD.password);
});



test('Full End-to-End Purchase', async ({
  page,
  inventoryPage,
  cartPage,
  checkoutInformationPage,
  checkoutOverviewPage,
  confirmationPage,
}) => {
  await expect(page).toHaveTitle('Swag Labs');

  await inventoryPage.addItemToCart(PRODUCTS.bolt_shirt);
  await inventoryPage.goToCart();

  await expect(page).toHaveURL(URLS.cart);
  await expect(cartPage.verifyProductExists(PRODUCTS.bolt_shirt)).resolves.toBe(true);

  await cartPage.proceedToCheckout();
  await checkoutInformationPage.completeCheckout(
    USER_CHECKOUT.firstName,
    USER_CHECKOUT.lastName,
    USER_CHECKOUT.postalCode
  );

  await expect(checkoutOverviewPage.hasItem(PRODUCTS.bolt_shirt)).resolves.toBe(true);
  await checkoutOverviewPage.clickFinish();

  await expect(confirmationPage.getConfirmationMessage()).toBeVisible();
  await expect(confirmationPage.getConfirmationMessage()).toHaveText('Thank you for your order!');
});




test('Checkout fails if First Name is empty', async ({
  page,
  inventoryPage,
  cartPage,
  checkoutInformationPage,
}) => {
  await inventoryPage.addItemToCart(PRODUCTS.bolt_shirt);
  await inventoryPage.goToCart();

  await expect(page).toHaveURL(URLS.cart);

  await cartPage.proceedToCheckout();
  await checkoutInformationPage.completeCheckout(
    '',
    USER_CHECKOUT.lastName,
    USER_CHECKOUT.postalCode
  );

  await expect(checkoutInformationPage.getInfoErrorMessage()).toBeVisible();
  await expect(checkoutInformationPage.getInfoErrorMessage()).toHaveText(errrorMessages.checkout.firstNameRequired);
});




test('Checkout fails if Last Name is empty', async ({
  page,
  inventoryPage,
  cartPage,
  checkoutInformationPage,
}) => {
  await inventoryPage.addItemToCart(PRODUCTS.bolt_shirt);
  await inventoryPage.goToCart();

  await expect(page).toHaveURL(URLS.cart);

  await cartPage.proceedToCheckout();
  await checkoutInformationPage.completeCheckout(
    USER_CHECKOUT.firstName,
    '',
    USER_CHECKOUT.postalCode
  );

  await expect(checkoutInformationPage.getInfoErrorMessage()).toBeVisible();
  await expect(checkoutInformationPage.getInfoErrorMessage()).toHaveText(errrorMessages.checkout.lastNameRequired);
});



test('Checkout fails if Postal Code is empty', async ({
  page,
  inventoryPage,
  cartPage,
  checkoutInformationPage,
}) => {
  await inventoryPage.addItemToCart(PRODUCTS.bolt_shirt);
  await inventoryPage.goToCart();

  await expect(page).toHaveURL(URLS.cart);

  await cartPage.proceedToCheckout();
  await checkoutInformationPage.completeCheckout(
    USER_CHECKOUT.firstName,
    USER_CHECKOUT.lastName,
    ''
  );

  await expect(checkoutInformationPage.getInfoErrorMessage()).toBeVisible();
  await expect(checkoutInformationPage.getInfoErrorMessage()).toHaveText(errrorMessages.checkout.postalCodeRequired);
});



test('Checkout fails when all fields are empty', async ({
  page,
  inventoryPage,
  cartPage,
  checkoutInformationPage,
}) => {
  await inventoryPage.addItemToCart(PRODUCTS.bolt_shirt);
  await inventoryPage.goToCart();

  await expect(page).toHaveURL(URLS.cart);

  await cartPage.proceedToCheckout();
  await checkoutInformationPage.completeCheckout('', '', '');

  await expect(checkoutInformationPage.getInfoErrorMessage()).toBeVisible();
  await expect(checkoutInformationPage.getInfoErrorMessage()).toHaveText('Error: First Name is required');
});



test('User attempts checkout with empty cart', async ({
  page,
  inventoryPage,
  cartPage,
  checkoutInformationPage,
  checkoutOverviewPage,
  confirmationPage,
}) => {
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
  

});