const index = require('../controllers/index');
const trainers = require('../controllers/trainers');
const pokemon = require('../controllers/pokemon');
const gym = require('../controllers/gym');

// Routes for complete app

module.exports = (app) => {

  app.get("/", index.index);

  app.get("/pokemon", pokemon.getAll);

  app.get("/pokemon/:id", pokemon.getOne);

  app.post("/pokemon/create", pokemon.create);

  app.get("/pokemon/delete/:id", pokemon.delete);

  app.get("/pokemon/edit/:id", pokemon.getUpdate);

  app.post("/pokemon/edit/:id", pokemon.update);

  app.get("/pokemon/gym/assign/:id", pokemon.gymAssign);

  app.get("/pokemon/gym/remove/:id", pokemon.gymRemove);

  app.get("/trainers", trainers.getAll);

  app.get("/trainers/:id", trainers.getOne);

  app.get("/gym", gym.index);

  app.post("/gym/pokemon/add", gym.add);

  app.get("/gym/battle", gym.battle);

  app.get("/gym/reset", gym.reset);

};
