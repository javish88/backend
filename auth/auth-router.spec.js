const server = require('../api/server');
const request = require('supertest');
const db = require('../db/dbConfig.js');

beforeEach(async () => {
  await db('parents').truncate();
  await db.seed.run('testing');
});

describe('auth-router.js', () => {

  test('registers a user', async () => {
    let data = { username: 'caprocto', password: 'pete' };
    const response = await request(server)
      .post('/api/auth/register')
      .send(data);
    expect('application/json');
    expect(201);
  });

  test('logs a user in', async () => {
    let data = { username: 'caprocto', password: 'pete' };
    const response = await request(server)
      .post('/api/auth/login')
      .send(data);
    
    expect('application/json');
    expect(200);
  });
});
