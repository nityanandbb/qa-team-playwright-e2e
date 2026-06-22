import { test, expect } from '@playwright/test';

test('Input loads after delay', async ({ page }) => {

  await page.goto(
    'https://the-internet.herokuapp.com/dynamic_controls'
  );

  await page.getByRole('button', {name: 'Enable'}).click();

  const input = page.locator('input[type="text"]');

  await expect(input).toBeEnabled({timeout: 10000});

  await input.fill('Playwright');

  await expect(input).toHaveValue('Playwright');

});