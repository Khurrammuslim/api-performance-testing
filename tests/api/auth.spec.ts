import { test, expect } from '@playwright/test';

const BASE_URL = 'https://reqres.in/api';
const API_KEY = process.env.REQRES_API_KEY!;

test.describe('Auth Flow', () => {
  test('successful login returns token', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/login`, {
      headers: { 'x-api-key': API_KEY },
      data: {
        email: 'eve.holt@reqres.in', // fixture email, works with reqres demo
        password: 'cityslicka',
      },
    });
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('token');
  });

  test('login with missing password fails', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/login`, {
      headers: { 'x-api-key': API_KEY },
      data: { email: 'eve.holt@reqres.in' },
    });
    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body).toHaveProperty('error');
  });

  test('successful registration returns token and id', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/register`, {
      headers: { 'x-api-key': API_KEY },
      data: {
        email: 'eve.holt@reqres.in',
        password: 'pistol',
      },
    });
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('token');
  });

  test('registration with missing password fails', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/register`, {
      headers: { 'x-api-key': API_KEY },
      data: { email: 'sydney@fife' },
    });
    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body.error).toContain('Missing password');
  });
});