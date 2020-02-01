var pg = require('pg');
var types = require('pg').types;
// override parsing date column to Date()
types.setTypeParser(1082, (val) => val);

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/gigapets',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
    useNullAsDefault: true
  },

  testing: {
    client: 'pg',
    connection: 'postgres://localhost/gigapets_test',
    migrations: {
      directory: './db/migrations/test'
    },
    seeds: {
      directory: './db/seeds/test'
    },
    useNullAsDefault: true
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/production'
    },
    pool: { min: 2, max: 10 },
    useNullAsDefault: true
  }
};
