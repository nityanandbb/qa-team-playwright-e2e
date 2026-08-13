import { test, expect } from '@playwright/test';
import { SauceLoginPage } from '../../pages/SauceLoginPage.js';
import { SauceInventoryPage } from '../../pages/SauceInventoryPage.js';

test('Inventory page should display expected content @smoke @regression', async ({ page }) => {

    const loginPage = new SauceLoginPage(page);
    const inventoryPage = new SauceInventoryPage(page);

    await loginPage.goto();

    await loginPage.login(
        process.env.SAUCE_USERNAME,
        process.env.SAUCE_PASSWORD
    );

    await inventoryPage.verifyInventoryPage();

    // Additional business assertions
    await expect(page).toHaveURL(/inventory.html/);

    await expect(page.locator('.inventory_item')).toHaveCount(6);

    await expect(
        page.getByText('Sauce Labs Backpack')
    ).toBeVisible();

});