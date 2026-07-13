import { expect } from '@playwright/test';

const BASE_URL = 'https://eventhub.rahulshettyacademy.com';
const EMAIL = 'tusharmali195@gmail.com';
const PASSWORD = 'Tushar@12345';

export async function loginAndGoToEvents(page) {

    await page.goto(`${BASE_URL}/login`);

    await page.getByPlaceholder('you@email.com').fill(EMAIL);

    await page.getByLabel('Password').fill(PASSWORD);

    await page.locator('#login-btn').click();

    await expect(
        page.getByText('From tech conferences to live concerts')
    ).toBeVisible();

    await page.goto(`${BASE_URL}/events`);
}