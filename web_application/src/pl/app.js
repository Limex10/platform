const express = require('express');
const expressHandlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const expressSession = require('express-session')

const interestRouter = require('./routers/interestRouter')
const profileRouter = require('./routers/profileRouter')
const messageRouter = require('./routers/messageRouter')
const loginRouter = require('./routers/loginRouter')

const app = express()

app.set("views", "src/pl/views")

app.use(bodyParser.urlencoded({
  extended: false
}))

app.engine("hbs", expressHandlebars({
  defaultLayout: 'main.hbs'
  
}))

app.use(express.static(__dirname + '/public'));

app.use(expressSession({
  secret: "lksjdlaaaaaaaaaaskdfj",
  saveUninitialized: false,
  isLoggedIn: false,
  userId: null,
  resave: false
}))

app.use(function (request, response, next) {

  response.locals.isLoggedIn = request.session.isLoggedIn
  response.locals.userId = request.session.userId

  next()

})



//Redirecting to Routers
app.use('/interest', interestRouter)
app.use('/message', messageRouter)
app.use('/profile', profileRouter)
app.use('/login', loginRouter)



app.get('/', function(request, response, next){
  response.render("startScreen.hbs")


})


/*app.get('/home', function(request, response){
  response.render("home.hbs")
})*/
/*app.get('/viewPerson', function(request, response){
  response.render("viewPerson.hbs")
})*/
// app.get('/yourProfile', function(request, response){
//   response.render("manageProfile.hbs")
// })

app.listen(8080, function(){
  console.log("Web application listening on port 8080.")
})