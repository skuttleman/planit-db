
exports.up = function(knex, Promise) {
  return knex.schema.renameTable('member_skils', 'member_skills');
};

exports.down = function(knex, Promise) {
  return knex.schema.renameTable('member_skills', 'member_skils');
};
