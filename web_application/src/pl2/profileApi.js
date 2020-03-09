const express = require('express')

module.exports = function ({ profileManager }) {

  const router = express.Router()

  router.post("/", function (request, response) {
    const password = request.body.password
    const repeatedPassword = request.body.repeatedPassword
    const email = request.body.email

    console.log({ password, repeatedPassword, email })

    //använder inte id kolla igenom
    profileManager.createProfile(email, password, repeatedPassword, function (error, id) {
        console.log("yeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeet")
        console.log(error)
        console.log("yeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeet")
      /*if (error || typeof error == "string" && error[0].includes('Account already exists.')) {
        response.status(500).json(error[0])

      } */ if (error && 0 < error.length) {
        response.status(400).json(error)

      }
      else {
        response.sendStatus(201)

      }
    })
  })

  return router
}