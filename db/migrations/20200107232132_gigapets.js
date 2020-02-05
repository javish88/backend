exports.up = function(knex) {
  return knex.schema
    .createTable('parents', (tbl) => {
      tbl.increments('id').primary();
      tbl
        .string('username')
        .unique()
        .notNullable();
      tbl.string('password').notNullable();
    })
    .createTable('children', (tbl) => {
      tbl.increments('id').primary();
      tbl.string('name').notNullable();
      tbl
        .integer('parent_id')
        .references('id')
        .inTable('parents')
        .notNullable()
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl
        .integer('parent_2_id')
        .references('id')
        .inTable('parents')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })
    .createTable('food_entries', (tbl) => {
      tbl.increments('id').primary();
      tbl.date('date').defaultTo(new Date());
      tbl.integer('dairy').defaultTo(0);
      tbl.integer('fruits').defaultTo(0);
      tbl.integer('grains').defaultTo(0);
      tbl.integer('proteins').defaultTo(0);
      tbl.integer('vegetables').defaultTo(0);
      tbl.integer('treats').defaultTo(0);
      tbl
        .integer('child_id')
        .notNullable()
        .references('id')
        .inTable('children')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('food_entries')
    .dropTableIfExists('children')
    .dropTableIfExists('parents');
};