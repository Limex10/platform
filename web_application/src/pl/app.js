const express = require('express');
const expressHandlebars = require('express-handlebars')
const bodyParser = require('body-parser')

const app = express()

app.set("views", "src/pl/views")

app.use(bodyParser.urlencoded({
  extended: false
}))

app.engine("hbs", expressHandlebars({
  defaultLayout: 'main.hbs'
}))

app.use(express.static(__dirname + '/public'));


app.get('/', function(request, response){
  response.render("startScreen.hbs")
})
app.get('/createAccount', function(request, response){
  response.render("createAccount.hbs")
})
app.get('/createProfileInfo', function(request, response){
  response.render("createProfileInfo.hbs")
})
app.get('/home', function(request, response){
  response.render("home.hbs")
})
app.get('/viewPerson', function(request, response){
  response.render("viewPerson.hbs")
})
app.get('/yourProfile', function(request, response){
  response.render("manageProfile.hbs")
})

app.listen(8080, function(){
  console.log("Web application listening on port 8080.")
})