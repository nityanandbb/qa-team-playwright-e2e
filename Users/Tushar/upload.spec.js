import { test, expect } from '@playwright/test';

test('File Upload', async ({ page }) => {

  await page.goto('https://demoqa.com/upload-download');

  await page.locator('#uploadFile').setInputFiles('files/test.png');

  await expect(page.locator('#uploadedFilePath')).toContainText('test.png');

});