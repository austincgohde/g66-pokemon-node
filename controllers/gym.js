const knex = require('../db/knex.js');

module.exports = {

  index: (req, res) => {
    if(!req.session.gym) {
      req.session.gym = [];
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
        res.render("gym/index", { pokeFalse: pokeFalse, pokeTrue: pokeTrue, gym: req.session.gym})
      })
  },

  add: (req, res) => {
    if(req.session.gym.length === 0) {
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
              req.session.save(() => {
                res.redirect("/gym");
              })
            })
        })
    } else if(req.session.gym.length === 1) {
      knex("pokemon")
        .where("id", req.body.poke2)
        .update("in_gym", "true")
        .then(() => {
          req.session.gym.push(req.body.poke2);
          req.session.save(() => {
            res.redirect("/gym");
          })
        })
    }
  }
}
