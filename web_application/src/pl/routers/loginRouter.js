const express = require('express')
const bcrypt = require('bcrypt')

const loginManager = require('../../bll/loginManager')

const router = express.Router()

router.get("/", function (request, response) {

    response.render("login.hbs")
})

router.post("/", function (request, response) {
    const email = request.body.email
    const password = request.body.password

    loginManager.getAccountInfoByEmail(email, password, function (errors, result) {
        if (errors) {
            const model = {
                errorMessage: errors
            }
            response.render("login.hbs", model)

        }
        else {

            request.session.isLoggedIn = true
            request.session.userId = result

            response.redirect("/profile/home/" + request.session.userId)

        }

    })

})

module.exports = router