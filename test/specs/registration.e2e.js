import { $, driver } from '@wdio/globals'

describe('Registration tests', () => {
    const clickMenuItemByIndex = async (index) => {
        const { width: screenWidth, height: screenHeight } = await driver.getWindowRect();

        const menuTopY = Math.floor(screenHeight * 0.07);
        const menuBottomY = Math.floor(screenHeight * 0.33);
        const menuLeftX = Math.floor(screenWidth * 0.61);
        const menuRightX = Math.floor(screenWidth * 0.98);

        const menuItemHeight = Math.floor((menuBottomY - menuTopY) / 6);
        const clickX = menuLeftX + Math.floor((menuRightX - menuLeftX) / 2);
        const clickY = menuTopY + index * menuItemHeight + Math.floor(menuItemHeight / 2);

        await driver.action('pointer')
            .move(clickX, clickY)
            .down()
            .pause(100)
            .up()
            .perform();
    };

    beforeEach(async () => {
        await driver.activateApp('com.hillelAuto');
        await $('//android.widget.TextView[@text="Sign up"]').click();
    });

    afterEach(async () => {
        if (await $('//android.widget.TextView[@text="Garage"]').isDisplayed()) {
            await $('//android.widget.TextView[@text="My profile"]').click();
            await clickMenuItemByIndex(5);
            await driver.pause(5000);
        }
        await driver.terminateApp('com.hillelAuto');
    });

    it('All fields are empty', async () => {
        await $('//android.widget.TextView[@text="Register"]').click();

        await expect($('//android.widget.TextView[@text="Name is required"]')).toBeDisplayed();
        await expect($('//android.widget.TextView[@text="Last name is required"]')).toBeDisplayed();
        await expect($('//android.widget.TextView[@text="Email is required"]')).toBeDisplayed();
        await expect($('//android.widget.TextView[@text="Password is required"]')).toBeDisplayed();
        await expect($('//android.widget.TextView[@text="Re-enter Password is required"]')).toBeDisplayed();
    });

    it('Incorrect Name field - short', async () => {
        await $('//android.widget.EditText[1]').setValue('T');
        await $('//android.widget.TextView[@text="Register"]').click();
        await expect($('//android.widget.TextView[@text="Name has to be from 2 to 20 characters long"]')).toBeDisplayed();
    });

    it('Incorrect Name field - long', async () => {
        await $('//android.widget.EditText[1]').setValue('123456789123456789111');
        await $('//android.widget.TextView[@text="Register"]').click();
        await expect($('//android.widget.TextView[@text="Name has to be from 2 to 20 characters long"]')).toBeDisplayed();
    });

    it('Incorrect Last Name field - short', async () => {
        await $('//android.widget.EditText[2]').setValue('T');
        await $('//android.widget.TextView[@text="Register"]').click();
        await expect($('//android.widget.TextView[@text="Last name has to be from 2 to 20 characters long"]')).toBeDisplayed();
    });

    it('Incorrect Last Name field - long', async () => {
        await $('//android.widget.EditText[2]').setValue('123456789123456789111');
        await $('//android.widget.TextView[@text="Register"]').click();
        await expect($('//android.widget.TextView[@text="Last name has to be from 2 to 20 characters long"]')).toBeDisplayed();
    });

    it('Incorrect Email field', async () => {
        await $('//android.widget.EditText[3]').setValue('test');
        await $('//android.widget.TextView[@text="Register"]').click();
        await expect($('//android.widget.TextView[@text="Email is not valid"]')).toBeDisplayed();
    });

    it('Incorrect Password field - short', async () => {
        await $('//android.widget.EditText[4]').setValue('18Tt');
        await $('//android.widget.TextView[@text="Register"]').click();
        await expect($('//android.widget.TextView[@text="Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"]')).toBeDisplayed();
    });

    it('Incorrect Password field - long', async () => {
        await $('//android.widget.EditText[1]').setValue('UserName');
        await $('//android.widget.EditText[2]').setValue('UserLastName');
        const email = `michael.krasnovskyi+testUser${Math.floor(Math.random() * 10000)}@gmail.com`;
        await $('//android.widget.EditText[3]').setValue(email);
        await $('//android.widget.EditText[4]').setValue('testtest!8Ttesttesttesttesttestetsttest');
        await $('//android.widget.EditText[5]').setValue('testtest!8Ttesttesttesttesttestetsttest');
        await $('//android.widget.TextView[@text="Register"]').click();
        await expect($('//android.widget.TextView[@text="Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"]')).toBeDisplayed();
    });

    it('Incorrect Password field - without special symbols', async () => {
        await $('//android.widget.EditText[4]').setValue('testtesttest');
        await $('//android.widget.TextView[@text="Register"]').click();
        await expect($('//android.widget.TextView[@text="Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"]')).toBeDisplayed();
    });

    it('Passwords do not match', async () => {
        await $('//android.widget.EditText[1]').setValue('UserName');
        await $('//android.widget.EditText[2]').setValue('UserLastName');
        const email = `michael.krasnovskyi+testUser${Math.floor(Math.random() * 10000)}@gmail.com`;
        await $('//android.widget.EditText[3]').setValue(email);
        await $('//android.widget.EditText[4]').setValue('test!R53525');
        await $('//android.widget.EditText[5]').setValue('test!R53525NEW');
        await $('//android.widget.TextView[@text="Register"]').click();
        await expect($('//android.widget.TextView[@text="Passwords do not match"]')).toBeDisplayed();
    });

    it('Correct Registration', async () => {
        await $('//android.widget.EditText[1]').setValue('UserName');
        await $('//android.widget.EditText[2]').setValue('UserLastName');
        const email = `michael.krasnovskyi+testUser${Math.floor(Math.random() * 10000)}@gmail.com`;
        await $('//android.widget.EditText[3]').setValue(email);
        await $('//android.widget.EditText[4]').setValue('test!R53525');
        await $('//android.widget.EditText[5]').setValue('test!R53525');
        await $('//android.widget.TextView[@text="Register"]').click();
        await expect($('//android.widget.TextView[@text="Garage"]')).toBeDisplayed();
    });
});