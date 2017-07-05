const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.set('view engine','hbs')

// app.use(express.static(__dirname + '../views'))
app.use(express.static(__dirname + '../public'))


app.get('/',(req,res)=>{
  res.render('index',{msg:'hello www, welcome to MB'})
})

app.listen(port,(req,res)=>{
  console.log('listening on port ' + port);
})
