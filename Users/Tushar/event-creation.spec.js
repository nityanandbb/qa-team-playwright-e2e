import { test, expect } from '@playwright/test';

test('Create Event and Book Ticket', async ({ page }) => {

    const eventTitle = "Test Event " + Date.now();

    // Login
    await page.goto('https://eventhub.rahulshettyacademy.com/login');

    await page.getByPlaceholder('you@email.com').fill('tusharmali195@gmail.com');
    await page.getByLabel('Password').fill('Tushar@12345');
    await page.locator('#login-btn').click();

    await expect(page.getByText('From tech conferences to live concerts')).toBeVisible();

    // Create Event
    await page.goto('https://eventhub.rahulshettyacademy.com/admin/events');

    await page.locator('#event-title-input').fill(eventTitle);

    await page.locator('#admin-event-form textarea').fill('Automation Event');

    await page.getByLabel('Category').selectOption('Concert');

    await page.getByLabel('City').fill('Pune');

    await page.getByLabel('Venue').fill('Viman Nagar');

    await page.getByLabel('Event Date & Time').fill('2026-08-07T20:00');

    await page.getByLabel('Price ($)').fill('500');

    await page.getByLabel('Total Seats').fill('10');

    await page.locator('#add-event-btn').click();

    await expect(page.getByText('Event created!')).toBeVisible();

    // Go to Events Page
    await page.goto('https://eventhub.rahulshettyacademy.com/events');

    await page.getByPlaceholder('Search events, venues').fill(eventTitle);

    const card = page.locator('[data-testid="event-card"]').filter({ hasText: eventTitle });

    await expect(card).toContainText(eventTitle);

    // Seats Before Booking
    const seatsBeforeText = await card.locator('span.text-amber-600').textContent();

    const beforeSeats = parseInt(seatsBeforeText);

    console.log("Event =", eventTitle);
    console.log("Seats Before =", beforeSeats);

    // Open Booking Page
    await card.getByTestId('book-now-btn').click();

    // Booking
    await expect(page.locator('#ticket-count')).toHaveText('1');

    await page.getByLabel('Full Name').fill('Tushar Mali');

    await page.locator('#customer-email').fill('tusharmali195@gmail.com');

    await page.getByPlaceholder('+91 98765 43210').fill('9876543210');

    await page.locator('.confirm-booking-btn').click();

    // Verify Booking Success Message
    await expect(page.getByText('Booking Confirmed!')).toBeVisible();

    // Go to My Bookings
    await page.getByRole('link', { name: 'View My Bookings' }).click();

    await expect(page).toHaveURL(/bookings/);

    // Verify Event Present in My Bookings
    await expect(page.locator('#booking-card').filter({ hasText: eventTitle })).toBeVisible();

    // Verify Seats Reduced
    await page.goto('https://eventhub.rahulshettyacademy.com/events');

    await page.getByPlaceholder('Search events, venues').fill(eventTitle);

    const cardAfter = page.locator('[data-testid="event-card"]').filter({ hasText: eventTitle });

    await expect(cardAfter).toContainText(eventTitle);

    const seatsAfterText = await cardAfter.locator('span.text-amber-600').textContent();

    const afterSeats = parseInt(seatsAfterText);

    console.log("Seats After =", afterSeats);

    // Seat Count Validation
    expect(afterSeats).toBe(beforeSeats - 1);

});