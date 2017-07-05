
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_info',function(table){
    table.increments()
    table.string('username').notNullable()
    table.string('password').notNullable()
    table.string('first_name').notNullable()
    table.string('last_name').notNullable()
    table.string('fav_genre')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user_info')
};
