
exports.up = function(knex, Promise) {
  return knex.schema.table('messages', function(table) {
    table.boolean('deleted');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('messages', function(table) {
    table.dropColumn('deleted');
  });
};
