const index = require('../controllers/index');
const trainers = require('../controllers/trainers');
const pokemon = require('../controllers/pokemon');

// Routes for complete app

module.exports = (app) => {

  app.get("/", index.index);

  app.get("/pokemon", pokemon.index);

  app.post("/pokemon/create", pokemon.create);
  
};
