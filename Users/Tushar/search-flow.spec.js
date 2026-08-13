import { test, expect } from '@playwright/test';

test.describe('Wikipedia Search Flow', () => {

  test('Valid Search - India', async ({ page }) => {

   await page.goto('https://www.wikipedia.org/');

   await page.locator('#searchInput').fill('India');

   await page.keyboard.press('Enter');

   await expect(page).toHaveURL(/India/);

   await expect(page.locator('#firstHeading')).toContainText('India');

   await expect(page.locator('body')).toContainText('Republic of India');

  });


  test('Partial Match Search', async ({ page }) => {

  await page.goto('https://www.wikipedia.org/');

  await page.locator('#searchInput').fill('ind');
  await page.getByText('India').first().click();

  await expect(page).toHaveURL(/India/);

  await expect(page.locator('#firstHeading')).toContainText('India');

  await expect(page.locator('body')).toContainText('Republic of India');

});


  test('Case Sensitivity Search', async ({ page }) => {

  await page.goto('https://www.wikipedia.org/');

  await page.locator('#searchInput').fill('INDIA');

  await page.keyboard.press('Enter');

  await expect(page).toHaveURL(/INDIA|India/i);

  await expect(page.locator('#firstHeading')).toBeVisible();

  await expect(page.locator('body')).toContainText('INDIA');

});


  test('Invalid Search - No Results', async ({ page }) => {

  await page.goto('https://www.wikipedia.org/');

  await page.locator('#searchInput').fill('fsaafafdafdfd');

  await page.keyboard.press('Enter');

  await expect(page).toHaveURL(/search/i);

  await expect(page.locator('body')).toContainText('There were no results matching the query');

  await expect(page.locator('body')).toContainText('does not exist');

  });

});