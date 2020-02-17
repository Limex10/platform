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
    const validationErrors = []

    loginManager.getPasswordByEmail(email, function (errors, hashedPassword) {
        if (errors) {

        }
        else {
            loginManager.getIdByEmail(email, function(errors, id){
                if(errors){

                }
                else {
                    bcrypt.compare(password, hashedPassword[0].password, function (err, isMatch) {
                        if (isMatch) {
                            console.log(request.session.isLoggedIn)
                            request.session.isLoggedIn = true
                            request.session.userId = id[0].profile_id
                            console.log(request.session.userId)
                           
                            response.redirect("/profile/home/"+ request.session.userId)
                        } else {
                            isMatch = false
                            validationErrors.push("wrong password")
                        }
                    })
                }

            })
     
        
        }
    })

})

module.exports = router