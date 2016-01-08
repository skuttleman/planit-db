
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable(function('planit_types', table) {
      table.increments('id');
      table.string('name');
    }),
    knex.schema.createTable(function('task_types', table) {
      table.increments('id');
      table.string('name');
    }),
    knex.schema.createTable(function('roles', table) {
      table.increments('id');
      table.string('name');
    }),
    knex.schema.createTable(function('skills', table) {
      table.increments('id');
      table.string('name');
    })
  ]).then(function() {
    return Promise.all([
      knex.schema.createTable(function('members', table) {
        table.increments('id');
        table.string('social_id');
        table.boolean('is_banned');
        table.integer('role_id').unsigned().references('id').inTable('roles').onDelete('CASCADE');
      })
    ]);
  }).then(function() {
    return Promise.all([
      knex.schema.createTable(function('planits', table) {
        table.increments('id');
        table.string('title');
        table.text('description');
        table.integer('member_id').unsigned().references('id').inTable('members').onDelete('CASCADE');
        table.integer('planit_type_id').unsigned().references('id').inTable('planit_types').onDelete('CASCADE');
        table.datetime('start_date');
        table.datetime('end_date');
        table.currency('budget');
      }),
      knex.schema.createTable(function('messages', table) {
        table.increments('id');
        table.integer('sender_id').unsigned().references('id').inTable('members').onDelete('CASCADE');
        table.string('title');
        table.text('body');
        table.datetime('sent_date');
        table.datetime('read_date');
      }),
      knex.schema.createTable(function('member_skils', table) {
        table.integer('member_id').unsigned().references('id').inTable('members').onDelete('CASCADE');
        table.integer('skill_id').unsigned().references('id').inTable('skills').onDelete('CASCADE');
        table.primary(['member_id', 'skill_id']);
      })
    ])
  }).then(function() {
    return Promise.all([
      knex.schema.createTable(function('message_recipients', table) {
        table.integer('message_id').unsigned().references('id').inTable('messages').onDelete('CASCADE');
        table.integer('recipient_id').unsigned().references('id').inTable('members').onDelete('CASCADE');
      }),
      knex.schema.createTable(function('planit_tasks', table) {
        table.increments('id');
        table.integer('planit_id').unsigned().references('id').inTable('planit').onDelete('CASCADE');
        table.datetime('start_time');
        table.datetime('end_time');
        table.integer('task_type_id').unsigned().references('id').inTable('task_types').onDelete('CASCADE');
        table.integer('head_count').unsigned();
        table.currency('budget').unsigned().notNullable();
      }),
      knex.schema.createTable(function('ratings', table) {
        table.integer('reviewer_id').unsigned().references('id').inTable('members').onDelete('CASCADE');
        table.integer('reviewee_id').unsigned().references('id').inTable('members').onDelete('CASCADE');
        table.integer('planit_id').unsigned().references('id').inTable('planits').onDelete('CASCADE');
        table.integer('rating').unsigned();
        table.primary(['reviewer_id', 'reviewee_id', 'planit_id']);
      })
    ]);
  }).then(function() {
    knex.schema.createTable(function('proposals', table) {
      table.increments('id');
      table.integer('planit_task_id').unsigned().references('id').inTable('planit_tasks').onDelete('CASCADE');
      table.integer('member_id').unsigned().references('id').inTable('members').onDelete('CASCADE');
      table.text('details');
      table.currency('cost_estimate').unsigned().notNullable();
      table.boolean('is_accepted');
    }),
    knex.schema.createTable(function('task_descriptions', table) {
      table.integer('id').unsigned().references('id').inTable('planit_tasks').onDelete('CASCADE');
      table.string('description');
    }),
    knex.schema.createTable(function('rating_comments', table) {
      table.integer('id').unsigned().references('id').inTable('ratings').onDelete('CASCADE');
      table.string('comment');
    })
  });
};

exports.down = function(knex, Promise) {

};
