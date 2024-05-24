import { Page, expect } from '@playwright/test';

class HomePage {

    async clickCreateNewImage(page: Page) {
        await page.locator(':text("Create New Image")').click();
    }

    async TypeAPrompt(page: Page, prompt: string) {
        await page.fill('textarea[placeholder="Type a prompt ..."]', prompt);
    }

    async fillEmail(page: Page, email: string) {
        await page.fill('input[placeholder="name@host.com"]', email);
    }

    async fillPassword(page: Page, password: string) {
        await page.fill('input[placeholder="Password"]', password);
    }

    async clickSignIn(page: Page) {
        await page.locator(':text("Sign in")').click();
    }

    async clickCloseButton1(page: Page) {
        await page.locator('[aria-label="Close"]').nth(0).click();
    }

    async clickCloseButton2(page: Page) {
        await page.locator('[aria-label="Close"]').nth(1).click();
    }

    async validateModel(page: Page) {
    const element = page.locator('.chakra-text.css-yvepyr').first();
    await expect(element).toHaveText('Leonardo Lightning XL');
    }

    async AlchemyV2Off(page: Page) {
        await page.locator('div').filter({ hasText: /^AlchemyV2Loading\.\.\.$/ }).locator('span').nth(2).click();
    }

    async setImageSize(page: Page) {
        await page.locator('div').filter({ hasText: /^512 × 512$/ }).first().click();
    }

    async setImageNumber(page: Page) {
        await page.locator('div').filter({ hasText: /^1$/ }).first().click();
    }

    async clickGenerate(page: Page) {
        await page.click('button.chakra-button.css-102okvd');
    }
    
    async validateImage(page: Page) {
        await page.locator('img').first().isVisible();
    }

}

export default HomePage;