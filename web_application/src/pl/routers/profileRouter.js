const express = require('express')
const profileManager = require('../../bll/profileManager')

const router = express.Router()

router.get('/', function(request, response){
    response.render("createProfile.hbs")
  })

router.post("/", function(request,response){

    const password = request.body.password
    const repeatedPassword = request.body.repeatedPassword
    const email = request.body.email

    console.log(password)
    console.log(repeatedPassword)
    console.log(email)

    profileManager.createProfile(email,password,repeatedPassword,function(errors){
        if(errors){

        }
        else{
            response.redirect("/")
        }
    })
})

module.exports = router