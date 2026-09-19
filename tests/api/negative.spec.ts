import { test, expect } from '@playwright/test';

const JSONPLACEHOLDER = 'https://jsonplaceholder.typicode.com';
const REQRES = 'https://reqres.in/api';

test.describe('404 - Not Found', () => {
  test('GET non-existent post returns 404', async ({ request }) => {
    const response = await request.get(`${JSONPLACEHOLDER}/posts/99999`);
    expect(response.status()).toBe(404);
  });

  test('GET non-existent user returns 404', async ({ request }) => {
    const response = await request.get(`${REQRES}/users/999`);
    expect(response.status()).toBe(404);
  });
});

test.describe('400 - Bad Request', () => {
  test('login without email fails with 400', async ({ request }) => {
    const response = await request.post(`${REQRES}/login`, {
      data: { password: 'cityslicka' }, // email missing
    });
    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body.error).toContain('email');
  });

  test('register without password fails with 400', async ({ request }) => {
    const response = await request.post(`${REQRES}/register`, {
      data: { email: 'sydney@fife' },
    });
    expect(response.status()).toBe(400);
  });
});

test.describe('Demo endpoints are public (no API key required)', () => {
  test('POST create user works without API key', async ({ request }) => {
    const response = await request.post(`${REQRES}/users`, {
      data: { name: 'Test', job: 'QA' },
    });
    expect(response.status()).toBe(201);
  });

  test('GET users list works without API key', async ({ request }) => {
    const response = await request.get(`${REQRES}/users`);
    expect(response.status()).toBe(200);
  });

  test('GET single user works without API key', async ({ request }) => {
    const response = await request.get(`${REQRES}/users/2`);
    expect(response.status()).toBe(200);
  });
});

test.describe('Malformed requests', () => {
  test('login with invalid email format still processes (documents actual behavior)', async ({ request }) => {
    const response = await request.post(`${REQRES}/login`, {
      data: { email: 'not-an-email', password: 'cityslicka' },
    });
    // Reqres doesn't validate email format, only checks against fixture data
    expect(response.status()).toBe(400);
  });
});