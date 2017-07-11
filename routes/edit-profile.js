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
//mounted on edit-profile

app.get('/',(req,res)=>{
  res.render('edit-profile')
})

app.get('/:username',(req,res)=>{
  // var founduser = req.params.username
  // knex('user_info').select().where('username', founduser).first().then((data) => {
  //   console.log(data);
  //   res.render('profile', {first_name: data.username})
  // })
  res.render('profile')
})

module.exports = app
