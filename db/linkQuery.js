const knex = require('./knex')

function adduser(obj){
  return knex('user_info').insert(obj)
}

function allusers(){
  return knex('user_info').select()
}

module.exports = {
  adduser,
  allusers
}
