import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('Login using POM', async ({ page }) => {

    const login = new LoginPage(page);

    const email = `playwrighttest1234@gmail.com`;
    const password = 'Test@123';

    await login.open();

    await login.login(email, password);

    await expect(page).toHaveURL(/dashboard/);

});