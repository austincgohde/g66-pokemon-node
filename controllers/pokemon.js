const knex = require("../db/knex.js");

module.exports = {

  getAll: (req, res) => {
    knex.raw(`SELECT pokemon.id, pokemon.name, pokemon.cp, pokemon.in_gym, trainers.id AS trainersId, trainers.name AS trainerName FROM pokemon JOIN trainers ON trainers.id = pokemon.trainer_id ORDER BY pokemon.id ASC`)
      .then((result) => {
        let pokemonList = result.rows;

        req.session.gym = [];

        for(let i = 0; i < pokemonList.length; i++) {
          if(pokemonList[i].in_gym && req.session.gym.length < 2) {
            req.session.gym.push(pokemonList[i].id);
          }
        }

        knex("trainers")
          .then((result) => {
            let gym = req.session.gym;
            console.log(gym);
            res.render("pokemon/index", { pokemonList: pokemonList, trainersList: result, gym: gym})
          })
      })
  },

  getOne: (req, res) => {
    knex.raw(`SELECT pokemon.id, pokemon.name, pokemon.cp, pokemon.in_gym, pokemon.sprite, trainers.name AS trainer FROM pokemon JOIN trainers ON trainers.id = pokemon.trainer_id WHERE pokemon.id = ${req.params.id}`)
      .then((result) => {
        res.render("pokemon/info", { pokemon: result.rows[0]});
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
  },

  gymAssign: (req, res) => {
    knex("pokemon")
      .where("id", req.params.id)
      .update("in_gym", "true")
      .then(() => {
        res.redirect("/")
      })
  },

  gymRemove: (req, res) => {
    knex("pokemon")
      .where("id", req.params.id)
      .update("in_gym", "false")
      .then(() => {
        for(let i = 0; i < req.session.gym.length; i++) {
          if(req.session.gym[i] == req.params.id) {
            req.session.gym.splice(i, 1);
          }
        }
        req.session.save(() => {
          res.redirect("/");
        })
      })
  }
};
