import { expect } from '@playwright/test';

const BASE_URL = 'https://eventhub.rahulshettyacademy.com';

export async function loginAs(page, email, password) {

  await page.goto(`${BASE_URL}/login`);

  await page.getByPlaceholder('you@email.com')
    .fill(email);

  await page.getByLabel('Password')
    .fill(password);

  await page.locator('#login-btn')
    .click();

  await expect(
    page.getByText('From tech conferences to live concerts')
  ).toBeVisible();

}