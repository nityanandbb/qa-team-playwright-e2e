import { test, expect } from '@playwright/test';

test('Navigation Flow', async ({ page }) => {

  // Home Page
  await page.goto('https://demoqa.com');

  await expect(page).toHaveURL('https://demoqa.com/');

  // Navigate to Forms
  await page.getByText('Forms').click();

  await expect(page).toHaveURL(/forms/);

  await expect(page.locator('body')).toContainText('Please select an item from left to start practice.');

  // Navigate to Practice Form
  await page.getByText('Practice Form').click();

  await expect(page).toHaveURL(/automation-practice-form/);

  await expect(page.locator('body')).toContainText('Practice Form');


  // Back Navigation
  await page.goBack();

  await expect(page.locator('body')).toContainText('Forms');


  // Negative Navigation
  await page.goto('https://demoqa.com/invalidpage');

  await expect(page).toHaveURL(/invalidpage/);

  await expect(page.locator('body')).toBeVisible();

});