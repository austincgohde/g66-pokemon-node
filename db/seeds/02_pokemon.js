
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('pokemon').del()
    .then(function () {
      // Inserts seed entries
      return knex('pokemon').insert([
        {name: "Bulbasaur", cp: 15, in_gym: false, trainer_id: 1 },
        {name: "Ivysaur", cp: 60, in_gym: false, trainer_id: 1},
        {name: "Venasaur", cp: 100, in_gym: false, trainer_id: 2},
        {name: "Charmander", cp: 15, in_gym: false, trainer_id: 2},
        {name: "Charmeleon", cp: 55, in_gym: false, trainer_id: 2},
        {name: "Charizard", cp: 99, in_gym: false, trainer_id: 3},
        {name: "Squirtle", cp: 19, in_gym: false, trainer_id: 4},
        {name: "Wartortle", cp: 22, in_gym: false, trainer_id: 4},
        {name: "Blastoise", cp: 111, in_gym: false, trainer_id: 4},
        {name: "Caterpie", cp: 5, in_gym: false, trainer_id: 3},
        {name: "Metapod", cp: 18, in_gym: false, trainer_id: 1},
        {name: "Butterfree", cp: 104, in_gym: false, trainer_id: 1}
      ]);
    });
};
