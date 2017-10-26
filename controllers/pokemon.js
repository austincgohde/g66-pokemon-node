const knex = require("../db/knex.js");

module.exports = {

  index: (req, res) => {
    knex.raw(`SELECT pokemon.id, pokemon.name, pokemon.cp, pokemon.in_gym, trainers.id AS trainersId, trainers.name AS trainerName FROM pokemon JOIN trainers ON trainers.id = pokemon.trainer_id`)
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

  delete: (req, res) => {
    knex("pokemon")
      .where("id", req.params.id)
      .del()
      .then(() => {
        res.redirect("/")
      })
  }
};
