import { test, expect } from '../utils/fixtures';
import { NAVIGATE, USERS } from '../utils/constants';
import { LoginPage } from '../pages/LoginPage';
import {faker} from '@faker-js/faker'




test('TC-LOGIN-001: Verify user can log in with valid credentials', async ({ loginPage, page }) => {
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await expect(page).toHaveTitle("Swag Labs");
    await expect(page).toHaveURL(/inventory/);
});



test('TC-LOGIN-002: Verify user cannot log in with invalid credentials', async ({loginPage, page}) => {

    const username = faker.internet.username();
    const password = faker.internet.password();

    await loginPage.login(username, password);
    await expect(loginPage.errorMessage).toBeVisible();
});


test('TC-LOGIN-003: Verify locked out user cannot log in' , async ({loginPage, page}) => {
    await loginPage.login(USERS.locked.username , USERS.standard.password);
    await expect(loginPage.errorMessage).toBeVisible(); 
    await expect(loginPage.errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.')
});


test('TC-LOGIN-004: Verify that a logged in user can log out', async ({ loginPage, page}) => {
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await expect(page).toHaveURL(/inventory/);
    await loginPage.logout();
});


test('TC-LOGIN-5: Verify error message when password field is left empty', async ({loginPage, page}) => {
    await loginPage.login(USERS.standard.username, "");
    await expect(loginPage.errorMessage)
        .toHaveText('Epic sadface: Password is required');
});


test('TC-LOGIN-6: Verify error message when username field is left empty', async ({loginPage, page}) => {
    await loginPage.login('', USERS.standard.password);
    await expect(loginPage.errorMessage).toBeVisible(); 
});




test('LOGIN-7: Verify error message when both input fields are empty', async ({loginPage, page}) => {
    await loginPage.login('', '');
    await expect(loginPage.errorMessage).toBeVisible(); 
});


test('TC-LOGIN-8: Verify error when input contains only whitespace (spaces/tabs)', async ({loginPage, page}) => {
    await loginPage.login('   ', '    ');
    await expect(loginPage.errorMessage).toBeVisible(); 
});









