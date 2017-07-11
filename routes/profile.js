const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const bodyParser = require('body-parser')
const path = require('path')
const router = express.Router()
const linkQuery = require('../db/linkQuery')
const knex = require('../db/knex')

const bcrypt = require('bcrypt')
var cookieSession = require('cookie-session')
var key = process.env.COOKIE_KEY || 'asdfasdf'



app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.set('view engine','hbs')

// app.use(express.static(__dirname + '../views'))
app.use(express.static(__dirname + '../public'))

//mounted off "/profile" action

// app.get('/',(req,res)=>{
//   //submit changes trigger...
//   res.render('profile')
// })


app.post('/',(req,res)=>{
  linkQuery.allusers().where({
    username: req.body.username
  }).first().then((user)=>{
    // res.redirect('logged-in')
    if(user){
      bcrypt.compare(
        req.body.password, user.password
      ).then(function(data){
        if(data){
          req.session.id = user.id
          res.redirect('/profile/' + user.username)
        } else{
          res.redirect('/profile/try-again')
        }
      })
    } else{
      res.redirect('/profile/invalid-log-in')
    }
  })
})

app.get('/try-again',(req,res)=>{
  res.render('log-in',{err: 'Incorrect Password!'})
})

app.get('/invalid-log-in',(req,res)=>{
  res.render('log-in',{err:'Username not found!'})
})

app.get('/:username',(req,res)=>{
  var founduser = req.params.username
  knex('user_info').select().where('username', founduser).then((data) => {
    res.render('profile', {newest: data[0]})
  })
})

app.get('/edit-profile/:username',(req,res)=>{
  var name = req.params.username
  knex('user_info').select().where('username',name).then((data)=>{
    res.render('edit-profile',{user:data[0]})
  })
})






app.get('/profil/:username',(req,res)=>{
  // var founduser = req.params.username
  // knex('user_info').select().where('username', founduser).first().then((data) => {
  //   console.log(data);
  //   res.render('profile', {first_name: data.username})
  // })
  res.render('profile')
})

app.post('/edited',(req,res)=>{
  linkQuery.updateUser(req.body).then((data)=>{
    res.redirect('/profile/' + req.body.username)
  })
})




module.exports = app;
