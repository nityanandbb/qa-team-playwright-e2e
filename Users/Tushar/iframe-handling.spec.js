import { test, expect } from '@playwright/test';

test('iFrame Handling', async ({ page }) => {

  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

  const frame = page.frameLocator('#courses-iframe');

  await expect(frame.getByRole('link', { name: 'Practice' })).toBeVisible();

  await frame.getByRole('link', { name: 'Practice' }).click();

  await expect(frame.getByRole('heading', {name: 'Join now to Practice'})).toBeVisible();

  await expect(frame.getByPlaceholder('Your Name*')).toBeVisible();

  await expect(frame.getByPlaceholder('Your Email*')).toBeVisible();

});