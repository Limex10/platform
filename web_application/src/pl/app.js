const express = require('express');
const expressHandlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const expressSession = require('express-session')
const csrf = require('csurf')
const cookieParser = require('cookie-parser')
const redis = require('redis')

const interestRouter = require('./routers/interestRouter')
const profileRouter = require('./routers/profileRouter')
const messageRouter = require('./routers/messageRouter')
const loginRouter = require('./routers/loginRouter')


const app = express()

let RedisStore = require('connect-redis')(expressSession)
let redisClient = redis.createClient({
  host: "session"
})

app.set("views", "src/pl/views")

app.use(bodyParser.urlencoded({
  extended: false
}))

app.engine("hbs", expressHandlebars({
  defaultLayout: 'main.hbs'

}))

app.use(express.static(__dirname + '/public'));

app.use(cookieParser())

app.use(csrf({

  cookie: true

}))


app.use(expressSession({
  store: new RedisStore({ client: redisClient }),
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
app.use('/createMessage', messageRouter)
app.use('/profile', profileRouter)
app.use('/login', loginRouter)



app.get('/', function (request, response, next) {
  if (request.session.isLoggedIn) {
    response.redirect("/profile/home/" + request.session.userId)
  } else {
    response.render("startScreen.hbs")
  }

})

app.post("/logout", function (request, response) {
  request.session.isLoggedIn = false
  request.session.userId = null

  response.redirect("/")
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

app.listen(8080, function () {
  console.log("Web application listening on port 8080.")
})