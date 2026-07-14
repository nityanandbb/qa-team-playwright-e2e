import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';

test('Login and Add First Product', async ({ page }) => {


    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.login(
        'playwrighttest1234@gmail.com',
        'Test@123'
    );

    await dashboardPage.addFirstProductToCart();


}); 