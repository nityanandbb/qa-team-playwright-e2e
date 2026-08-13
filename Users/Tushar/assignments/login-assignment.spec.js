import { test, expect } from '@playwright/test';
import { SauceLoginPage } from '../../pages/SauceLoginPage.js';

test('Valid Login @smoke @regression', async ({ page }) => {

    const loginPage = new SauceLoginPage(page);

    await loginPage.goto();

    await loginPage.verifyLoginPageLoaded();

    await loginPage.login(
        process.env.SAUCE_USERNAME,
        process.env.SAUCE_PASSWORD
    );

    // Assertions
    await expect(page).toHaveURL(/inventory.html/);

    await expect(page.getByText('Products')).toBeVisible();

    await expect(page.getByText('Swag Labs')).toBeVisible();

});

test('Invalid Login @regression', async ({ page }) => {

    const loginPage = new SauceLoginPage(page);

    await loginPage.goto();

    await loginPage.login(
        process.env.SAUCE_USERNAME,
        process.env.SAUCE_INVALID_PASSWORD
    );

    await loginPage.verifyLoginError('Username and password do not match');

    // Assertions
    await expect(page).toHaveURL(process.env.SAUCE_BASE_URL);

    await expect(loginPage.loginButton).toBeVisible();

    await expect(loginPage.usernameInput).toHaveValue(process.env.SAUCE_USERNAME);

});