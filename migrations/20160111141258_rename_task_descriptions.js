
exports.up = function(knex, Promise) {
  return knex.schema.renameTable('task_descriptions', 'skill_descriptions');
};

exports.down = function(knex, Promise) {
  return knex.schema.renameTable('skill_descriptions', 'task_descriptions');
};
