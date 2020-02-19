const express = require('express')
const interestManager = require('../../bll/interestManager')

const router = express.Router()

router.get("/createInterest/:id", function(request,response){
    const id = request.params.id
    if(id == request.session.userId){
    response.render("createInterest.hbs")
    }else{
        const model = {
            errorStatus: "401",
            errorMessage: "You are unauthorized to view this page"

        }
        response.render("error.hbs", model)
    }
})

router.post("/createInterest/:id", function(request,response){

    const id = request.params.id

    if(id == request.session.userId && isLoggedIn){
        
        const interest = request.body.interest

        interestManager.createInterest(interest, function(errors){
            if(errors){
                const model = {
                    errorMessage: errors
                }
                response.render("createInterest.hbs", model)
    
            }else{
                response.redirect("/profile/manageProfile/" + request.session.userId)
            }
        })

    }else {
        const model = {
            errorStatus: "401",
            errorMessage: "You are unauthorized to view this page"

        }
        response.render("error.hbs", model)
    }
   

})
module.exports = router
