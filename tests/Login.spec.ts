import { test, expect } from '../fixtures/testFixtures';
import { faker } from '@faker-js/faker';
import { ENV } from '../config/env';
import { URLS } from '../config/urls';
import loginErrors from '../test-data/messages/loginError.json';

test.beforeEach(async ({ page }) => {
  await page.goto(ENV.BASE_URL);
});



test('TC-LOGIN-001: Verify user can log in with valid credentials', async ({ loginPage, page }) => {
  await loginPage.login(ENV.USERS.STANDARD.username, ENV.USERS.STANDARD.password);

  await expect(page).toHaveTitle('Swag Labs');
  await expect(page).toHaveURL(URLS.inventory);
});



test('TC-LOGIN-002: Verify user cannot log in with invalid credentials', async ({ loginPage }) => {
  const username = faker.internet.username();
  const password = faker.internet.password();

  await loginPage.login(username, password);

  await expect(loginPage.getErrorMessage()).toBeVisible();
  await expect(loginPage.getErrorMessage()).toHaveText(loginErrors.login.invalidCredentials);
});



test('TC-LOGIN-003: Verify locked out user cannot log in', async ({ loginPage }) => {
  await loginPage.login(ENV.USERS.LOCKED.username, ENV.USERS.LOCKED.password);

  await expect(loginPage.getErrorMessage()).toBeVisible();
  await expect(loginPage.getErrorMessage()).toHaveText(loginErrors.login.lockedOutUser);
});



test('TC-LOGIN-004: Verify that a logged in user can log out', async ({ loginPage, page }) => {
  await loginPage.login(ENV.USERS.STANDARD.username, ENV.USERS.STANDARD.password);

  await expect(page).toHaveURL(URLS.inventory);

  await loginPage.logout();

  await expect(page).toHaveURL(URLS.login);
});



test('TC-LOGIN-005: Verify error message when password field is left empty', async ({ loginPage }) => {
  await loginPage.login(ENV.USERS.STANDARD.username, '');

  await expect(loginPage.getErrorMessage()).toBeVisible();
  await expect(loginPage.getErrorMessage()).toHaveText(loginErrors.login.passwordRequired);
});



test('TC-LOGIN-006: Verify error message when username field is left empty', async ({ loginPage }) => {
  await loginPage.login('', ENV.USERS.STANDARD.password);

  await expect(loginPage.getErrorMessage()).toBeVisible();
  await expect(loginPage.getErrorMessage()).toHaveText(loginErrors.login.usernameRequired);
});



test('TC-LOGIN-007: Verify error message when both input fields are empty', async ({ loginPage }) => {
  await loginPage.login('', '');

  await expect(loginPage.getErrorMessage()).toBeVisible();
  await expect(loginPage.getErrorMessage()).toHaveText(loginErrors.login.usernameRequired);
});



test('TC-LOGIN-008: Verify error when input contains only whitespace (spaces/tabs)', async ({ loginPage }) => {
  await loginPage.login('   ', '    ');

  await expect(loginPage.getErrorMessage()).toBeVisible();
  await expect(loginPage.getErrorMessage()).toHaveText(loginErrors.login.invalidCredentials);
});