const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const bodyParser = require('body-parser')

const linkQuery = require('../db/linkQuery')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.set('view engine','hbs')

// app.use(express.static(__dirname + '../views'))
app.use(express.static(__dirname + '../public'))

//coming off "/sign-in" action
app.post('/sign-up',(req,res)=>{
  linkQuery.adduser(req.body).then(data=>{
    console.log(data);
    res.redirect('/sign-up-newest-user')
  })
})

app.get('/sign-up-newest-user',(req,res)=>{
  linkQuery.allusers().then(()=>{
    res.render('sign-up',{title:'Welcome to Music Box'})
  })

})
