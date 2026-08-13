import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';

test('Login and add first product to cart', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.open();
    await loginPage.fillEmail(process.env.EMAIL);
    await loginPage.fillPassword(process.env.PASSWORD);
    await loginPage.clickLogin();

    await expect(page).toHaveURL(/dashboard/);

    const productTitle = await dashboardPage.getFirstProductTitle();
    expect(productTitle).toBeTruthy();

    await dashboardPage.addFirstProductToCart();

    await expect(page.locator('[routerlink="/dashboard/cart"]')).toBeVisible();

});
