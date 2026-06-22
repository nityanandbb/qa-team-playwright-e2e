import { test, expect } from '@playwright/test';

test('Register Login Cart Checkout Flow', async ({ page }) => {

  const email = `tushar8mali@gmail.com`;
  const password = 'Test@123';

  // Registration

  await page.goto('https://rahulshettyacademy.com/client/#/auth/register');

  await page.getByPlaceholder('First Name').fill('Tushar');

  await page.getByPlaceholder('Last Name').fill('Mali');

  await page.getByPlaceholder('email@example.com').fill(email);

  await page.getByPlaceholder('enter your number').fill('9876543210');

  await page.locator('select').selectOption({ label: 'Engineer' });

  await page.locator('input[value="Male"]').check();

  await page.locator('#userPassword').fill(password);

  await page.locator('#confirmPassword').fill(password);

  await page.locator('input[type="checkbox"]').check();

  await page.getByRole('button', {name: 'Register'}).click();

  await expect(page.getByText('Account Created Successfully')).toBeVisible();

  // Login

  await page.getByRole('button', {name: 'Login'}).click();

  await page.getByPlaceholder('email@example.com').fill(email);

  await page.getByPlaceholder('enter your passsword').fill(password);

  await page.getByRole('button', {name: 'Login'}).click();

  // Dashboard Validation

  await expect(page).toHaveURL(/dashboard/);

  await expect(page.locator('.card-body').first()).toBeVisible();

  // Product Selection

  await page.locator('.card-body').first().getByRole('button', { name: 'Add To Cart' }).click();

  // Cart Validation

  await page.locator('[routerlink="/dashboard/cart"]').click();

  await expect(page).toHaveURL(/cart/);

  await expect( page.locator('h3').first()).toBeVisible();

  // Checkout

  await page.getByRole('button', {name: 'Checkout'}).click();


  await page.locator('[placeholder="Select Country"]').pressSequentially('ind');

  await page.waitForTimeout(3000);

  await page.locator('.ta-results button').nth(1).click();

  await page.getByText('PLACE ORDER').click();

  await expect(page.locator('.hero-primary')).toContainText('Thankyou');

});