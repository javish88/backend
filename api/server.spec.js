const server = require('./server.js');
const request = require('supertest');

describe('server.js', () => {
  test('should be the testing environment', () => {
    expect(process.env.DB_ENV).toBe('testing');
  });

  test('server should be running', async () => {
    const response = await request(server).get('/');
    expect(response.status).toBe(200);
  });
});

describe('auth-router.js', () => {});
