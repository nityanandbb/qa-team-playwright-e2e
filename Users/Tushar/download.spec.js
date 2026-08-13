import { test } from '@playwright/test';

test('File Download', async ({ page }) => {

await page.goto('https://demoqa.com/upload-download');

const downloadPromise = page.waitForEvent('download');

await page.locator('#downloadButton').click();

await downloadPromise;

});