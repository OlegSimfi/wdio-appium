class GarageScreen {
    get screenTitle() {
        return $('//android.widget.TextView[@text="Garage"]');
    }

    get menuDropdown() {
        return $('//android.widget.TextView[@text="My profile"]');
    }

    get addNewCarButton() {
        return $('//android.widget.TextView[@text="Add Car"]');
    }

    get brandDropdown() {
        return $('');
    }

    get modelDropdown() {
        return $('');
    }

    get brandDropdown() {
        return $('(//android.widget.TextView[@text="Add a car"]/..//android.view.ViewGroup[@content-desc])[2]');
    }

    get modelDropdown() {
        return $('(//android.widget.TextView[@text="Add a car"]/..//android.view.ViewGroup[@content-desc])[3]');
    }

    get mileageField() {
        return $('//android.widget.EditText');
    }

    get addCarButton() {
        return $('//android.widget.TextView[@text="Add"]');
    }

    async getLastAddedCarName() {
        return await $('(//android.view.ViewGroup)[8]/android.widget.TextView[1]').getAttribute('text');
    }

    async clickMenuDropdown() {
        await this.menuDropdown.click();
    }

    async addCarByBrandAndModelIndexes(brandIndex = 0, modelIndex = 0) {
        await this.addNewCarButton.click();
        await this.brandDropdown.click();  
        await this.selectBrandByIndex(brandIndex);
        await this.modelDropdown.click();
        await this.selectModelByIndex(modelIndex);
        await this.mileageField.setValue('999');
        await this.addCarButton.click();
    }

    async verifyLastAddedCar(brand, model) {
        const carName = await this.getLastAddedCarName();
        expect(carName).toContain(brand);
        expect(carName).toContain(model);
    }

    async selectBrandByIndex(index) {
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
    }

    async selectModelByIndex(index) {
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
    }
}
export default new GarageScreen();