
exports.seed = function(knex, Promise) {
  if (true) {
    return Promise.all([
      knex('roles'),
      knex('planit_types').del(),
      knex('skills').del()
    ]).then(function(data) {
      return Promise.all([
        knex('members'),
        knex('planit_types').returning('*').insert([
          { name: 'Wedding' },
          { name: 'Bussiness Conference' },
          { name: 'Fundraiser' },
          { name: 'Political Rally' },
          { name: 'Graduation' },
          { name: 'Birthday Party' },
          { name: 'Bar/Bat Mitzvah' },
          { name: 'Meet-up' },
          { name: 'Corporate Retreat' }
        ]),
        knex('skills').returning('*').insert([
          { name: 'Assistant' },
          { name: 'Security' },
          { name: 'Musician' },
          { name: 'Caterer' },
          { name: 'Florist' },
          { name: 'DJ' },
          { name: 'Bartender' },
          { name: 'Host' }
        ])
      ]);
    }).then(function(data) {
      var members = data[0];
      var planitTypes = data[1];
      var skills = data[2];

      return knex('planits').returning('*').insert(createPlanits(members, planitTypes)).then(function(planits) {
        return knex('tasks').returning('*').insert(createTasks(planits, planitTypes, skills));
      }).then(function(tasks) {
        var other = tasks.filter(function(task) {
          return !task.skill_id;
        })[0].id;
        knex('skill_description').insert({
          id: other.id,
          description: 'Balloon Animals Expert'
        });
      });
    });
  }
};

function extract(array, key, match) {
  return array.filter(function(element) {
    return element[key].match(match);
  })[0];
}

function getRandom(array) {
  var index = Math.floor(Math.random() * array.length);
  return array[index];
}

function createPlanits(members, planitTypes) {
  return [
    {
      title: 'Mike and Carols\'s Wedding',
      description: 'Mike and Carol are getting married!',
      planit_type_id: extract(planitTypes, 'name', 'Wedding').id,
      member_id: extract(members, 'display_name', /adam/gi).id,
      start_date: '1-16-16',
      end_date: '1-16-16',
      budget: 50000,
      street_address: 'Ritz Carlton',
      city: 'New York',
      state: 'NY',
      zipcode: '12345'
    },{
      title: 'GloboChem\'s Annual Coporate Retreat',
      description: 'Discuss the future of GloboChem\'s world domination initiative',
      planit_type_id: extract(planitTypes, 'name', 'Corporate Retreat').id,
      member_id: extract(members, 'display_name', /ben/gi).id,
      start_date: '7-8-16',
      end_date: '7-10-16',
      budget: 100000,
      street_address: '2000 High Rollers Plaza',
      city: 'Las Vegas',
      state: 'NV',
      zipcode: '12345'
    },{
      title: 'Johnny\'s Bar Mitzvah',
      description: 'Little Johnny is becoming a man',
      planit_type_id: extract(planitTypes, 'name', 'Bar/Bat Mitzvah').id,
      member_id: extract(members, 'display_name', /elana/gi).id,
      start_date: '10-1-16',
      end_date: '10-1-16',
      budget: 1000,
      street_address: '1623 Bullstail Way',
      city: 'Small Town',
      state: 'VA',
      zipcode: '02813'
    },{
      title: 'Galvanize Students Venting Session',
      description: 'An evening dedicated to complaining about your instructors',
      planit_type_id: extract(planitTypes, 'name', 'Meet-up').id,
      member_id: extract(members, 'display_name', /lou/gi).id,
      start_date: '1-18-16',
      end_date: '10-18-16',
      budget: 500,
      street_address: '1650 Platte St',
      city: 'Denver',
      state: 'CO',
      zipcode: '82301'
    },{
      title: 'Save the Dodo',
      description: 'We need to raise money to restore the dodo bird\'s natural habitat before they go extinct. Bring your wallets!',
      planit_type_id: extract(planitTypes, 'name', 'Fundraiser').id,
      member_id: extract(members, 'display_name', /elana/gi).id,
      start_date: '9-13-16',
      end_date: '9-13-16',
      budget: 500,
      street_address: '19 Mercury Ave',
      city: 'Portland',
      state: 'OR',
      zipcode: '41012'
    }
  ];
}

function createTasks(planits, planitTypes, skills) {
  return [
    {
      planit_id: extract(planits, 'title', /dodo/gi).id,
      start_time: '9-13-16 8:00AM',
      end_time: '9-13-16 8:00PM',
      skill_id: extract(skills, 'name', 'Security').id,
      head_count: 2,
      budget: 300
    },{
      planit_id: extract(planits, 'title', /dodo/gi).id,
      start_time: '9-13-16 7:00AM',
      end_time: '9-13-16 12:00PM',
      skill_id: extract(skills, 'name', 'Florist').id,
      head_count: 5,
      budget: 250
    },{
      planit_id: extract(planits, 'title', /johnny/gi).id,
      start_time: '9-13-16 11:00AM',
      end_time: '9-13-16 10:00PM',
      skill_id: extract(skills, 'name', 'Musician').id,
      head_count: 1,
      budget: 250
    },{
      planit_id: extract(planits, 'title', /johnny/gi).id,
      start_time: '9-13-16 3:00PM',
      end_time: '9-13-16 8:00PM',
      head_count: 2,
      budget: 250
    },{
      planit_id: extract(planits, 'title', /johnny/gi).id,
      start_time: '9-13-16 7:00AM',
      end_time: '9-13-16 12:00PM',
      skill_id: extract(skills, 'name', 'Assistant').id,
      head_count: 1,
      budget: 250
    }
  ];
}
