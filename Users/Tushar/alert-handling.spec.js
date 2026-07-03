import { test, expect } from '@playwright/test';

test('Alert Handling', async ({ page }) => {

  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

  const name = 'Tushar';

  await page.getByPlaceholder('Enter Your Name').fill(name);

  await expect(page.getByRole('button', { name: 'Alert' })).toBeVisible();

  await page.getByRole('button', { name: 'Alert' }).click();

  page.on('dialog', async dialog => {

    expect(dialog.type()).toBe('alert');

    expect(dialog.message()).toBe(`Hello ${name}, share this practice page and share your knowledge`);

    await dialog.accept();
  });

});

test('Alert Handling - Empty Name', async ({ page }) => {

  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

  page.on('dialog', async dialog => {

    expect(dialog.type()).toBe('alert');

    expect(dialog.message()).toBe('Hello , share this practice page and share your knowledge');

    await dialog.accept();
  });

  await page.getByRole('button', { name: 'Alert' }).click();

});
