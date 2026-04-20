import { Page, Locator } from '@playwright/test';
import { Logger } from '../utils/logger';
import { InteractUtil } from '../utils/Interact';

export class CheckoutInformationPage {
    private readonly firstName: Locator;
    private readonly lastName: Locator;
    private readonly postalCode: Locator;
    private readonly continueBtn: Locator;
    private readonly informationError: Locator;

    private readonly log: Logger;
    private readonly interact: InteractUtil;

    constructor(private readonly page: Page) {
        this.log      = new Logger('CheckoutInformationPage');
        this.interact = new InteractUtil(this.log);

        this.firstName        = page.locator('#first-name');
        this.lastName         = page.locator('#last-name');
        this.postalCode       = page.locator('#postal-code');
        this.continueBtn      = page.locator('#continue');
        this.informationError = page.locator('.error-message-container.error');
    }

    getInfoErrorMessage(): Locator {
        return this.informationError;
    }


    async getInfoErrorMessageText(): Promise<string> {
        return await this.interact.getText(this.informationError, 'Information Error Message');
    }


    async isInfoErrorMessageVisible(): Promise<boolean> {
        return await this.interact.isVisible(this.informationError, 'Information Error Message');
    }


    async fillInformation(first: string, last: string, postal: string): Promise<void> {
        await this.interact.write(this.firstName, first, 'First Name');
        await this.interact.write(this.lastName, last, 'Last Name');
        await this.interact.write(this.postalCode, postal, 'Postal Code');
    }

    
    async completeCheckout(first: string, last: string, postal: string): Promise<void> {
        await this.fillInformation(first, last, postal);
        await this.interact.click(this.continueBtn, 'Continue Button');
    }
}