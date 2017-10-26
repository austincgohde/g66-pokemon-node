const knex = require("../db/knex.js");

module.exports = {

  index: (req, res) => {
    knex.raw(`SELECT pokemon.id, pokemon.name, pokemon.cp, pokemon.in_gym, trainers.id AS trainersId, trainers.name AS trainerName FROM pokemon JOIN trainers ON trainers.id = pokemon.trainer_id ORDER BY pokemon.id ASC`)
      .then((result) => {
        let pokemonList = result.rows;

        knex("trainers")
          .then((result) => {
            res.render("pokemon/index", { pokemonList: pokemonList, trainersList: result})
          })
      })
  },

  create: (req, res) => {
    knex("pokemon")
      .insert({
        name: req.body.name,
        trainer_id: req.body.trainer_id,
        cp: req.body.cp,
        in_gym: req.body.in_gym
      }, "*")
      .then(() => {
        res.redirect("/")
      })
  },

  getUpdate: (req, res) => {
    knex("pokemon")
      .where("id", req.params.id)
      .then((result) => {
        let pokemon = result[0]
        knex("trainers")
        .then((result) => {
          let currTrainer = {};
          for(let i = 0; i < result.length; i++) {
            if(pokemon.trainer_id == result[i].id) {
              currTrainer = result.splice(i, 1);
            }
          }
          console.log(result);
          console.log(currTrainer);
          res.render("pokemon/update", { pokemon: pokemon, trainersList: result, currTrainer: currTrainer})
        })
      })
  },

  update: (req, res) => {
    knex("pokemon")
      .where("id", req.params.id)
      .update({
        name: req.body.name,
        trainer_id: req.body.trainer_id,
        cp: req.body.cp,
        in_gym: req.body.in_gym
      }, "*")
      .then(() => {
        res.redirect("/")
      })
  },

  delete: (req, res) => {
    knex("pokemon")
      .where("id", req.params.id)
      .del()
      .then(() => {
        res.redirect("/")
      })
  }
};
