
exports.up = function(knex, Promise) {
  return knex.schema.renameTable('task_descriptions', 'skill_description');
};

exports.down = function(knex, Promise) {
  return knex.schema.renameTable('skill_description', 'task_descriptions');
};
