import { expect } from '@playwright/test';

export async function loginAs(page, email, password) {

  await page.goto(`${process.env.EVENTHUB_URL}/login`);

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
