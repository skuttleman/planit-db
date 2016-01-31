
exports.up = function(knex, Promise) {
  return knex.schema.table('message_recipients', function(table) {
    table.boolean('deleted');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('message_recipients', function(table) {
    table.dropColumn('deleted');
  });
};
