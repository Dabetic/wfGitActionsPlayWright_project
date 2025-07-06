import {test, expect} from '@playwright/test'


test.beforeEach(async ({page}) => {

    const link: string = process.env.TEST_LINK || ''
    console.log(link)
    await page.goto(link)
    
})


test('checking meta title', async({page}) => {


    const metaTitle = page.locator('title').first()
    
    await expect(metaTitle).toBeAttached()
    
    
    const content = await metaTitle.textContent()

    console.log(content)
    
    
    expect(content).not.toBeNull();
    expect(content?.trim()).not.toBe('')
    
    
    })


test('checking meta description', async({page}) => {


const metaDescription = page.locator('meta[name="description"]')

await expect(metaDescription).toBeAttached()


const content = await metaDescription.getAttribute('content');


expect(content).not.toBeNull();
expect(content?.trim()).not.toBe('')


})