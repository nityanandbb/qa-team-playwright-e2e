import { test, expect } from '@playwright/test';

test('Register, login, select product, and checkout', async ({ page }) => {

  const email = `test${Date.now()}@mail.com`;
  const password = 'Test@123';

  await page.goto(`${process.env.BASE_URL}/#/auth/register`);

  await page.getByPlaceholder('First Name').fill('John');
  await page.getByPlaceholder('Last Name').fill('Doe');
  await page.getByPlaceholder('email@example.com').fill(email);
  await page.getByPlaceholder('enter your number').fill('9876543210');

  await page.locator('select').selectOption({ label: 'Engineer' });
  await page.locator('input[value="Male"]').check();

  await page.locator('#userPassword').fill(password);
  await page.locator('#confirmPassword').fill(password);

  await page.locator('input[type="checkbox"]').check();

  await page.getByRole('button', { name: 'Register' }).click();

  await expect(page.getByText('Account Created Successfully')).toBeVisible();

  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  await page.getByRole('button', { name: 'Login' }).click();

  await page.getByPlaceholder('email@example.com').fill(email);
  await page.getByPlaceholder('enter your passsword').fill(password);
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/dashboard/);
  await expect(page.locator('.card-body').first()).toBeVisible();

  await page.locator('.card-body').first().getByRole('button', { name: 'Add To Cart' }).click();

  await expect(page.locator('[routerlink="/dashboard/cart"]')).toBeVisible();
  await page.locator('[routerlink="/dashboard/cart"]').click();

  await expect(page).toHaveURL(/cart/);
  await expect(page.locator('h3').first()).toBeVisible();

  await expect(page.getByRole('button', { name: 'Checkout' })).toBeVisible();
  await page.getByRole('button', { name: 'Checkout' }).click();

  await page.locator('[placeholder="Select Country"]').pressSequentially('ind');

  await page.locator('.ta-results button').nth(1).click();

  await page.getByText('PLACE ORDER').click();

  await expect(page.locator('.hero-primary')).toContainText('Thankyou');

});
