import { expect } from '@playwright/test';

export class SauceLoginPage {

    constructor(page) {
        this.page = page;

        // Locators
        this.usernameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.errorMessage = page.locator('[data-test="error"]');
    }

    // Navigate to SauceDemo
    async goto() {
        await this.page.goto(process.env.SAUCE_BASE_URL);
    }

    // Login with provided credentials
    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    // Verify login page is loaded
    async verifyLoginPageLoaded() {
        await expect(this.usernameInput).toBeVisible();
        await expect(this.passwordInput).toBeVisible();
        await expect(this.loginButton).toBeVisible();
    }

    // Verify login error message
    async verifyLoginError(expectedMessage) {
        await expect(this.errorMessage).toBeVisible();
        await expect(this.errorMessage).toContainText(expectedMessage);
    }
}