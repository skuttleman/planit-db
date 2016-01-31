
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('messages', function(table) {
      table.dropColumn('read_date');
    }),
    knex.schema.table('message_recipients', function(table) {
      table.datetime('read_date');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('message_recipients', function(table) {
      table.dropColumn('read_date');
    }),
    knex.schema.table('messages', function(table) {
      table.datetime('read_date');
    })
  ]);
};
