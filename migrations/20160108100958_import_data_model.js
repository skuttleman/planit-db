var sequence = {
  create: 'CREATE SEQUENCE ratings_id_seq;',
  alter: 'ALTER SEQUENCE ratings_id_seq OWNED BY ratings.id'
}


exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.raw(sequence.create),
    knex.schema.createTable('planit_types', function(table) {
      table.increments('id');
      table.string('name');
    }),
    knex.schema.createTable('task_types', function(table) {
      table.increments('id');
      table.string('name');
    }),
    knex.schema.createTable('roles', function(table) {
      table.increments('id');
      table.string('name');
    }),
    knex.schema.createTable('skills', function(table) {
      table.increments('id');
      table.string('name');
    })
  ]).then(function() {
    return Promise.all([
      knex.schema.createTable('members', function(table) {
        table.increments('id');
        table.string('social_id');
        table.boolean('is_banned');
        table.integer('role_id').unsigned().references('id').inTable('roles').onDelete('CASCADE');
      })
    ]);
  }).then(function() {
    return Promise.all([
      knex.schema.createTable('planits', function(table) {
        table.increments('id');
        table.string('title');
        table.text('description');
        table.integer('member_id').unsigned().references('id').inTable('members').onDelete('CASCADE');
        table.integer('planit_type_id').unsigned().references('id').inTable('planit_types').onDelete('CASCADE');
        table.datetime('start_date');
        table.datetime('end_date');
        table.float('budget', 8, 2).unsigned().notNullable();
      }),
      knex.schema.createTable('messages', function(table) {
        table.increments('id');
        table.integer('sender_id').unsigned().references('id').inTable('members').onDelete('CASCADE');
        table.string('title');
        table.text('body');
        table.datetime('sent_date');
        table.datetime('read_date');
      }),
      knex.schema.createTable('member_skils', function(table) {
        table.integer('member_id').unsigned().references('id').inTable('members').onDelete('CASCADE');
        table.integer('skill_id').unsigned().references('id').inTable('skills').onDelete('CASCADE');
        table.primary(['member_id', 'skill_id']);
      })
    ])
  }).then(function() {
    return Promise.all([
      knex.schema.createTable('message_recipients', function(table) {
        table.integer('message_id').unsigned().references('id').inTable('messages').onDelete('CASCADE');
        table.integer('recipient_id').unsigned().references('id').inTable('members').onDelete('CASCADE');
        table.primary(['message_id', 'recipient_id']);
      }),
      knex.schema.createTable('planit_tasks', function(table) {
        table.increments('id');
        table.integer('planit_id').unsigned().references('id').inTable('planits').onDelete('CASCADE');
        table.datetime('start_time');
        table.datetime('end_time');
        table.integer('task_type_id').unsigned().references('id').inTable('task_types').onDelete('CASCADE');
        table.integer('head_count').unsigned();
        table.float('budget', 8, 2).unsigned().notNullable();
      }),
      knex.schema.createTable('ratings', function(table) {
        table.integer('reviewer_id').unsigned().references('id').inTable('members').onDelete('CASCADE');
        table.integer('reviewee_id').unsigned().references('id').inTable('members').onDelete('CASCADE');
        table.integer('planit_id').unsigned().references('id').inTable('planits').onDelete('CASCADE');
        table.integer('id').unsigned().unique();
        table.integer('rating').unsigned();
        table.primary(['reviewer_id', 'reviewee_id', 'planit_id']);
      })
    ]);
  }).then(function() {
    return knex.schema.raw(sequence.alter);
  }).then(function() {
    return Promise.all([
      knex.schema.createTable('proposals', function(table) {
        table.increments('id');
        table.integer('planit_task_id').unsigned().references('id').inTable('planit_tasks').onDelete('CASCADE');
        table.integer('member_id').unsigned().references('id').inTable('members').onDelete('CASCADE');
        table.text('details');
        table.float('cost_estimate', 8, 2).unsigned().notNullable();
        table.boolean('is_accepted');
      }),
      knex.schema.createTable('task_descriptions', function(table) {
        table.integer('id').unsigned().references('id').inTable('planit_tasks').onDelete('CASCADE');
        table.string('description');
        table.primary('id');
      }),
      knex.schema.createTable('rating_comments', function(table) {
        table.integer('id').unsigned().references('id').inTable('ratings').onDelete('CASCADE');
        table.string('comment');
        table.primary('id');
      })
    ]);
  });
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('ratings_comments'),
    knex.schema.dropTableIfExists('task_descriptions'),
    knex.schema.dropTableIfExists('proposals')
  ]).then(function() {
    return Promise.all([
      knex.schema.dropTableIfExists('ratings'),
      knex.schema.dropTableIfExists('planit_tasks'),
      knex.schema.dropTableIfExists('message_recipients')
    ]);
  }).then(function() {
    return Promise.all([
      knex.schema.dropTableIfExists('member_skills'),
      knex.schema.dropTableIfExists('messages'),
      knex.schema.dropTableIfExists('planits')
    ]);
  }).then(function() {
    return Promise.all([
      knex.schema.dropTableIfExists('members')
    ]);
  }).then(function() {
    return Promise.all([
      knex.schema.dropTableIfExists('skills'),
      knex.schema.dropTableIfExists('roles'),
      knex.schema.dropTableIfExists('task_types'),
      knex.schema.dropTableIfExists('planit_types'),
      knex.schema.raw('DROP SEQUENCE ratings_id_seq')
    ]);
  });
};
