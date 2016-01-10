
exports.up = function(knex, Promise) {
  return knex.schema.table('tasks', function(table) {
    table.dropColumn('task_type_id');
    table.integer('skill_id').unsigned().references('id').inTable('skills').onDelete('CASCADE');
  }).then(function() {
    return knex.schema.dropTableIfExists('task_types');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.createTable('task_types', function(table) {
    table.increments('id');
    table.string('name');
  }).then(function() {
    return knex.schema.table('tasks', function(table) {
      table.integer('task_type_id').unsigned().references('id').inTable('task_types').onDelete('CASCADE');
      table.dropColumn('skill_id');
    });
  });
};
