import { browser, driver, expect } from '@wdio/globals'

describe('First test', () => {
    it('test example', async () => {
        await browser.pause(3000);    
    })
})

