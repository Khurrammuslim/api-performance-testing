import { test, expect } from '@playwright/test';

const BASE_URL =  'https://jsonplaceholder.typicode.com';

test.describe('Posts CRUD - JSONPlaceholder', () => {
    test('GET all posts return 200 and array', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/posts`);
        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(Array.isArray(body)).toBe(true);
        expect(body.length).toBeGreaterThan(0);
    });

    test('GET single post by id returns correct post', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/posts/1`);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.id).toBe(1);
    expect(body).toHaveProperty('title');
    expect(body).toHaveProperty('body');
    });

    test('POST creates a new post', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/posts`, {
      data: {
        title: 'Khurram QA Post',
        body: 'Testing CRUD operations',
        userId: 1,
      },
    });
    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body.title).toBe('Khurram QA Post');
    expect(body).toHaveProperty('id'); // fake API assigns an id, even though it's not persisted
    });

    test('PUT updates an existing post', async ({ request }) => {
    const response = await request.put(`${BASE_URL}/posts/1`, {
      data: {
        id: 1,
        title: 'Updated Title',
        body: 'Updated body content',
        userId: 1,
      },
    });
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.title).toBe('Updated Title');
    });

    test('PATCH partially updates a post', async ({ request }) => {
    const response = await request.patch(`${BASE_URL}/posts/1`, {
      data: { title: 'Only Title Changed' },
    });
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.title).toBe('Only Title Changed');
    });

  test('DELETE removes a post', async ({ request }) => {
    const response = await request.delete(`${BASE_URL}/posts/1`);
    expect(response.status()).toBe(200);
    });

  test('GET non-existent post returns 404', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/posts/99999`);
    expect(response.status()).toBe(404);
    });
});