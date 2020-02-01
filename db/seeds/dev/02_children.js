exports.seed = function(knex) {
  return knex('children')
    .del()
    .then(function() {
      return knex('children').insert([
        { name: 'Billy', parent_id: '2' },
        { name: 'Nancy', parent_id: '1' },
        { name: 'Pete', parent_id: '4' },
        { name: 'Jess', parent_id: '3' }
      ]);
    });
};
