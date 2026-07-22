import { test, expect } from '@playwright/test';

test('Form Submission with File Upload', async ({ page }) => {

    await page.goto('https://demoqa.com/automation-practice-form');

    await page.getByPlaceholder('First Name').fill('Tushar');

    await page.getByPlaceholder('Last Name').fill('Mali');

    await page.getByPlaceholder('name@example.com').fill('tushar@gmail.com');

    await page.getByLabel('Male', { exact: true }).check();

    await page.getByPlaceholder('Mobile Number').fill('9876543210');

    await page.locator('#uploadPicture').setInputFiles('files/test.png');

    await page.locator('#currentAddress').fill('Pune');

    await page.locator('#submit').click();

    await expect(page.locator('#example-modal-sizes-title-lg')).toContainText('Thanks for submitting the form');

});