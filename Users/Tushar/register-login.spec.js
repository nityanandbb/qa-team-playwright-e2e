import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../pages/RegistrationPage';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';

test('Register new user', async ({ page }) => {

  const registrationPage = new RegistrationPage(page);

  const uniqueEmail = `user${Date.now()}@gmail.com`;

  await registrationPage.open();

  await registrationPage.fillFirstName('John');
  await registrationPage.fillLastName('Doe');
  await registrationPage.fillEmail(uniqueEmail);
  await registrationPage.fillMobile('9876543210');
  await registrationPage.selectOccupation('Engineer');
  await registrationPage.selectGender();
  await registrationPage.fillPassword(process.env.PASSWORD);
  await registrationPage.fillConfirmPassword(process.env.PASSWORD);
  await registrationPage.acceptTerms();

  await registrationPage.clickRegister();
  await registrationPage.clickSuccessLogin();

  await expect(page).toHaveURL(/auth\/login/);

});

test('Login with valid credentials', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  await loginPage.open();
  await loginPage.fillEmail(process.env.EMAIL);
  await loginPage.fillPassword(process.env.PASSWORD);
  await loginPage.clickLogin();

  await expect(page).toHaveURL(/dashboard/);

  const productTitle = await dashboardPage.getFirstProductTitle();
  expect(productTitle).toBeTruthy();

  await dashboardPage.clickSignOut();

  await expect(page).toHaveURL(/auth\/login/);

});

test('Login with invalid credentials', async ({ page }) => {

  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.fillEmail('invalid@email.com');
  await loginPage.fillPassword('InvalidPassword123');
  await loginPage.clickLogin();

  const errorMessage = loginPage.getErrorMessage();
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toHaveText(/Incorrect email or password/i);

});