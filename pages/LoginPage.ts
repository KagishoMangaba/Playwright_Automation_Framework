import { Page, Locator } from '@playwright/test';

export class LoginPage {
   readonly username: Locator;
   readonly password: Locator;
   readonly loginBtn: Locator;
   readonly errorMessage: Locator;
   readonly openMenu: Locator;
   readonly logoutBtn: Locator;

    constructor(private page: Page) {
        this.username = page.locator('#user-name');
        this.password = page.locator('#password');
        this.loginBtn = page.locator('#login-button');
        this.errorMessage = page.locator('.error-message-container h3')
        this.openMenu = page.locator("//button[@id='react-burger-menu-btn']")
        this.logoutBtn = page.locator("a[id='logout_sidebar_link']")



    
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

    

    async getErrorMessage() {
        return await this.errorMessage.textContent()
    }


    async logout() {
        await this.openMenu.click();
        await this.logoutBtn.click();


    }



}