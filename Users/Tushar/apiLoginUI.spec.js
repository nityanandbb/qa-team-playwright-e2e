import { test, expect, request } from '@playwright/test';

test('Login using API and Open Dashboard', async ({ page }) => {

    // Create API Context
    const apiContext = await request.newContext();

    // Login API
    const loginResponse = await apiContext.post(
        'https://api.eventhub.rahulshettyacademy.com/api/auth/login',
        {
            data: {
                email: 'tusharmali195@gmail.com',
                password: 'Tushar@12345'
            }
        }
    );

    // Validate Login
    expect(loginResponse.status()).toBe(200);

    // Convert Response
    const body = await loginResponse.json();

    // Get Token
    const token = body.token;

    console.log("Token:", token);

    // Store Token in Local Storage
    await page.addInitScript(value => {
        window.localStorage.setItem('eventhub_token', value);
    }, token);

    // Open Website
    await page.goto('https://eventhub.rahulshettyacademy.com');

    // Verify Login
    await expect(page.locator('text=Logout')).toBeVisible();

});