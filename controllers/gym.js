const knex = require('../db/knex.js');

module.exports = {

  index: (req, res) => {
    if(!req.session.gym) {
      req.session.gym = [];
    }

    if(!req.session.winner) {
      req.session.winner = "";
    }

    knex("pokemon")
      .orderBy("id", "ASC")
      .then((result) => {
        let pokeFalse = [];
        let pokeTrue = [];

        for(let i = 0; i < result.length; i++) {
          if(result[i].in_gym) {
            pokeTrue.push(result[i]);
          } else {
            pokeFalse.push(result[i]);
          }
        }
        res.render("gym/index", { pokeFalse: pokeFalse, pokeTrue: pokeTrue, gym: req.session.gym, message: req.session.message, winner: req.session.winner})
      })
  },

  add: (req, res) => {
    if(req.body.poke1 === req.body.poke2) {
      req.session.message = "Sorry, but pokemon do not battle themselves unless confused. Please pick 2 different pokemon this time.";;
      req.session.winner = "";
      req.session.save(() => {
        res.redirect("/gym")
      })
    } else if(req.session.gym.length === 0) {
      req.session.message = "";
      knex("pokemon")
        .where("id", req.body.poke1)
        .update("in_gym", "true")
        .then(() => {
          req.session.gym.push(req.body.poke1);
          knex("pokemon")
            .where("id", req.body.poke2)
            .update("in_gym", "true")
            .then(() => {
              req.session.gym.push(req.body.poke2);
              req.session.winner = "";
              req.session.save(() => {
                res.redirect("/gym");
              })
            })
        })
    } else if(req.session.gym.length === 1) {
      req.session.message = "";
      knex("pokemon")
        .where("id", req.body.poke2)
        .update("in_gym", "true")
        .then(() => {
          req.session.gym.push(req.body.poke2);
          req.session.winner = "";
          req.session.save(() => {
            res.redirect("/gym");
          })
        })
    }
  },

  battle: (req, res) => {
    knex.raw(`SELECT pokemon.name FROM pokemon
      WHERE id IN (${req.session.gym[0]}, ${req.session.gym[1]})
      ORDER BY cp DESC
      LIMIT 1`)
      .then((result) => {
        knex("pokemon")
          .where("name", result.rows[0].name)
          .update("cp", knex.raw(`cp + 20`))
          .then(() => {
            req.session.winner = result.rows[0].name;
            req.session.save(() => {
              res.redirect("/gym");
            })
          })
      })
  },

  reset: (req, res) => {
    knex("pokemon")
      .where("in_gym", "true")
      .update("in_gym", "false")
      .then(() => {
        req.session.gym.splice(0, 2);
        req.session.save(() => {
          res.redirect("/gym");
        })
      })
  }
}
