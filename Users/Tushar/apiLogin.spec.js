import { test, expect, request } from '@playwright/test';

test('Login API validates response', async () => {

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

    expect(body.success).toBe(true);
    expect(body.token).toBeTruthy();
    expect(body.user.email).toBe(process.env.EVENT_EMAIL);

});
