import { test, expect } from '@playwright/test';
import { loginAs } from '../helpers/eventLoginHelper';

const BASE_URL = 'https://eventhub.rahulshettyacademy.com';
const API_URL = 'https://api.eventhub.rahulshettyacademy.com/api';

const YAHOO_USER = {
  email: 'yahoo1@yahoo.com',
  password: 'Tushar@12345'
};

const GMAIL_USER = {
  email: 'tusharmali195@gmail.com',
  password: 'Tushar@12345'
};

test('Yahoo booking cannot be opened by Gmail user', async ({ page, request }) => {

  // Step 1 - Login using API
  const loginRes = await request.post(`${API_URL}/auth/login`, {
    data: {
      email: YAHOO_USER.email,
      password: YAHOO_USER.password,
    },
  });

  console.log("Login Status:", loginRes.status());

  expect(loginRes.ok()).toBeTruthy();

  const loginData = await loginRes.json();
  const token = loginData.token;
  console.log("Token:", token);

  // Step 2 - Get Events
  const eventsRes = await request.get(`${API_URL}/events`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  expect(eventsRes.ok()).toBeTruthy();

  const eventsData = await eventsRes.json();
  const eventId = eventsData.data[0].id;
  console.log("Event ID:", eventId);

  // Step 3 - Create Booking
  const bookingRes = await request.post(`${API_URL}/bookings`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      eventId: eventId,
      customerName: 'Yahoo User',
      customerEmail: YAHOO_USER.email,
      customerPhone: '9999999999',
      quantity: 1,
    },
  });

  expect(bookingRes.ok()).toBeTruthy();

  const bookingData = await bookingRes.json();
  const yahooBookingId = bookingData.data.id;
  console.log("Booking ID:", yahooBookingId);

  // Login as Gmail user
  await loginAs(page, GMAIL_USER.email, GMAIL_USER.password);

  // Open Yahoo Booking
  await page.goto(`${BASE_URL}/bookings/${yahooBookingId}`);

  // Validate Access Denied
  await expect(page.getByText('Access Denied')).toBeVisible();

  await expect(page.getByText('You are not authorized to view this booking')).toBeVisible();

});
