import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../pages/RegistrationPage.js';

test('Registration using POM', async ({ page }) => {

    const register = new RegistrationPage(page);

    const email = `playwrighttest1234@gmail.com`;
    const password = 'Test@123';

    await register.open();

    await register.register(email, password);

    await expect(page.getByText('Account Created Successfully')).toBeVisible();

});