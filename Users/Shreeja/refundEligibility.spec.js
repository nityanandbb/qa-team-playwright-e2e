const { test, expect } = require('@playwright/test');

const BASE_URL = 'https://eventhub.rahulshettyacademy.com';

const EMAIL = 'sodavod266@divahd.com';
const PASSWORD = 'Admin@123';
const PHONE = '7428730894';
const FULL_NAME = 'Shree';

async function loginAndGoToBooking(page) {
  await page.goto(`${BASE_URL}/login`);

  await page.getByPlaceholder('you@email.com').fill(EMAIL);
  await page.locator('#password').fill(PASSWORD);

  await page.locator("#login-btn").click();

  await page.waitForLoadState('networkidle');


  await expect(
    page.getByRole('link', { name: /Browse Events /i })
  ).toBeVisible();
}

test.only('Single ticket booking is eligible for refund', async ({ page }) => {

  // Login
  await loginAndGoToBooking(page);

  // Navigate to Events page
  await page.goto(`${BASE_URL}/events`);

  // Book first event
  const firstEvent = page.getByTestId('event-card').last();

  await firstEvent
    .getByTestId('book-now-btn')
    .click();

  // Fill booking form
  await page.getByPlaceholder(/full name/i).fill(FULL_NAME);

  await page.getByPlaceholder(/email/i).fill(EMAIL);

  await page.locator("#phone").fill(PHONE);

  // Default ticket quantity = 1

  await page.locator('.confirm-booking-btn').click();

  // Navigate to bookings
  await page.getByRole('link', { name: /view my bookings/i }).click();

  await expect(page).toHaveURL(/.*\/bookings/);

  // Open first booking
  await page.getByRole('link', { name: /view details/i }).first().click();

  await expect(
    page.getByText('Booking Information')
  ).toBeVisible();

  // Booking reference validation
  const bookingRef = (
    await page.locator("(//h2[normalize-space()='Booking Information'])[1]").textContent()
  ).trim();

  const eventTitle = (
    //await page.getByRole('heading', { name: 'Dilli Diwali Mela' }).textContent()
await page.getByText('EventWorld Tech Summit').textContent()
  ).trim();

  /*expect(
    bookingRef.charAt(0)
  ).toBe(
    eventTitle.charAt(0)
  );*/

  // Refund eligibility
  await page.getByTestId('check-refund-btn').click();

  /* Spinner appears
  await expect(
    page.getByText('Eligible for refund. Single-')
  ).toBeVisible();

   Spinner disappears
  await expect(
    page.getByText('Eligible for refund. Single-')
  ).toBeHidden({
    timeout: 6000
  });*/

  // Validate result
  const refundResult = page.locator('#refund-result');

  await expect(refundResult).toBeVisible();

  await expect(refundResult)
    .toContainText('Eligible for refund');

  await expect(refundResult)
    .toContainText(
      'Single-ticket bookings qualify for a full refund'
    );
});