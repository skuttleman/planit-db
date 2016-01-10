
exports.up = function(knex, Promise) {
  return knex.schema.table('members', function(table) {
    table.string('display_name');
    table.string('profile_image');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('members', function(table) {
    table.dropColumn('display_name');
    table.dropColumn('profile_image');
  });
};
