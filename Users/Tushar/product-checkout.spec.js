import { test, expect } from '@playwright/test';

test('Register Login Cart Checkout Flow', async ({ page }) => {

  const email = `tushar11mali@gmail.com`;
  const password = 'Test@123';

  // Registration

  await page.goto('https://rahulshettyacademy.com/client/#/auth/register');

  await page.getByPlaceholder('First Name').fill('Tushar');

  await page.getByPlaceholder('Last Name').fill('Mali');

  await page.getByPlaceholder('email@example.com').fill(email);

  await page.getByPlaceholder('enter your number').fill('9876543210');

  await page.getByRole('combobox').selectOption({ label: 'Engineer' });

  await page.locator('input[value="Male"]').check();

  await page.locator('#userPassword').fill(password);

  await page.getByPlaceholder('Confirm Passsword').fill(password);

  await page.getByRole('checkbox').check();
  
  await expect(page.getByRole('button', { name: 'Register' })).toBeVisible();

  await page.getByRole('button', {name: 'Register'}).click();

  await expect(page.getByText('Account Created Successfully')).toBeVisible();

  // Login
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();

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
  await expect(page.locator('[routerlink="/dashboard/cart"]')).toBeVisible();

  await page.locator('[routerlink="/dashboard/cart"]').click();

  await expect(page).toHaveURL(/cart/);

  await expect( page.locator('h3').first()).toBeVisible();

  // Checkout
  await expect(page.getByRole('button', { name: 'Checkout' })).toBeVisible();

  await page.getByRole('button', {name: 'Checkout'}).click();


  await page.locator('[placeholder="Select Country"]').pressSequentially('ind');

  await page.waitForTimeout(3000);

  await page.locator('.ta-results button').nth(1).click();

  await page.getByText('PLACE ORDER').click();

  await expect(page.locator('.hero-primary')).toContainText('Thankyou');

});
