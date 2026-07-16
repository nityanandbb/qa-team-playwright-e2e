import { test, expect } from '@playwright/test';

const BASE_URL = 'https://eventhub.rahulshettyacademy.com';
const EMAIL = process.env.EVENT_EMAIL || 'tusharmali195@gmail.com';
const PASSWORD = process.env.EVENT_PASSWORD || 'Tushar@12345';

async function loginAndGoToBooking(page) {

  await page.goto(`${BASE_URL}/login`);

  await page.getByPlaceholder('you@email.com').fill(EMAIL);
  await page.getByLabel('Password').fill(PASSWORD);

  await page.locator('#login-btn').click();

  // Verify successful login
  await expect(page.getByText('From tech conferences to live concerts')).toBeVisible({ timeout: 10000 });

}

// Test 1- single Ticket Eligible For Refund

test('Single ticket booking is eligible for refund', async ({ page }) => {

  // Login
  await loginAndGoToBooking(page);

  // Open Events
  await page.goto(`${BASE_URL}/events`);

  // Book first available event with Book Now button (for single ticket)
  const firstAvailable = page.locator('[data-testid="event-card"]').filter({
    has: page.getByTestId('book-now-btn').filter({ hasText: 'Book Now' })
  }).first();
  
  await firstAvailable.getByTestId('book-now-btn').click();
  
  // Default ticket count = 1
  await expect(page.locator('#ticket-count')).toHaveText('1');

  // Fill Booking Details
  await page.getByLabel('Full Name').fill('Tushar Mali');
  await page.locator('#customer-email').fill(EMAIL);
  await page.getByPlaceholder('+91 98765 43210').fill('9876543210');

  await page.locator('.confirm-booking-btn').click();

  // Go To My Bookings
  await page.getByRole('link', { name: 'View My Bookings' }).click();

  await expect(page).toHaveURL(/bookings/);

  // Open First Booking
  await page.getByRole('link', { name: 'View Details' }).first().click();

  // Verify Booking Information
  await expect(page.getByText('Booking Information')).toBeVisible();

  // Booking Ref Validation
  const bookingRef = (await page.locator('span.font-mono').first().textContent()).trim();

  const eventTitle = (await page.locator('h1').textContent()).trim();

  expect(bookingRef.charAt(0)).toBe(eventTitle.charAt(0));

  // Refund Check
  await page.getByTestId('check-refund-btn').click();

  // Spinner Validation
  await expect(page.locator('#refund-spinner')).toBeVisible();

  await expect(page.locator('#refund-spinner')).toBeHidden({ timeout: 6000 });

  // Refund Result
  const refundResult = page.locator('#refund-result');

  await expect(refundResult).toBeVisible();

  await expect(refundResult).toContainText('Eligible for refund');

  await expect(refundResult).toContainText('Single-ticket bookings qualify for a full refund.');

});

// Test 2 - Group Booking Not Eligible

test('Group booking is NOT eligible for refund', async ({ page }) => {

  // Login
  await loginAndGoToBooking(page);

    // Navigate directly to an event detail page with ticket controls
  await page.goto(`${BASE_URL}/events/1`);

  // Wait for booking form and ticket counter
  const ticketCount = page.locator('#ticket-count');
  await expect(ticketCount).toBeVisible({ timeout: 10000 });

  const ticketForm = page.locator('form').filter({ has: ticketCount }).first();
  const plusButton = ticketForm.locator('button:has-text("+")');

  await expect(plusButton).toBeEnabled({ timeout: 15000 });
  await plusButton.click();
  await expect(ticketCount).toHaveText('2');

  await expect(plusButton).toBeEnabled({ timeout: 15000 });
  await plusButton.click();

  await expect(ticketCount).toHaveText('3');

  // Fill Booking Details
  await page.getByLabel('Full Name').fill('Tushar Mali');
  await page.locator('#customer-email').fill(EMAIL);
  await page.getByPlaceholder('+91 98765 43210').fill('9876543210');

  await page.locator('.confirm-booking-btn').click();

  // Go To My Bookings
  await page.getByRole('link', { name: 'View My Bookings' }).click();

  await expect(page).toHaveURL(/bookings/);

  // Open First Booking
  await page.getByRole('link', { name: 'View Details' }).first().click();

  // Verify Booking Information
  await expect(page.getByText('Booking Information')).toBeVisible();

  // Booking Ref Validation
  const bookingRef = (await page.locator('span.font-mono').first().textContent()).trim();

  const eventTitle = (await page.locator('h1').textContent()).trim();

  expect(bookingRef.charAt(0)).toBe(eventTitle.charAt(0));

  // Refund Check
  await page.getByTestId('check-refund-btn').click();

  // Spinner Validation
  await expect(page.locator('#refund-spinner')).toBeVisible();

  await expect(page.locator('#refund-spinner')).toBeHidden({ timeout: 6000 });

  // Refund Result
  const refundResult = page.locator('#refund-result');

  await expect(refundResult).toBeVisible();

  await expect(refundResult).toContainText('Not eligible for refund');
  await expect(refundResult).toContainText('Group bookings (3 tickets) are non-refundable.');

});