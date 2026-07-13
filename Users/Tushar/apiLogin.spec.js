import { test, expect, request } from '@playwright/test';

test('Login API', async () => {

    // Create API Context
    const apiContext = await request.newContext();

    // Send Login Request
    const loginResponse = await apiContext.post(
        'https://api.eventhub.rahulshettyacademy.com/api/auth/login',
        {
            data: {
                email: 'tusharmali195@gmail.com',
                password: 'Tushar@12345'
            }
        }
    );

    // Validate Status Code
    expect(loginResponse.status()).toBe(200);

    // Convert Response to JSON
    const body = await loginResponse.json();

    console.log(body);

    // Validate Response
    expect(body.success).toBe(true);
    expect(body.token).toBeTruthy();
    expect(body.user.email).toBe('tusharmali195@gmail.com');

});