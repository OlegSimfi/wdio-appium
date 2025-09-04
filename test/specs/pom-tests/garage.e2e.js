import { $, browser, driver, expect } from '@wdio/globals'
import HomeScreen from '../page-objects/screens/HomeScreen';
import SignInForm from '../page-objects/forms/SignInForm.js';
import GarageScreen from '../page-objects/screens/GarageScreen';    

describe('Garage tests', () => {

    before( async () => {
        await HomeScreen.openSignInForm();
        await SignInForm.setEmail('michael.krasnovskyi+testUser1@gmail.com');
        await SignInForm.setPassword('ZSgeVQhuU3qkvlG');
        await SignInForm.clickLoginButton();
        await expect(GarageScreen.screenTitle).toBeDisplayed();
    });

    beforeEach( async () => {
        await driver.activateApp('com.hillelAuto');
    });

    afterEach(async ()  => {
        await driver.terminateApp('com.hillelAuto');
    });


    it('Add a car - BMW 5', async () => { 
        await GarageScreen.addCarByBrandAndModelIndexes(1, 1);
        await GarageScreen.verifyLastAddedCar('BMW', '5');
    }); 

    it('Add a car - Ford Fiesta', async () => { 
        await GarageScreen.addCarByBrandAndModelIndexes(2);
        await GarageScreen.verifyLastAddedCar('Ford', 'Fiesta'); 
    });

    it('Add a car - Audi Q7', async () => {
        await GarageScreen.addCarByBrandAndModelIndexes(0, 2);
        await GarageScreen.verifyLastAddedCar('Audi', 'Q7'); 
    });

    it('Add a car - Fiat Panda', async () => {
        await GarageScreen.addCarByBrandAndModelIndexes(4, 2);
        await GarageScreen.verifyLastAddedCar('Fiat', 'Panda'); 
    }); 
});    