const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const bodyParser = require('body-parser')
const path = require('path')
const router = express.Router()
const bcrypt = require('bcrypt')
const knex = require('../db/knex')
const linkQuery = require('../db/linkQuery')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.set('view engine','hbs')

// app.use(express.static(__dirname + '../views'))
app.use(express.static(__dirname + '../public'))

//mounted off "/sign-in" action

app.get('/',(req,res)=>{
    res.render('sign-up',{title:'Welcome to Music Box'})
})

app.post('/profile',(req,res)=>{
  linkQuery.allusers().where(
    'username', req.body.username
  ).first().then((userexists)=>{
    if(userexists){
      res.redirect('user-exists')
    } else{
      bcrypt.hash(req.body.password,10)
      .then((hash)=>{
        var newuser = req.body
        newuser.password = hash
        console.log(hash);
        linkQuery.adduser(newuser).then(()=>{
          console.log('update',req.body);
          res.redirect('/sign-in/your-profile/' + newuser.username)
        })
      })
    }
  })
})

app.get('/user-exists',(req,res)=>{
  res.render('sign-up',{err: 'Already signed up'})
})

app.get('/your-profile/:username',(req,res)=>{
  var founduser = req.params.username
  knex('user_info').select().where('username', founduser).first().then((data) => {
    console.log(data);
    res.render('profile', {first_name: data.username})
  })
  // res.render('profile',{msg:'This is your Profile Page'})
})

app.get('/welcome',(req,res)=>{
  res.render('profile',{first_name: data.username})
})

module.exports = app
