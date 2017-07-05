const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const bodyParser = require('body-parser')
const path = require('path')

var routes = require('./routes/index');

var index = require('./routes/index')
var logIn = require('./routes/log-in')
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


app.set('views', path.join(__dirname, 'views'));
app.set('view engine','hbs')

// app.use(express.static(__dirname + '../views'))
app.use(express.static(__dirname + '../public'))

app.use('/sign-in',index)
app.use('/log-in',logIn)

app.get('/',(req,res)=>{
  res.render('index',{msg:'hello www, welcome to MB'})
})

app.listen(port,(req,res)=>{
  console.log('listening on port ' + port);
})

module.exports = app
