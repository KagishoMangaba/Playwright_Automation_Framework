import { Page, Locator } from '@playwright/test';

export class CheckoutInformationPage {
    firstName: Locator;
    lastName: Locator;
    postalCode: Locator;
    continueBtn: Locator;



     constructor(private page: Page) {
     this.firstName = page.locator('#first-name');
     this.lastName = page.locator('#last-name');
     this.postalCode = page.locator('#postal-code');
     this.continueBtn= page.locator('#continue')

    }


    async fillInformation(first: string , last: string , postal: string) {

        await this.firstName.fill(first)
        await this.lastName.fill(last)
        await this.postalCode.fill(postal)

    }

    async navigateToCheckoutOverview() {
       await this.continueBtn.click();
    }



}