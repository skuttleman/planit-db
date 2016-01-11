
exports.seed = function(knex, Promise) {
  if (false) {
    return Promise.all([
      knex('skills'),
      knex('members').where('display_name', 'like', '%Elana%')
    ]).then(function(data) {
      var elana = data[1][0];
      var skills = data[0];
      return knex('member_skills').insert([
        { member_id: elana.id, skill_id: skills[0].id },
        { member_id: elana.id, skill_id: skills[1].id },
        { member_id: elana.id, skill_id: skills[2].id }
      ]);
    });
  }
};
