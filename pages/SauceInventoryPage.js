import { expect } from '@playwright/test';

export class SauceInventoryPage {
    constructor(page) {
        this.page = page;

        this.productsTitle = page.getByText('Products');
        this.logo = page.getByText('Swag Labs');
        this.inventoryItems = page.locator('.inventory_item');
        this.cart = page.locator('.shopping_cart_link');
        this.menuButton = page.getByRole('button', { name: /Open Menu/i });
        this.backpack = page.getByText('Sauce Labs Backpack');
        this.bikeLight = page.getByText('Sauce Labs Bike Light');
    }

    async verifyInventoryPage() {
        await expect(this.productsTitle).toBeVisible();
        await expect(this.logo).toBeVisible();
        await expect(this.inventoryItems).toHaveCount(6);
        await expect(this.cart).toBeVisible();
        await expect(this.menuButton).toBeVisible();
        await expect(this.backpack).toBeVisible();
        await expect(this.bikeLight).toBeVisible();
    }
}