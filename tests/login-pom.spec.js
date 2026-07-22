import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('Login with valid credentials using POM & @smoke', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.fillEmail(process.env.EMAIL);
    await loginPage.fillPassword(process.env.PASSWORD);
    await loginPage.clickLogin();

    await expect(page).toHaveURL(/dashboard/);

});
