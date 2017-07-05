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
// app.post('/',(req,res)=>{
//   res.redirect('/sign-up-newest-user')
// })

app.get('/',(req,res)=>{
    res.render('sign-up',{title:'Welcome to Music Box'})
})

module.exports = app
