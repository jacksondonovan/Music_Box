
exports.up = function(knex, Promise) {
  return knex.schema.createTable('songs',function(table){
    table.increments()
    table.string('song_title')
    table.string('line_one')
    table.string('line_two')
    table.string('line_three')
    table.string('line_four')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('songs')
};
