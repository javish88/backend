const db = require('../db/dbConfig.js');
const Model = require('./model.js');

beforeEach(async () => {
  await db('food_entries').truncate();
  await db('children').truncate();
  await db('parents').truncate();
  await db.seed.run('testing');
});

describe('model', () => {
  test(' "find" should return the contents of the table', async () => {
    const parents = await Model.find('parents');
    expect(parents).toHaveLength(4);
  });


  
});

