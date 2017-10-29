
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('pokemon').del()
    .then(function () {
      // Inserts seed entries
      return knex('pokemon').insert([
        {name: "Bulbasaur", cp: 15, in_gym: false, trainer_id: 1, sprite: "http://www.pokestadium.com/sprites/xy/bulbasaur-3.gif" },
        {name: "Ivysaur", cp: 60, in_gym: false, trainer_id: 1, sprite: "http://www.pokestadium.com/sprites/xy/ivysaur-3.gif"},
        {name: "Venasaur", cp: 100, in_gym: false, trainer_id: 2, sprite: "http://www.pokestadium.com/sprites/xy/venusaur-1.gif"},
        {name: "Charmander", cp: 15, in_gym: false, trainer_id: 2, sprite: "http://www.pokestadium.com/sprites/xy/charmander-3.gif"},
        {name: "Charmeleon", cp: 55, in_gym: false, trainer_id: 2, sprite: "http://www.pokestadium.com/sprites/xy/charmeleon-3.gif"},
        {name: "Charizard", cp: 99, in_gym: false, trainer_id: 3, sprite: "http://www.pokestadium.com/sprites/xy/charizard-3.gif"},
        {name: "Squirtle", cp: 19, in_gym: false, trainer_id: 4, sprite: "http://www.pokestadium.com/sprites/xy/squirtle-3.gif"},
        {name: "Wartortle", cp: 22, in_gym: false, trainer_id: 4, sprite: "http://www.pokestadium.com/sprites/xy/wartortle-3.gif"},
        {name: "Blastoise", cp: 111, in_gym: false, trainer_id: 4, sprite: "http://www.pokestadium.com/sprites/xy/blastoise-3.gif"},
        {name: "Caterpie", cp: 5, in_gym: false, trainer_id: 3, sprite: "http://www.pokestadium.com/sprites/xy/caterpie-2.gif"},
        {name: "Metapod", cp: 18, in_gym: false, trainer_id: 1, sprite: "http://www.pokestadium.com/sprites/xy/metapod-1.gif"},
        {name: "Butterfree", cp: 104, in_gym: false, trainer_id: 1, sprite: "http://www.pokestadium.com/sprites/xy/butterfree-1.gif"}
      ]);
    });
};
