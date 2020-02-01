exports.seed = function(knex) {
  return knex('food_entries')
    .del()
    .then(function() {
      return knex('food_entries').insert([
        {
          date: '2020-2-1',
          dairy: '2',
          fruits: '2',
          proteins: '1',
          treats: '4',
          child_id: '1'
        },
        {
          date: '2020-2-1',
          dairy: '1',
          fruits: '6',
          proteins: '9',
          treats: '7',
          child_id: '2'
        },
        {
          date: '2020-2-1',
          dairy: '3',
          fruits: '4',
          proteins: '2',
          treats: '6',
          child_id: '4'
        },
        {
          date: '2020-2-1',
          dairy: '3',
          fruits: '4',
          proteins: '2',
          treats: '1',
          child_id: '1'
        },
        {
          date: '2020-2-1',
          dairy: '3',
          fruits: '5',
          proteins: '2',
          treats: '1',
          child_id: '3'
        }
      ]);
    });
};
