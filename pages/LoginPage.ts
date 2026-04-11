import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
   private readonly username: Locator;
   private readonly password: Locator;
   private readonly loginBtn: Locator;
   private readonly errorMessage: Locator;
   private readonly openMenu: Locator;
   private readonly logoutBtn: Locator;



    constructor(private page: Page) {
    this.username     = page.locator('#user-name');
    this.password     = page.locator('#password');
    this.loginBtn     = page.locator('#login-button');
    this.errorMessage = page.locator('.error-message-container h3')
    this.openMenu     = page.locator("//button[@id='react-burger-menu-btn']")
    this.logoutBtn    = page.locator("a[id='logout_sidebar_link']")

    
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

    

   getErrorMessage() {
  return this.errorMessage;
}


    async logout() {
        await this.openMenu.click();
        await this.logoutBtn.click();


    }

    async assertErrorMessageVisible(): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
  }


  async assertErrorMessageText(expectedText: string): Promise<void> {
    await expect(this.errorMessage).toHaveText(expectedText);
  }


    



}