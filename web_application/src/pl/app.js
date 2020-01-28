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

app.listen(8080, function(){
  console.log("Web application listening on port 8080.")
})