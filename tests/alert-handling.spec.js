import { test, expect } from '@playwright/test';
import { AlertHandlingPage } from '../pages/AlertHandlingPage';

test('Alert with user name', async ({ page }) => {

  const alertPage = new AlertHandlingPage(page);
  const userName = 'Tushar';

  await alertPage.open();
  await alertPage.fillName(userName);

  const alertPromise = alertPage.handleAlert();
  await alertPage.clickAlert();

  const alertData = await alertPromise;

  expect(alertData.type).toBe('alert');
  expect(alertData.message).toBe(`Hello ${userName}, share this practice page and share your knowledge`);

});

test('Alert with empty name', async ({ page }) => {

  const alertPage = new AlertHandlingPage(page);

  await alertPage.open();

  const alertPromise = alertPage.handleAlert();
  await alertPage.clickAlert();

  const alertData = await alertPromise;

  expect(alertData.type).toBe('alert');
  expect(alertData.message).toBe('Hello , share this practice page and share your knowledge');

});
