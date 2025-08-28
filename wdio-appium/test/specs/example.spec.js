describe('Example Test Suite', () => {
    it('should launch the app and perform a simple test', async () => {
        // Launch the app
        await browser.launchApp();

        // Add your test steps here
        const element = await $('~elementSelector'); // Replace with your element selector
        await element.waitForDisplayed();
        await element.click();

        // Add assertions as needed
        const result = await $('~resultSelector'); // Replace with your result selector
        expect(await result.isDisplayed()).toBe(true);
    });
});