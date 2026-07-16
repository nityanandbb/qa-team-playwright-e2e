import { test, expect } from '@playwright/test';
import { loginAs } from '../helpers/eventLoginHelper';

test('Yahoo user booking is not accessible to Gmail user', async ({ page }) => {

  await loginAs(page, process.env.YAHOO_USER_EMAIL, process.env.YAHOO_USER_PASSWORD);

  await page.goto(`${process.env.EVENTHUB_URL}/events`);

  const availableButton = page.locator('[data-testid="event-card"] [data-testid="book-now-btn"]:not([aria-disabled="true"])').first();
  await expect(availableButton).toBeVisible({ timeout: 10000 });

  await availableButton.click();
  await expect(page.locator('#ticket-count')).toHaveText('1');

  await page.getByLabel('Full Name').fill('Yahoo User');
  await page.locator('#customer-email').fill(process.env.YAHOO_USER_EMAIL);
  await page.getByPlaceholder('+91 98765 43210').fill('9999999999');
  await page.locator('.confirm-booking-btn').click();

  await expect(page.getByText('Booking Confirmed!')).toBeVisible();

  await page.context().clearCookies();
  await page.goto(`${process.env.EVENTHUB_URL}/login`);

  await loginAs(page, process.env.EVENT_EMAIL, process.env.EVENT_PASSWORD);

  await page.goto(`${process.env.EVENTHUB_URL}/bookings`);

  const row = page.locator('#booking-card').filter({ hasText: process.env.YAHOO_USER_EMAIL });
  await expect(row).toHaveCount(0);

});
