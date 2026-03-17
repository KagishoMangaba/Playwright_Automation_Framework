import { Page, Locator } from '@playwright/test';

export class LoginPage {
   readonly username: Locator;
   readonly password: Locator;
   readonly loginBtn: Locator;

    constructor(private page: Page) {
        this.username = page.locator('#user-name');
        this.password = page.locator('#password');
        this.loginBtn = page.locator('#login-button');
    }

    async enterUsername(user: string) {
        await this.username.fill(user)
    }   

    async enterPassword(pass: string) {
        await this.password.fill(pass)
    }
    

    async login(user: string, pass: string) {
        await this.enterUsername(user)
        await this.enterPassword(pass)
        await this.loginBtn.click();
    }
}