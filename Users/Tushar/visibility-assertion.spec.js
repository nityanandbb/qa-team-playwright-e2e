import { test, expect } from '@playwright/test';

test('Visibility Assertion', async ({ page }) => {

  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

  const textbox = page.locator('#displayed-text');

  await expect(textbox).toBeVisible();

  await expect(page.getByRole('button', {name: 'Hide'})).toBeVisible();

  await page.getByRole('button', {name: 'Hide'}).click();

  await expect(textbox).toBeHidden();

  await expect(page.getByRole('button', {name: 'Show'})).toBeVisible();

  await page.getByRole('button', {name: 'Show'}).click();

  await expect(textbox).toBeVisible();

});
