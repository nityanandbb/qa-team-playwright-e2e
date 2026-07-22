import { test, expect } from '@playwright/test';

test('Child Window', async ({ page }) => {

  await page.goto('https://demoqa.com/browser-windows');

  const [newPage] = await Promise.all([
    page.waitForEvent('popup'),
    page.locator('#windowButton').click()
  ]);

  await expect(newPage.locator('#sampleHeading')).toHaveText('This is a sample page');

  await page.bringToFront();

  await expect(page).toHaveURL(/browser-windows/);

});