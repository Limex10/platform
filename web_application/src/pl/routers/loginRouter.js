const express = require('express')
const bcrypt = require('bcrypt')

module.exports = function ({ loginManager }) {

  const router = express.Router()

  router.get("/", function (request, response) {

    const model = {

      csrfToken: request.csrfToken()

    }

    response.render("login.hbs", model)

  })

  router.post("/", function (request, response) {

    const email = request.body.email
    const password = request.body.password

    loginManager.getAccountInfoByEmail(email, password, function (errors, accountId) {

      if (errors) {

        const model = {

          errorMessage: errors,
          csrfToken: request.csrfToken(),
          email: email

        }

        response.render("login.hbs", model)

      }
      else {

        request.session.isLoggedIn = true
        request.session.userId = accountId

        response.redirect("/profile/home/" + request.session.userId)

      }
    })
  })

  return router

}
