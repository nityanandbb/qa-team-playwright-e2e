import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../pages/RegistrationPage.js';

test('Registration using POM', async ({ page }) => {

    const register = new RegistrationPage(page);

    const email = `playwrighttest${Date.now()}@mail.com`;
    const password = 'Test@123';

    await register.open();
    await register.register(email, password);

    const loginBtn = page.getByRole('button', { name: 'Login' });
    await expect(loginBtn).toBeVisible();
    await loginBtn.click();

    await expect(page).toHaveURL(/auth\/login/);

});