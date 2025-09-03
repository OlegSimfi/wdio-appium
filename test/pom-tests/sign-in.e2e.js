import { $, browser, driver, expect } from '@wdio/globals' 
import HomeScreen from '../specs/page-objects/screens/HomeScreen.js'
import SignInForm from '../specs/page-objects/forms/SignInForm.js'
import SignUpForm from '../specs/page-objects/forms/SignUpForm.js'
import ForgotPasswordForm from '../specs/page-objects/forms/ForgotPasswordForm.js'

describe('Log in tests', () => {

    const clickMenuItemByIndex = async (index) => {
        const { width: screenWidth, height: screenHeight } = await driver.getWindowRect(); // Отримаємо розміри екрану
        const menuTopY = Math.floor(screenHeight * 0.07);  // 7% від висоти екрану
        const menuBottomY = Math.floor(screenHeight * 0.33); // 33% від висоти екрану
        const menuLeftX = Math.floor(screenWidth * 0.61);   // 61% від висоти екрану
        const menuRightX = Math.floor(screenWidth * 0.98);  // 98% від ширини екрану

        // Висота пункту меню
        const menuItemHeight = Math.floor((menuBottomY - menuTopY) / 6);

        // Середнє значення від ширини меню
        const clickX = menuLeftX + Math.floor((menuRightX - menuLeftX) / 2);

        // Формула для пункту меню за індексом, розраховане по ширині меню
        const clickY = menuTopY + index * menuItemHeight + Math.floor(menuItemHeight / 2);
        await driver.action('pointer').move(clickX, clickY)
            .down()
            .pause(100)
            .up()
            .perform();
    };

    beforeEach( async () => {
        await driver.activateApp('com.hillelAuto');
        await HomeScreen.openSignInForm();
    });

    afterEach(async () => {
        if (await $('//android.widget.TextView[@text="Garage"]').isDisplayed()) {
            await $('//android.widget.TextView[@text="My profile"]').click();
            await clickMenuItemByIndex(5);
        }
        await driver.terminateApp('com.hillelAuto');
    });


    it('Log in with correct credentials', async () => {
        await SignInForm.setEmail('michael.krasnovskyi+testUser1@gmail.com');
        await SignInForm.setPassword('ZSgeVQhuU3qkvlG');
        await SignInForm.clickLoginButton();
        await expect($('//android.widget.TextView[@text="Garage"]')).toBeDisplayed();
    });

    it('Log in with incorrect credentials', async () => {
        await SignInForm.setEmail('michael.krasnovskyi+testUser1@gmail.com');
        await SignInForm.setPassword('wrongPassword');
        await SignInForm.clickLoginButton();
        await expect(SignInForm.wrongDataMessage).toBeDisplayed();
    });

    it('Log in without email', async () => {
        await SignInForm.setEmail('');
        await SignInForm.setPassword('somePassword');
        await SignInForm.clickLoginButton();
        await expect(SignInForm.emptyEmailErrorMessage).toBeDisplayed(); 
    });

    it('Log in without password', async () => {
        await SignInForm.setEmail('michael.krasnovskyi+testUser1@gmail.com');
        await SignInForm.setPassword('');
        await SignInForm.clickLoginButton();
        await expect(SignInForm.emptyPasswordErrorMessage).toBeDisplayed(); 
    });

    it('Opening Registration popup', async () => {
        await SignInForm.clickRegistrationButton();
        await expect(SignUpForm.formTitle).toBeDisplayed();
    });

    it('Opening Restore Access popup', async () => {
        await SignInForm.clickForgotPasswordButton();
        await expect(ForgotPasswordForm.formTitle).toBeDisplayed();
    });
});     