const express = require('express')
//const interestManager = require('../../bll/interestManager')

module.exports = function({interestManager}){

const router = express.Router()

router.get("/createInterest/:id", function(request,response){
    const id = request.params.id
    if(id == request.session.userId){
        const model = {
            csrfToken: request.csrfToken()

        }
    response.render("createInterest.hbs",model)
    }else{
        const model = {
            errorStatus: "401",
            errorMessage: "You are unauthorized to view this page",
            csrfToken: request.csrfToken()
           
        }
        response.render("error.hbs", model)
    }
})

router.post("/createInterest/:id", function(request,response){

    const id = request.params.id
    const interestInput = request.body.interest
    if(id == request.session.userId && request.session.isLoggedIn){
        
        const interest = request.body.interest

        interestManager.createInterest(interest, function(errors){
            if(errors){
                const model = {
                    errorMessage: errors,
                    csrfToken: request.csrfToken(),
                    interestInput
                }
                response.render("createInterest.hbs", model)
    
            }else{
                response.redirect("/profile/manageProfile/" + request.session.userId)
            }
        })

    }else {
        const model = {
            errorStatus: "401",
            errorMessage: "You are unauthorized to view this page",
            csrfToken: request.csrfToken()

        }
        response.render("error.hbs", model)
    }
   

})

return router
//module.exports = router
}