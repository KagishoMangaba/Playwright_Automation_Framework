import { test, expect } from '../utils/fixtures';
import { faker } from '@faker-js/faker';
import { ENV } from '../config/env';
import { URLS } from '../config/urls';

test.beforeEach(async ({ page }) => {
  await page.goto(ENV.BASE_URL);
});


test('TC-LOGIN-001: Verify user can log in with valid credentials', async ({ loginPage, page }) => {
  await loginPage.login(ENV.USERS.STANDARD.username, ENV.USERS.STANDARD.password);
  await expect(page).toHaveTitle('Swag Labs');
  await expect(page).toHaveURL(URLS.INVENTORY);
});



test('TC-LOGIN-002: Verify user cannot log in with invalid credentials', async ({ loginPage }) => {
  const username = faker.internet.username();
  const password = faker.internet.password();

  await loginPage.login(username, password);
  await expect(loginPage.errorMessage).toBeVisible();
});



test('TC-LOGIN-003: Verify locked out user cannot log in', async ({ loginPage }) => {
  await loginPage.login(ENV.USERS.LOCKED.username, ENV.USERS.LOCKED.password);
  await expect(loginPage.errorMessage).toBeVisible();
  await expect(loginPage.errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.');
});


test('TC-LOGIN-004: Verify that a logged in user can log out', async ({ loginPage, page }) => {
  await loginPage.login(ENV.USERS.STANDARD.username, ENV.USERS.STANDARD.password);
  await expect(page).toHaveURL(URLS.INVENTORY);
  await loginPage.logout();
  await expect(page).toHaveURL(URLS.LOGIN); // Ensure redirected to login page after logout
});



test('TC-LOGIN-005: Verify error message when password field is left empty', async ({ loginPage }) => {
  await loginPage.login(ENV.USERS.STANDARD.username, '');
  await expect(loginPage.errorMessage).toHaveText('Epic sadface: Password is required');
});




test('TC-LOGIN-006: Verify error message when username field is left empty', async ({ loginPage }) => {
  await loginPage.login('', ENV.USERS.STANDARD.password);
  await expect(loginPage.errorMessage).toBeVisible();
});



test('TC-LOGIN-007: Verify error message when both input fields are empty', async ({ loginPage }) => {
  await loginPage.login('', '');
  await expect(loginPage.errorMessage).toBeVisible();
});



test('TC-LOGIN-008: Verify error when input contains only whitespace (spaces/tabs)', async ({ loginPage }) => {
  await loginPage.login('   ', '    ');
  await expect(loginPage.errorMessage).toBeVisible();
});