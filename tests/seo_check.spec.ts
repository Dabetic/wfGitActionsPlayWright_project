import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.beforeEach(async ({ page }) => {
  const link = process.env.TEST_LINK || '';
  console.log('Opening:', link);
  await page.goto(link);
});

test('checking meta title', async ({ page }) => {
  const metaTitle = page.locator('title').first();
  await expect(metaTitle).toBeAttached();

  const content = await metaTitle.textContent();
  console.log('Naslov:', content);

  let rezultat = '';

  if (content && content.trim() !== '') {
    rezultat = 'Sve je ok';
  } else {
    rezultat = 'Nedostaje meta title';
  }

  // 👇 Pripremi folder i fajl
  const resultDir = path.resolve('backend/test-results');
  const resultPath = path.join(resultDir, 'playwright-result.txt');

  // Ako folder ne postoji, kreiraj ga
  if (!fs.existsSync(resultDir)) {
    fs.mkdirSync(resultDir, { recursive: true });
  }

  fs.writeFileSync(resultPath, `Rezultat testa: ${rezultat}`);

  console.log(`FINAL_RESULT::${rezultat}`);
});


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
