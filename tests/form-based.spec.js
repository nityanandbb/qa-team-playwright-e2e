import { test, expect } from '@playwright/test';

test.describe('Form Based Application', () => {

  test('Positive - Submit Form Successfully', async ({ page }) => {

    await page.goto('https://demoqa.com/automation-practice-form');

    await page.locator('#firstName').fill('Tushar');
    await page.locator('#lastName').fill('Mali');

    await page.locator('#userEmail').fill('tushar@test.com');

    await page.locator('label[for="gender-radio-1"]').click();

    await page.locator('#userNumber').fill('9876543210');

    await page.locator('#subjectsInput').fill('Computer Science');

    await page.keyboard.press('Enter');
    
    // Click hobby checkbox - force click to bypass modal if it exists
    await page.locator('label[for="hobbies-checkbox-1"]').click({ force: true, timeout: 5000 });

    await page.locator('#currentAddress').fill('Pune, Maharashtra');

    await page.locator('#state').click();
    await page.getByText('Haryana').click({ force: true });

    await page.locator('#city').click();
    await page.getByText('Panipat').click({ force: true });

    await page.locator('#submit').scrollIntoViewIfNeeded();
    await page.locator('#submit').click({ force: true });

    await expect(page.getByText('Thanks for submitting the form')).toBeVisible();

    await expect(page.locator('.modal-content')).toBeVisible();

    await expect(page.getByText('Student Name')).toBeVisible();

  });

  test('Negative - Required Field Validation', async ({ page }) => {

    await page.goto('https://demoqa.com/automation-practice-form');

    await page.locator('#submit').click();

    await expect(page.locator('#firstName')).toBeVisible();

    await expect(page.locator('#lastName')).toBeVisible();

    await expect(page.locator('#userNumber')).toBeVisible();

  });

  test('Negative - Invalid Email Validation', async ({ page }) => {

    await page.goto('https://demoqa.com/automation-practice-form');

    await page.locator('#firstName').fill('Test');
    await page.locator('#lastName').fill('User');

    await page.locator('#userEmail').fill('invalidemail');

    await page.locator('#userNumber').fill('9876543210');

    await page.locator('label[for="gender-radio-1"]').click();

    await page.locator('#submit').click();

    await expect(page.locator('#userEmail')).toHaveValue('invalidemail');

    await expect(page.locator('#userEmail')).toBeVisible();

    await expect(page.locator('#userEmail')).toBeEditable();

  });

});