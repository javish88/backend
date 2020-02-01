exports.seed = function(knex) {
  return knex('parents')
    .del()
    .then(function() {
      return knex('parents').insert([
        { username: 'ron', password: 'CANT LOGIN SO DONT TEST WITH ME' },
        { username: 'lenny', password: 'CANT LOGIN SO DONT TEST WITH ME' },
        { username: 'karen', password: 'CANT LOGIN SO DONT TEST WITH ME' },
        { username: 'rose', password: 'CANT LOGIN SO DONT TEST WITH ME' }
      ]);
    });
};
