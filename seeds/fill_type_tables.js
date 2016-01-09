
exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('roles').del(),
    knex('task_types').del(),
    knex('planit_types').del(),
    knex('skills').del()
  ]).then(function() {
    return Promise.all([
      knex('roles').insert([
        { name: 'noraml' },
        { name: 'moderator' },
        { name: 'admin' }
      ]),
      knex('task_types').insert([
        { name: 'administrative' },
        { name: 'juggler' },
        { name: 'musician' },
        { name: 'caterer' },
        { name: 'florist' },
        { name: 'dj' },
        { name: 'manual labor' },
        { name: 'other' }
      ]),
      knex('planit_types').insert([
        { name: 'wedding' },
        { name: 'bussiness conference' },
        { name: 'charity banquet' },
        { name: 'political rally' },
        { name: 'gladiator fire arena of death' }
      ]),
      knex('skills').insert([
        { name: 'juggler' },
        { name: 'musician' },
        { name: 'caterer' },
        { name: 'florist' },
        { name: 'dj' },
        { name: 'manual labor' }
      ])
    ]);
  });
};
