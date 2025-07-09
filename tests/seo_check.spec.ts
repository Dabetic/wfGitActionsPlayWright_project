import {test, expect} from '@playwright/test'

import fs from 'fs';



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

    let rezultat: string = ""

    if (content && content.trim() !== '') {
        rezultat = "✅ Sve je ok"
        console.log(rezultat);
      } else {
        rezultat = "❌ Nedostaje meta title"
        console.log(rezultat);
      }
    
      console.log('Rezultati nakon' + rezultat)
    
    expect(content).not.toBeNull();
    expect(content?.trim()).not.toBe('')
    

    fs.writeFileSync('backend/test-results/playwright-result.txt', `Rezultat testa: ${rezultat}`);

    
    })


test.skip('checking meta description', async({page}) => {


const metaDescription = page.locator('meta[name="description"]')

await expect(metaDescription).toBeAttached()


const content = await metaDescription.getAttribute('content');

 if (content && content.trim() !== '') {
        let akoJeProso = "Sve je ok"
        console.log(akoJeProso);
      } else {
        let akoNije = "Nedostaje meta title"
        console.log(akoNije);
      }


expect(content).not.toBeNull();
expect(content?.trim()).not.toBe('')


})