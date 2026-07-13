import { test, expect } from '@playwright/test';

test('Negative Test Scenarios', async ({ page }) => {

    // Login
    await page.goto('https://eventhub.rahulshettyacademy.com/login');

    await page.getByPlaceholder('you@email.com').fill('tusharmali195@gmail.com');
    await page.getByLabel('Password').fill('Tushar@12345');
    await page.locator('#login-btn').click();

    await expect(page.getByText('From tech conferences to live concerts')).toBeVisible();

    // Empty Form

    await page.goto('https://eventhub.rahulshettyacademy.com/admin/events');

    await page.locator('#add-event-btn').click();

    await expect(page.getByText('Title is required')).toBeVisible();
    await expect(page.getByText('City is required')).toBeVisible();
    await expect(page.getByText('Venue is required')).toBeVisible();
    await expect(page.getByText('Event date is required')).toBeVisible();

    // Invalid Price

    await page.getByLabel('Price').fill('0');

    await expect(page.getByText('Enter a valid price')).toBeVisible();

    // Invalid Seats

    await page.getByLabel('Total Seats').fill('0');

    await expect(page.getByText('Must have at least 1 seat')).toBeVisible();

    // Search Invalid Event

    await page.goto('https://eventhub.rahulshettyacademy.com/events');

    await page.getByPlaceholder('Search events, venues').fill('Invalid Event');

    await expect(page.getByText('No events found')).toBeVisible();

    // Clear Filter

    await page.getByRole('button', { name: 'Clear filters' }).click();

    await expect(page.getByText('Upcoming Events')).toBeVisible();

    // Booking Validation

    await page.goto('https://eventhub.rahulshettyacademy.com/events/3');

    await page.getByRole('button', { name: 'Confirm Booking' }).click();

    await expect(page.getByText('Name must be at least 2 chars')).toBeVisible();
    await expect(page.getByText('Enter a valid email')).toBeVisible();
    await expect(page.getByText('Enter a valid 10-digit phone')).toBeVisible();

    // Invalid Email

    await page.getByLabel('Full Name').fill('Tushar');

    await page.locator('#customer-email').fill('abc');

    await page.getByPlaceholder('+91 98765 43210').fill('9876543210');

    await page.getByRole('button', { name: 'Confirm Booking' }).click();

    await expect(page.getByText('Enter a valid email')).toBeVisible();

    // Invalid Phone Number

    await page.locator('#customer-email').fill('tusharmali195@gmail.com');

    await page.getByPlaceholder('+91 98765 43210').fill('123');

    await page.getByRole('button', { name: 'Confirm Booking' }).click();

    await expect(page.getByText('Enter a valid 10-digit phone')).toBeVisible();

});