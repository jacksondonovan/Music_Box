const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const bodyParser = require('body-parser')
const path = require('path')

var cookieSession = require('cookie-session')
var key = process.env.COOKIE_KEY || 'asdfasdf'
var signIn = require('./routes/sign-up')
var logIn = require('./routes/log-in')
var profile = require('./routes/profile')
var editprofile = require('./routes/edit-profile')
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


app.set('views', path.join(__dirname, 'views'));
app.set('view engine','hbs')

app.use(cookieSession({
  name: 'session',
  keys: [key],
  maxAge: 24 * 60 * 60 * 1000
}))

// app.use(express.static(__dirname + '../views'))
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'client')));
app.use(express.static(path.join(__dirname, 'server')));

app.use('/sign-in',signIn)
app.use('/log-in',logIn)
app.use('/profile',profile)
app.use('/edit-profile',editprofile)

app.get('/',(req,res)=>{
  res.render('index',{msg:'hello www, welcome to MB'})
})

app.listen(port,(req,res)=>{
  console.log('listening on port ' + port);
})

module.exports = app
