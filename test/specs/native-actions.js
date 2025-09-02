describe('Native Actions homework', () => {
    it('Task 1', async () => {
        await $('~Views').click();

        while (!(await $('~WebView3').isDisplayed())) {
            await driver.performActions([{
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: 500, y: 1114 },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: 500 },
                    { type: 'pointerMove', duration: 1000, x: 500, y: 275 },
                    { type: 'pointerUp', button: 0 }
                ]
            }]);
        }
    });

    it('Task 2', async () => {
        await $('~Views').click();
        const element = await $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("WebView3"))');
        await browser.pause(2000);
    });
});

