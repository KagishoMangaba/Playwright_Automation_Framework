import { test, expect } from '../utils/fixtures';
import { USERS } from '../utils/constants';
import { LoginPage } from '../pages/LoginPage';


test.beforeEach(async ({page,  loginPage }) => {

    await page.goto('https://www.saucedemo.com/');
});


test('Login works', async ({ loginPage, page }) => {
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await expect(page).toHaveTitle("Swag Labs");
    await expect(page).toHaveURL(/inventory/);
});



test('Login fails with incorrect credentials', async ({loginPage, page}) => {
    await loginPage.login('Kagisho', 'mangaba');
    await expect(loginPage.errorMessage).toBeVisible();
});



test('Login fails with empty password', async ({loginPage, page}) => {
    await loginPage.login(USERS.standard.username, "");
    await expect(loginPage.errorMessage)
        .toHaveText('Epic sadface: Password is required');
});



test('Login fails when both fields are empty', async ({loginPage, page}) => {
    await loginPage.login('', '');
    await expect(loginPage.errorMessage).toBeVisible(); 
});



test('Login fails when username is empty', async ({loginPage, page}) => {
    await loginPage.login('', USERS.standard.password);
    await expect(loginPage.errorMessage).toBeVisible(); 
});



test('Logged-in user can log out', async ({ loginPage, page}) => {
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await expect(page).toHaveURL(/inventory/);
    await loginPage.logout();
});


test('Locked out user Attempts to log into their account ' , async ({loginPage, page}) => {
    await loginPage.login(USERS.locked.username , USERS.standard.password);
    await expect(loginPage.errorMessage).toBeVisible(); 
    await expect(loginPage.errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.')
});