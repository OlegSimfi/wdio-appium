import { $, browser, driver } from '@wdio/globals'

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
        await $('//android.widget.TextView[@text="Sign in"]').click();
    });

    afterEach(async () => {
        if (await $('//android.widget.TextView[@text="Garage"]').isDisplayed()) {
            await $('//android.widget.TextView[@text="My profile"]').click();
            await clickMenuItemByIndex(5);
        }
        await driver.terminateApp('com.hillelAuto');
    });


    it('Log in with correct credentials', async () => {
        await $('//android.widget.TextView[@text="Email"]/following-sibling::android.widget.EditText[1]').setValue('michael.krasnovskyi+testUser1@gmail.com');
        await $('//android.widget.TextView[@text="Email"]/following-sibling::android.widget.EditText[2]').setValue('ZSgeVQhuU3qkvlG');
        await $('//android.widget.TextView[@text="Login"]').click();
        await  expect($('//android.widget.TextView[@text="Garage"]')).toBeDisplayed();  
    });

    it('Log in with incorrect credentials', async () => {
        await $('//android.widget.TextView[@text="Email"]/following-sibling::android.widget.EditText[1]').setValue('michael.krasnovskyi+testUser1@gmail.com');
        await $('//android.widget.TextView[@text="Email"]/following-sibling::android.widget.EditText[2]').setValue('wrongPassword');
        await $('//android.widget.TextView[@text="Login"]').click();
        await  expect($('//android.widget.TextView[@text="Wrong email or password"]')).toBeDisplayed();
    });

    it('Log in without email', async () => {
        await $('//android.widget.TextView[@text="Email"]/following-sibling::android.widget.EditText[1]').setValue('');
        await $('//android.widget.TextView[@text="Email"]/following-sibling::android.widget.EditText[2]').setValue('somePassword');
        await $('//android.widget.TextView[@text="Login"]').click();
        await  expect($('//android.widget.TextView[@text="Email is required"]')).toBeDisplayed(); 
    });

    it('Log in without password', async () => {
        await $('//android.widget.TextView[@text="Email"]/following-sibling::android.widget.EditText[1]').setValue('michael.krasnovskyi+testUser1@gmail.com');
        await $('//android.widget.TextView[@text="Email"]/following-sibling::android.widget.EditText[2]').setValue('');
        await $('//android.widget.TextView[@text="Login"]').click();
        await  expect($('//android.widget.TextView[@text="Password is too short"]')).toBeDisplayed();
    });

    it('Opening Registration popup', async () => {
        await $('//android.widget.TextView[@text="Registration"]').click();
        await expect($('//android.widget.TextView[@text="Register"]')).toBeDisplayed();
    });

    it('Opening Restore Access popup', async () => {
        await $('//android.widget.TextView[@text="Forgot Password"]').click();
        await expect($('//android.widget.TextView[@text="Restore access"]')).toBeDisplayed();
    });
});    