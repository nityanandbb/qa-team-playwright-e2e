import { test, expect, request } from '@playwright/test';

test('Get Logged-in User', async () => {

    // Create API Context
    const apiContext = await request.newContext();

    // Login API
    const loginResponse = await apiContext.post(
        'https://api.eventhub.rahulshettyacademy.com/api/auth/login',
        {
            data: {
                email: 'dummy1@gmail.com',
                password: 'Dummy@123'
            }
        }
    );

    // Validate Login
    expect(loginResponse.status()).toBe(200);

    // Convert Response
    const loginBody = await loginResponse.json();

    // Get Token
    const token = loginBody.token;

    console.log("Token:", token);

    // Call GET /me API
    const meResponse = await apiContext.get(
        'https://api.eventhub.rahulshettyacademy.com/api/auth/me',
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    // Validate Response
    expect(meResponse.status()).toBe(200);

    const meBody = await meResponse.json();

    console.log(meBody);


});