
exports.seed = function(knex, Promise) {
  if (false) {
    return Promise.all([
      knex('roles').del(),
      knex('planit_types').del(),
      knex('skills').del()
    ]).then(function() {
      return Promise.all([
        knex('roles').insert([
          { name: 'normal' },
          { name: 'moderator' },
          { name: 'admin' }
        ]),
        knex('planit_types').insert([
          { name: 'wedding' },
          { name: 'bussiness conference' },
          { name: 'charity banquet' },
          { name: 'political rally' },
          { name: 'gladiator fire arena of death' }
        ]),
        knex('skills').insert([
          { name: 'administration' },
          { name: 'juggler' },
          { name: 'musician' },
          { name: 'caterer' },
          { name: 'florist' },
          { name: 'dj' },
          { name: 'manual labor' }
        ])
      ]);
    });
  }
};
