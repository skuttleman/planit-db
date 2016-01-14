
exports.seed = function(knex, Promise) {
  if (false) {
    return Promise.all([
      knex('planits').del(),
      knex('tasks').del()
    ]).then(function() {
      return Promise.all([
        knex('members'),
        knex('planit_types')
      ]);
    }).then(function(data) {
      var members = data[0];
      var planitTypes = data[1];

      var elana = extract(members, 'display_name', /elana/gi);
      var lou = extract(members, 'display_name', /lou/gi);
      var adam = extract(members, 'display_name', /adam/gi);
      var ben = extract(members, 'display_name', /ben/gi);

      var wedding = extract(planitTypes, 'name', /wedding/gi);
      var business = extract(planitTypes, 'name', /business/gi);
      var charity = extract(planitTypes, 'name', /charity/gi);
      var political = extract(planitTypes, 'name', /political/gi);
      var gladiator = extract(planitTypes, 'name', /gladiator/gi);

      return Promise.all([
        Promise.resolve(members),
        Promise.resolve(planitTypes),
        knex('skills'),
        knex('planits').returning('*').insert([
          {
            title: 'Super Expensive Wedding', description: 'the name says it all', member_id: lou.id,
            planit_type_id: wedding.id, start_date: '1/19/2016 15:00', end_date: '1/19/2016 23:00',
            budget: 50000, street_address: '123 Fake St', city: 'Denver', state: 'CO', zipcode: '80213'
          },{
            title: 'Celebrity Death Match', description: 'eat it, bitches', member_id: elana.id,
            planit_type_id: gladiator.id, start_date: '4/9/2016 15:00', end_date: '4/11/2016 10:00',
            budget: 500000, street_address: '456 Fake St', city: 'Denver', state: 'CO', zipcode: '80213'
          },{
            title: 'Charity to those less Fortunate', description: 'so much sadness', member_id: ben.id,
            planit_type_id: charity.id, start_date: '5/1/2016 15:00', end_date: '5/1/2016 15:05',
            budget: 5, street_address: '123 For Real St', city: 'Denver', state: 'CO', zipcode: '80213'
          },{
            title: 'Suits play Flutes', description: 'B.Y.O.Earplugs', member_id: ben.id,
            planit_type_id: business.id, start_date: '4/29/2014 20:00', end_date: '5/1/2014 03:30',
            budget: 123456789, street_address: '9 Bourgeois Ave', city: 'Boulder', state: 'CO', zipcode: '80303'
          },{
            title: 'Christmas Rally for Change', description: '<Other Political Party> is going down!',
            member_id: adam.id, planit_type_id: political.id, start_date: '12/25/2016 15:00',
            end_date: '12/25/2016 17:00', budget: 5, street_address: '1 Church Circle', city: 'Annapolis',
            state: 'MD', zipcode: '21401'
          }
        ])
      ]);
    }).then(function(data) {
      var members = data[0];
      var planitTypes = data[1];
      var skills = data[2];
      var planits = data[3];

      var elana = extract(members, 'display_name', /elana/gi);
      var lou = extract(members, 'display_name', /lou/gi);
      var adam = extract(members, 'display_name', /adam/gi);
      var ben = extract(members, 'display_name', /ben/gi);

      var wedding = extract(planitTypes, 'name', /wedding/gi);
      var business = extract(planitTypes, 'name', /business/gi);
      var charity = extract(planitTypes, 'name', /charity/gi);
      var political = extract(planitTypes, 'name', /political/gi);
      var gladiator = extract(planitTypes, 'name', /gladiator/gi);

      return Promise.all(planits.map(function(planit) {
        return knex('tasks').insert([
          {
            planit_id: planit.id, start_time: planit.start_date, end_time: planit.end_date,
            skill_id: getRandom(skills).id, head_count: getRandom([0,2,3,4,5]),
            budget: getRandom([100, 300, 500, 1000, 10000])
          },
          {
            planit_id: planit.id, start_time: planit.start_date, end_time: planit.end_date,
            skill_id: getRandom(skills).id, head_count: getRandom([0,2,3,4,5]),
            budget: getRandom([100, 300, 500, 1000, 10000])
          },
          {
            planit_id: planit.id, start_time: planit.start_date, end_time: planit.end_date,
            skill_id: getRandom(skills).id, head_count: getRandom([0,2,3,4,5]),
            budget: getRandom([100, 300, 500, 1000, 10000])
          }
        ]);
      }));
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
