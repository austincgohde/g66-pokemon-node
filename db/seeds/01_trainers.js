
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('trainers').del()
    .then(function () {
      // Inserts seed entries
      return knex('trainers').insert([
        {name: 'Markel'},
        {name: 'Jacob'},
        {name: 'Ella'},
        {name: 'Valencia'},
      ]);
    });
};
