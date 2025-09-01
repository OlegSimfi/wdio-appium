
describe('Search homework', () => {
    it('Get Element by Accessibility ID', async () => {
        await expect($('~Animation')).toBeDisplayed();
    });

    it('Get Element by Resource ID', async () => {
        await expect($('id=android:id:action_bar')).toBeDisplayed();
    });

    it('Get Element by Class Name', async () => {
        await expect($('android.widget.TextView')).toBeDisplayed();
    });

    it('Get Element by XPath with content-desc', async () => {
        await expect($('//android.widget.TextView[@content-desc="NFC"]')).toBeDisplayed();
    });

    it('Get Element by UiSelector text', async () => {
        await expect($('android=new UiSelector().text("NFC")')).toBeDisplayed();
    });

    it('Get Multiple elements', async () => {
        const elements = await $$('android.widget.TextView');
        await expect(elements).toBeElementsArrayOfSize(13);
    });
});