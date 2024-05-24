import { Page } from '@playwright/test';

class LandingPage {
    async clickCreateAccount(page: Page) {
        await page.locator(':text("Create an account")').click();
    }
}

export default LandingPage;