import { test, expect } from '@playwright/test';

test('Empty Cart Scenario', async ({ page }) => {

  const email = `test12345678@mail.com`;
  const password = 'Test@123';

  await page.goto('https://rahulshettyacademy.com/client');

  await page.getByPlaceholder('email@example.com').fill(email);
  await page.getByPlaceholder('enter your passsword').fill(password);

  await page.getByRole('button', {name: 'Login'}).click();

  await page.getByRole('button', {
    name: 'Login'
  }).click();

  await expect(page.locator('.card-body').first()).toBeVisible();

  await page.locator('[routerlink="/dashboard/cart"]').click();

  await expect(page).toHaveURL(/cart/);

  await expect(page.getByText('No Products in Your Cart !')).toBeVisible();

});