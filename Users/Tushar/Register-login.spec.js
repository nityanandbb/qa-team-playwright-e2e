import { test, expect } from '@playwright/test';

test('Register + Login + Invalid Login Flow', async ({ page }) => {

  const email = `test12345678@mail.com`;
  const password = 'Test@123';

 
  await page.goto('https://rahulshettyacademy.com/client/#/auth/register');

  await page.getByPlaceholder('First Name').fill('John1996');
  await page.getByPlaceholder('Last Name').fill('Doe');
  await page.getByPlaceholder('email@example.com').fill(email);
  await page.getByPlaceholder('enter your number').fill('9876543211');

  await page.locator('select').selectOption({ label: 'Engineer' });
  await page.locator('input[value="Male"]').check();

  await page.locator('#userPassword').fill(password);
  await page.locator('#confirmPassword').fill(password);

  await page.locator('input[type="checkbox"]').check();

  await page.getByRole('button', { name: 'Register' }).click();

  await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

 
  await expect(page).toHaveURL(/auth\/login/);

  
  await page.getByPlaceholder('email@example.com').fill(email);
  await page.getByPlaceholder('enter your passsword').fill(password);

  await page.getByRole('button', { name: 'Login' }).click();

 
  await expect(page).toHaveURL(/dashboard/);

  
const productTitle = await page.locator('.card-body b').first().textContent();
console.log('Product Title:', productTitle);  
  await page.getByRole('button', { name: 'Sign Out' }).click();

  
  await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

  await page.getByPlaceholder('email@example.com').fill('wrong@test.com');
  await page.getByPlaceholder('enter your passsword').fill('wrong123');

  await page.getByRole('button', { name: 'Login' }).click();

  const errorMsg = page.locator('#toast-container');

  await expect(errorMsg).toBeVisible();
  await expect(errorMsg).toHaveText(/Incorrect email or password/i);

});