const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const bodyParser = require('body-parser')
const path = require('path')
const router = express.Router()

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
  linkQuery.adduser(req.body).then(()=>{
    console.log('update',req.body);
    res.redirect('/sign-in/your-profile')
  })
})

app.get('/your-profile',(req,res)=>{
  res.render('profile',{msg:'This is your Profile Page'})
})

module.exports = app
