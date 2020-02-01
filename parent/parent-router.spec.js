const server = require('../api/server');
const request = require('supertest');
const db = require('../db/dbConfig.js');

beforeEach(async () => {
  await db('parents').truncate();
  await db.seed.run('testing');
});

describe('parent-router', () => {
  test('adds a child to db, returns id, name, parent id, status of 201', async () => {
    const response = await request(server)
      .post('/api/parents/child')
      .send({ name: 'jon_tester', parent_id: '1' });
    expect('application/json');
    expect({ id: 5, name: 'jon_tester', parent_id: 1 });
    expect(201);
  });

  test('adds food entry to db', async () => {
    const response = await request(server)
      .post('/api/parents/food/42')
      .send({
        date: '2020-01-10',
        dairy: 6,
        fruits: 4,
        grains: 9,
        proteins: 2,
        vegetables: 1,
        treats: 444
      });
    expect('application/json');
    expect({
      id: 5,
      date: '2020-01-10',
      dairy: 6,
      fruits: 4,
      grains: 9,
      proteins: 2,
      vegetables: 1,
      treats: 444,
      child_id: 42
    });
    expect(200);
  });
});
