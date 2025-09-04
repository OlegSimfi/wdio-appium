import { $, browser, driver } from '@wdio/globals'

describe('Garage tests', () => {

const selectBrandByIndex = async (index) => {
        const { width: screenWidth, height: screenHeight } = await driver.getWindowRect();

        const menuTopY = Math.floor(screenHeight * (790 / screenHeight));
        const menuBottomY = Math.floor(screenHeight * (1325 / screenHeight));
        const menuLeftX = Math.floor(screenWidth * (105 / screenWidth));
        const menuRightX = Math.floor(screenWidth * (970 / screenWidth));

        const menuItemHeight = Math.floor((menuBottomY - menuTopY) / 5);
        const clickX = menuLeftX + Math.floor((menuRightX - menuLeftX) / 2);
        const clickY = menuTopY + index * menuItemHeight + Math.floor(menuItemHeight / 2);

        await driver.action('pointer').move(clickX, clickY)
            .down() 
            .pause(100)
            .up()
            .perform();
    };
    
        const selectModelByIndex = async (index) => {
        const { width: screenWidth, height: screenHeight } = await driver.getWindowRect();

        const menuTopY = Math.floor(screenHeight * (1050 / screenHeight));
        const menuBottomY = Math.floor(screenHeight * (1575 / screenHeight));
        const menuLeftX = Math.floor(screenWidth * (105 / screenWidth));
        const menuRightX = Math.floor(screenWidth * (970 / screenWidth));

        const menuItemHeight = Math.floor((menuBottomY - menuTopY) / 5);
        const clickX = menuLeftX + Math.floor((menuRightX - menuLeftX) / 2);
        const clickY = menuTopY + index * menuItemHeight + Math.floor(menuItemHeight / 2);
        await driver.action('pointer').move(clickX, clickY)
            .down()
            .pause(100)
            .up()
            .perform();
    };

    before( async () => {
        await $('//android.widget.TextView[@text="Sign in"]').click();
        await $('//android.widget.TextView[@text="Email"]/following-sibling::android.widget.EditText[1]').setValue('michael.krasnovskyi+testUser1@gmail.com');
        await $('//android.widget.TextView[@text="Email"]/following-sibling::android.widget.EditText[2]').setValue('ZSgeVQhuU3qkvlG');
        await $('//android.widget.TextView[@text="Login"]').click();
        await  expect($('//android.widget.TextView[@text="Garage"]')).toBeDisplayed();  
    });

    beforeEach( async () => {
        await driver.activateApp('com.hillelAuto');
    });

    afterEach(async ()  => {
        await driver.terminateApp('com.hillelAuto');
    });


    it('Add a car - BMW 5', async () => {
        await $('//android.widget.TextView[@text="Add Car"]').click();
        await $('~Audi').click();
        await selectBrandByIndex(1); // BMW
        await $('~3').click();
        await selectModelByIndex(1);
        await $('//android.widget.EditText').setValue('999');
        await $('//android.widget.TextView[@text="Add"]').click();
        const carName = await $('(//android.view.ViewGroup)[8]/android.widget.TextView[1]').getAttribute('text');

        expect(carName).toContain('BMW');
        expect(carName).toContain('5');
    }); 

    it('Add a car - Ford Fiesta', async () => { 
        await $('//android.widget.TextView[@text="Add Car"]').click();
        await $('~Audi').click();
        await selectBrandByIndex(2); // Ford
        await $('//android.widget.EditText').setValue('999');
        await $('//android.widget.TextView[@text="Add"]').click();
        const carName = await $('(//android.view.ViewGroup)[8]/android.widget.TextView[1]').getAttribute('text');

        expect(carName).toContain('Ford');
        expect(carName).toContain('Fiesta');
    });

    it('Add a car - Aude Q7', async () => {
        await $('//android.widget.TextView[@text="Add Car"]').click();
        await $('~TT').click();
        await selectModelByIndex(2);
        await $('//android.widget.EditText').setValue('999');
        await $('//android.widget.TextView[@text="Add"]').click();
        const carName = await $('(//android.view.ViewGroup)[8]/android.widget.TextView[1]').getAttribute('text');

        expect(carName).toContain('Audi');
        expect(carName).toContain('Q7'); 
    });

    it('Add a car - Fiat Panda', async () => {
        await $('//android.widget.TextView[@text="Add Car"]').click();
        await $('~Audi').click();
        await selectBrandByIndex(4); // Fiat
        await $('~Palio').click();
        await selectModelByIndex(2);
        await $('//android.widget.EditText').setValue('999');
        await $('//android.widget.TextView[@text="Add"]').click();
        const carName = await $('(//android.view.ViewGroup)[8]/android.widget.TextView[1]').getAttribute('text');

        expect(carName).toContain('Fiat');
        expect(carName).toContain('Panda');
    }); 
});    