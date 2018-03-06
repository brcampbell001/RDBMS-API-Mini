
exports.up = function(knex, Promise) {
  return knex.schema.createTable('bears', tbl => {
      tbl.increments();

      tbl.integer('zooId').unsigned().references('id').inTable('zoos');
      tbl.string('species', 80).notNullable().unique('species');
      tbl.string('latinname', 80).notNullable().unique('latinname');
      tbl.timestamp('createdOn').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('bears');
};
