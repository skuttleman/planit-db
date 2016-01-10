
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('members', function(table) {
      table.text('bio');
    }),
    knex.schema.table('planits', function(table) {
      table.string('street_address');
      table.string('city');
      table.string('state', 2);
      table.string('zipcode', 5);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('members', function(table) {
      table.dropColumn('bio');
    }),
    knex.schema.table('planits', function(table) {
      table.dropColumn('street_address');
      table.dropColumn('city');
      table.dropColumn('state');
      table.dropColumn('zipcode');
    })
  ]);
};
