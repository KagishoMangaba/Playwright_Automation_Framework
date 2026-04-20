import { Page, Locator } from '@playwright/test';
import { Logger } from '../utils/logger';
import { InteractUtil } from '../utils/Interact';

export class LoginPage {
    private readonly username: Locator;
    private readonly password: Locator;
    private readonly loginBtn: Locator;
    private readonly errorMessage: Locator;
    private readonly openMenu: Locator;
    private readonly logoutBtn: Locator;

    private readonly log: Logger;
    private readonly interact: InteractUtil;

    constructor(private readonly page: Page) {
        this.log      = new Logger('LoginPage');
        this.interact = new InteractUtil(this.log);

        this.username     = page.locator('#user-name');
        this.password     = page.locator('#password');
        this.loginBtn     = page.locator('#login-button');
        this.errorMessage = page.locator('.error-message-container h3');
        this.openMenu     = page.locator("//button[@id='react-burger-menu-btn']");
        this.logoutBtn    = page.locator("a[id='logout_sidebar_link']");
    }

    getErrorMessage(): Locator {
        return this.errorMessage;
    }

    async getErrorMessageText(): Promise<string> {
        return await this.interact.getText(this.errorMessage, 'Error Message');
    }

    async isErrorMessageVisible(): Promise<boolean> {
        return await this.interact.isVisible(this.errorMessage, 'Error Message');
    }

    async login(user: string, pass: string): Promise<void> {
        await this.interact.write(this.username, user, 'Username');
        await this.interact.write(this.password, pass, 'Password');
        await this.interact.click(this.loginBtn, 'Login Button');
    }

    async logout(): Promise<void> {
        await this.interact.click(this.openMenu, 'Menu Button');
        await this.interact.click(this.logoutBtn, 'Logout Button');
    }
}