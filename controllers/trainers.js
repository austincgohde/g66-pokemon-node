const knex = require("../db/knex.js");

module.exports = {

  getAll: (req, res) => {
    knex("trainers")
      .then((result) => {
        res.render("trainers/index", {trainers: result})
      })
  },

  getOne: (req, res) => {
    knex.raw(`SELECT trainers.name AS trainer, pokemon.name AS pokemon FROM trainers JOIN pokemon ON pokemon.trainer_id = trainers.id WHERE trainers.id = ${req.params.id}`)
      .then((result) => {
        console.log(result.rows);
        res.render("trainers/info", { trainer: result.rows})
      })
  }

};
