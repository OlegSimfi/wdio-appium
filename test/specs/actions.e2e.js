import { $, browser } from '@wdio/globals'

describe('Actions homework', () => {
    it('Task 1', async () => {
        await $('~App').click();
        await $('~Search').click();
        await $('~Invoke Search').click();
        await expect($('//android.widget.TextView[@text="App/Search/Invoke Search"]')).toBeDisplayed();

        await $('id=io.appium.android.apis:id/txt_query_prefill').setValue('Test value 1');
        await $('id=io.appium.android.apis:id/txt_query_appdata').setValue('Test value 2');

        await expect($('id=io.appium.android.apis:id/txt_query_prefill')).toHaveText('Test value 1');
        await expect($('id=io.appium.android.apis:id/txt_query_appdata')).toHaveText('Test value 2');
ы
        await $('id=io.appium.android.apis:id/txt_query_prefill').clearValue();
        await expect($('id=io.appium.android.apis:id/txt_query_prefill')).toHaveText('');
    });

    it('Task 2', async () => {
        await $('~Views').click();
        await $('~Controls').click();
        await $('~3. Holo Light Theme').click();
        await expect($('//android.widget.TextView[@text="Views/Controls/3. Holo Light Theme"]')).toBeDisplayed();

        await $('id=io.appium.android.apis:id/check1').click();
        await $('id=io.appium.android.apis:id/radio2').click();

        await expect($('id=io.appium.android.apis:id/check1')).toHaveAttr('checked', 'true');
        await expect($('id=io.appium.android.apis:id/radio2')).toHaveAttr('checked', 'true');

        await $('id=io.appium.android.apis:id/spinner1').click();
        await $('//android.widget.CheckedTextView[@resource-id="android:id/text1" and @text="Mars"]').click();
        await expect($('//android.widget.TextView[@resource-id="android:id/text1"]')).toHaveText('Mars');
    });
});