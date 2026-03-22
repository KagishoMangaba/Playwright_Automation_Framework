import { Page, Locator } from '@playwright/test';

export class CheckoutInformationPage {
   readonly firstName: Locator;
   readonly lastName: Locator;
   readonly postalCode: Locator;
   readonly continueBtn: Locator;
   readonly informationError: Locator;



     constructor(private page: Page) {
     this.firstName = page.locator('#first-name');
     this.lastName = page.locator('#last-name');
     this.postalCode = page.locator('#postal-code');
     this.continueBtn = page.locator('#continue')
     this.informationError = page.locator('.error-message-container.error')


    }

    async enterFirstName(first: string) {
        await this.firstName.fill(first)
    }

    async enterLastName(last: string) {
        await this.lastName.fill(last)
    }

     async enterPostalCode(postal: string) {
        await this.postalCode.fill(postal)
    }

    
    async fillInformation(first: string , last: string , postal: string) {
       await this.enterFirstName(first)
       await this.enterLastName(last)
       await this.enterPostalCode(postal)
    
    
    }

   async completeCheckout(first: string, last: string, postal: string) {
    await this.fillInformation(first, last, postal);
    await this.continueBtn.click();
}

async getInfoErrorMessage() {
    return await this.informationError.textContent();
}


}