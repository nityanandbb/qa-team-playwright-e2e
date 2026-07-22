import { test, expect } from '@playwright/test';

test('Empty form validation shows required field errors', async ({ page }) => {

    await page.goto(`${process.env.EVENTHUB_URL}/login`);

    await page.getByPlaceholder('you@email.com').fill(process.env.EVENT_EMAIL);
    await page.getByLabel('Password').fill(process.env.EVENT_PASSWORD);
    await page.locator('#login-btn').click();

    await expect(page.getByText('From tech conferences to live concerts')).toBeVisible();

    await page.goto(`${process.env.EVENTHUB_URL}/admin/events`);

    await page.locator('#add-event-btn').click();

    await expect(page.getByText('Title is required')).toBeVisible();
    await expect(page.getByText('City is required')).toBeVisible();
    await expect(page.getByText('Venue is required')).toBeVisible();
    await expect(page.getByText('Event date is required')).toBeVisible();

});

test('Invalid price validation rejects zero price', async ({ page }) => {

    await page.goto(`${process.env.EVENTHUB_URL}/login`);

    await page.getByPlaceholder('you@email.com').fill(process.env.EVENT_EMAIL);
    await page.getByLabel('Password').fill(process.env.EVENT_PASSWORD);
    await page.locator('#login-btn').click();

    await expect(page.getByText('From tech conferences to live concerts')).toBeVisible();

    await page.goto(`${process.env.EVENTHUB_URL}/admin/events`);

    await page.locator('#add-event-btn').click();

    await page.getByLabel('Price').fill('0');

    // Error message text may vary; assert a Price-related validation is shown
    await expect(page.getByText(/Price.*(greater|positive|more|than|must)/i)).toBeVisible();

});
