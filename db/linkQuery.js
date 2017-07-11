const knex = require('./knex')

function adduser(obj){
  return knex('user_info').insert(obj)
}

function allusers(){
  return knex('user_info').select()
}

function updateUser(obj){
  var newdata = obj
  return knex('user_info').where('id', newdata.id)
  .update({
    'username': newdata.username,
    'first_name': newdata.first_name,
    'last_name': newdata.last_name,
    'fav_genre': newdata.fav_genre
  })
}

function deleteUser(userName){
  return knex('user_info').where('username',userName).del()
}


module.exports = {
  adduser,
  allusers,
  updateUser,
  deleteUser
}
