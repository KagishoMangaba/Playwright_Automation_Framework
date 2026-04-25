


import { test, expect } from '../fixtures/testFixtures';
import { faker } from '@faker-js/faker';
import { ENV } from '../config/env';
import { URLS } from '../config/urls';
import loginErrors from '../test-data/messages/loginError.json';

test.beforeEach(async ({ page }) => {
    await page.goto(ENV.BASE_URL);
});

async function expectErrorMessage(loginPage: any, expectedText: string) {
    const error = loginPage.getErrorMessage();
    await expect(error).toBeVisible();
    await expect(error).toHaveText(expectedText);
}

test.describe('Login', () => {

    test('TC-LOGIN-001: Verify user can log in with valid credentials', async ({ loginPage, page }) => {
        await loginPage.login(ENV.USERS.STANDARD.username, ENV.USERS.STANDARD.password);

        await expect(page).toHaveTitle('Swag Labs');
        await expect(page).toHaveURL(URLS.inventory);
    });



    test('TC-LOGIN-002: Verify user cannot log in with invalid credentials', async ({ loginPage }) => {
        await loginPage.login(faker.internet.username(), faker.internet.password());

        await expectErrorMessage(loginPage, loginErrors.login.invalidCredentials);
    });



    test('TC-LOGIN-003: Verify locked out user cannot log in', async ({ loginPage }) => {
        await loginPage.login(ENV.USERS.LOCKED.username, ENV.USERS.LOCKED.password);

        await expectErrorMessage(loginPage, loginErrors.login.lockedOutUser);
    });



    test('TC-LOGIN-004: Verify that a logged in user can log out', async ({ loginPage, page }) => {
        await loginPage.login(ENV.USERS.STANDARD.username, ENV.USERS.STANDARD.password);
        await expect(page).toHaveURL(URLS.inventory);

        await loginPage.logout();
        await expect(page).toHaveURL(URLS.login);
    });


    
    test('TC-LOGIN-005: Verify error message when password field is left empty', async ({ loginPage }) => {
        await loginPage.login(ENV.USERS.STANDARD.username, '');

        await expectErrorMessage(loginPage, loginErrors.login.passwordRequired);
    });


    test('TC-LOGIN-006: Verify error message when username field is left empty', async ({ loginPage }) => {
        await loginPage.login('', ENV.USERS.STANDARD.password);

        await expectErrorMessage(loginPage, loginErrors.login.usernameRequired);
    });



    test('TC-LOGIN-007: Verify error message when both input fields are empty', async ({ loginPage }) => {
        await loginPage.login('', '');

        await expectErrorMessage(loginPage, loginErrors.login.usernameRequired);
    });



    test('TC-LOGIN-008: Verify error when input contains only whitespace', async ({ loginPage }) => {
        await loginPage.login('   ', '    ');

        await expectErrorMessage(loginPage, loginErrors.login.invalidCredentials);
    });

    
});