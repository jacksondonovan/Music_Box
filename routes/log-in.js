const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const bodyParser = require('body-parser')
const path = require('path')
const router = express.Router()
const linkQuery = require('../db/linkQuery')

const bcrypt = require('bcrypt')
var cookieSession = require('cookie-session')
var key = process.env.COOKIE_KEY || 'asdfasdf'



app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.set('view engine','hbs')

// app.use(express.static(__dirname + '../views'))
app.use(express.static(__dirname + '../public'))

//mounted off "/log-in" action

app.get('/',(req,res)=>{
  res.render('log-in',{msg:'Welcome Back, please, log in'})
})

app.post('/profile',(req,res)=>{
  linkQuery.allusers().where({
    username: req.body.username
  }).first().then((user)=>{
    console.log(user);
    // res.redirect('logged-in')
    if(user){
      bcrypt.compare(
        req.body.password, user.password
      ).then(function(data){
        console.log(data);
        if(data){
          req.session.id = user.id
          res.redirect('logged-in')
        } else{
          res.redirect('no-no')
        }
      })
    } else{
      res.redirect('invalid-log-in')
    }
  })
})
app.get('/no-no',(req,res)=>{
  res.render('log-in',{err: 'Incorrect Password!'})
})

app.get('/invalid-log-in',(req,res)=>{
  res.render('log-in',{err:'Username not found!'})
})

app.get('/logged-in',(req,res)=>{
  res.render('profile')
})


module.exports = app
