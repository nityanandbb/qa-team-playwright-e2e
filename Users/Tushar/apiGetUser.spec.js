import { test, expect, request } from '@playwright/test';

test('Get logged-in user info via API', async () => {

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

    const loginBody = await loginResponse.json();
    const token = loginBody.token;

    const meResponse = await apiContext.get(
        `${process.env.EVENTHUB_API_URL}/auth/me`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    expect(meResponse.status()).toBe(200);

    const meBody = await meResponse.json();
    const returnedEmail = meBody.email || meBody.user?.email || meBody.data?.email;
    expect(returnedEmail).toBe(process.env.EVENT_EMAIL);

});
