const express = require('express');
const expressHandlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const expressSession = require('express-session')
const csrf = require('csurf')
const cookieParser = require('cookie-parser')
const redis = require('redis')
const awilix = require("awilix")

const checker = false

const app = express()



let profileRepository
let messageRepository
let loginRepository
let interestRepository
let db

if (checker) {

  profileRepository = require("../dal/profileRepository")
  messageRepository = require("../dal/messageRepository")
  loginRepository = require("../dal/loginRepository")
  interestRepository = require("../dal/interestRepository")
  db = require("../dal/db")

}
else {

  profileRepository = require("../dal2/profileRepository")
  messageRepository = require("../dal2/messageRepository")
  loginRepository = require("../dal2/loginRepository")
  interestRepository = require("../dal2/interestRepository")
  db = require("../dal2/db2")


}

const validationManager = require("../bll/validationManager")
const profileManager = require("../bll/profileManager")
const messageManager = require("../bll/messageManager")
const loginManager = require("../bll/loginManager")
const interestManager = require("../bll/interestManager")

const interestRouter = require('./routers/interestRouter')
const profileRouter = require('./routers/profileRouter')
const messageRouter = require('./routers/messageRouter')
const loginRouter = require('./routers/loginRouter')

const loginApiRouter = require('../pl2/loginApi') // ??
const profileApiRouter = require('../pl2/profileApi')
const messageApiRouter = require('../pl2/messageApi')

const container = awilix.createContainer()

if (checker) {

  container.register("db", awilix.asFunction(db))

}
else {

  container.register("db", awilix.asValue(db))

}

container.register("profileRepository", awilix.asFunction(profileRepository))
container.register("messageRepository", awilix.asFunction(messageRepository))
container.register("loginRepository", awilix.asFunction(loginRepository))
container.register("interestRepository", awilix.asFunction(interestRepository))

container.register("validationManager", awilix.asFunction(validationManager))
container.register("profileManager", awilix.asFunction(profileManager))
container.register("messageManager", awilix.asFunction(messageManager))
container.register("loginManager", awilix.asFunction(loginManager))
container.register("interestManager", awilix.asFunction(interestManager))

container.register("interestRouter", awilix.asFunction(interestRouter))
container.register("profileRouter", awilix.asFunction(profileRouter))
container.register("messageRouter", awilix.asFunction(messageRouter))
container.register("loginRouter", awilix.asFunction(loginRouter))
container.register("loginApiRouter", awilix.asFunction(loginApiRouter))
container.register("profileApiRouter", awilix.asFunction(profileApiRouter))
container.register("messageApiRouter", awilix.asFunction(messageApiRouter))

const theLoginRouter = container.resolve("loginRouter")
const theMessageRouter = container.resolve("messageRouter")
const theProfileRouter = container.resolve("profileRouter")
const theInterestRouter = container.resolve("interestRouter")

const theLoginApiRouter = container.resolve("loginApiRouter")
const theProfileApiRouter = container.resolve("profileApiRouter")
const theMessageApiRouter = container.resolve("messageApiRouter")

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
app.use(bodyParser.json())

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

const cors = (function (request, response, next) {

  response.setHeader("Access-Control-Allow-Origin", "*")
  response.setHeader("Access-Control-Allow-Methods", "*")
  response.setHeader("Access-Control-Allow-Headers", "*")
  response.setHeader("Access-Control-Expose-Headers", "*")
  next()

})


app.use('/interest', csrf({ cookie: true }), theInterestRouter)
app.use('/message', csrf({ cookie: true }), theMessageRouter)
app.use('/profile', csrf({ cookie: true }), theProfileRouter)
app.use('/login', csrf({ cookie: true }), theLoginRouter)

app.use('/api/login' ,cors, theLoginApiRouter)
app.use('/api/profile',cors, theProfileApiRouter)
app.use('/api/message',cors, theMessageApiRouter)

app.get('/', function (request, response, next) {

  if (request.session.isLoggedIn) {

    response.redirect("/profile/home/" + request.session.userId)

  }
  else {

    response.render("startScreen.hbs")

  }

})

app.post("/logout", function (request, response) {

  request.session.isLoggedIn = false
  request.session.userId = null

  response.redirect("/")

})

app.listen(8080, function () {

  console.log("Web application listening on port 8080.")
  
})