import { test, expect } from '@playwright/test';

test('Filtering and Search Flow', async ({ page }) => {

  await page.goto('https://automationexercise.com/products');

  // Search Product
  await page.locator('#search_product').fill('Blue Top');

  await page.locator('#submit_search').click();

  await expect(page.locator('body')).toContainText('Blue Top');

  // Category Filter
  await page.getByText('Women').click();

  await expect(page.locator('body')).toContainText('Women');

  // Negative Search
  await page.locator('#search_product').fill('abcdefxyz');

  await page.locator('#submit_search').click();

  await expect(page.locator('body')).toContainText('Searched Products');

});