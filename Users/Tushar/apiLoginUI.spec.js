import { test, expect, request } from '@playwright/test';

test('Login using API and access dashboard', async ({ page }) => {

    const apiContext = await request.newContext();

    const loginResponse = await apiContext.post(
        `${process.env.EVENTHUB_API_URL}/auth/login`,
        {
            data: {
                email: process.env.EVENT_EMAIL,
                password: process.env.EVENT_PASSWORD
            }
        }
    );

    expect(loginResponse.status()).toBe(200);

    const body = await loginResponse.json();
    const token = body.token;

    await page.addInitScript(value => {
        window.localStorage.setItem('eventhub_token', value);
    }, token);

    await page.goto(process.env.EVENTHUB_URL);

    await expect(page.getByText('From tech conferences to live concerts')).toBeVisible();

});
