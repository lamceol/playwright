import { test, expect } from '@playwright/test';
import HomePage from './HomePage';
import LandingPage from './LandingPage';
import dotenv from 'dotenv';
dotenv.config();

test('Leonardo.ai - basic test-to-image flow', async ({ page, context }) => {
    // Initialize page objects and retrieve environment variables
    const homePage = new HomePage();
    const landingPage = new LandingPage();
    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;
    if (!email || !password) {
        throw new Error('EMAIL or PASSWORD is not defined in the environment variables');
    }
    test.setTimeout(120 * 1000);

    // GIVEN a logged in user
    await page.goto('https://www.leonardo.ai/'); // Go to www.leonardo.ai
    await expect(page).toHaveTitle(/Leonardo/); // Expect page title "to contain" a substring.
    await landingPage.clickCreateAccount(page);  // Click on the 'Create an account' button
    await page.waitForTimeout(2000); // Wait for the new tab to open
    const pages = context.pages(); // Get all the pages in the context
    const newTab = pages[1]; // Go to the new tab
    await homePage.fillEmail(newTab, email); // Fill in the sign-in form
    await homePage.fillPassword(newTab, password);
    await homePage.clickSignIn(newTab); // Click the 'Sign in' button
    await page.waitForTimeout(2000); // wait 2 seonds
    await homePage.clickCloseButton1(newTab); // close the "What's New" pop-up
    
    // AND the Image Generation page
    await homePage.clickCreateNewImage(newTab); // Click on the 'Create New Image' link
    await newTab.waitForTimeout(1000); // wait 1 seonds
    await homePage.clickCloseButton2(newTab); // close the "Welcome to Leonardo Alchemy!" pop-up

    // AND the “Leonardo Lightning XL” model
    await homePage.validateModel(newTab); // Validate the model is "Leonardo Lightning XL"
    
    // AND Alchemy turned off
    await homePage.AlchemyV2Off(newTab); // Toggle Alchemy V2 OFF

    // AND a prompt of “a successful end to end test”
    await homePage.TypeAPrompt(newTab, 'a successful end to end test'); // Type a prompt

    // AND image dimensions of 512 x 512
    await homePage.setImageSize(newTab); // set image size 

    // AND Number of Images is 1
    await homePage.setImageNumber(newTab); // set number of images to '1'

    // WHEN the generate button is clicked   
    await homePage.clickGenerate(newTab); // click the generate button to generate image
    await newTab.waitForTimeout(10000); // wait 10 seconds

    // THEN the generated image displays successfully
    await homePage.validateImage(newTab);  // confirm a picture has been generated

    // Close the browser at the end of the test
    await browser.close();

});