
exports.up = function(knex, Promise) {
  return knex.schema.createTable("pokemon", (table) => {
    table.increments();
    table.string("name");
    table.integer("cp");
    table.boolean("in_gym");
    table.integer("trainer_id")
      .references("id")
      .inTable("trainers")
      .onDelete("CASCADE")
      .index()
    table.timestamps();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("pokemon");
};
