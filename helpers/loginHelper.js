import { expect } from '@playwright/test';

export async function loginAndGoToEvents(page) {

    await page.goto(`${process.env.EVENTHUB_URL}/login`);

    await page.getByPlaceholder('you@email.com').fill(process.env.EVENT_EMAIL);

    await page.getByLabel('Password').fill(process.env.EVENT_PASSWORD);

    await page.locator('#login-btn').click();

    await expect(
        page.getByText('From tech conferences to live concerts')
    ).toBeVisible();

    await page.goto(`${process.env.EVENTHUB_URL}/events`);

}
