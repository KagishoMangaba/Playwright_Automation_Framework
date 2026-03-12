import { Page, Locator } from '@playwright/test';

export class LoginPage {
    username: Locator;
    password: Locator;
    loginBtn: Locator;

    constructor(private page: Page) {
        this.username = page.locator('#user-name');
        this.password = page.locator('#password');
        this.loginBtn = page.locator('#login-button');
    }

    async login(user: string, pass: string) {
        await this.username.fill(user);
        await this.password.fill(pass);
        await this.loginBtn.click();
    }
}