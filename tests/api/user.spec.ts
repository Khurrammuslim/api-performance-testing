import { test, expect } from '../../src/fixtures/apiFixtures';

test('GET users list', async ({ apiClient }) => {
  const response = await apiClient.get('/users');
  expect(response.status()).toBe(200);
});

test('POST create user', async ({ apiClient }) => {
  const response = await apiClient.post('/users', { name: 'Khurram', job: 'SDET' });
  expect(response.status()).toBe(201);
});