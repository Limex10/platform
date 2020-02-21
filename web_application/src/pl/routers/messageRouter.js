const express = require('express')
const messageManager = require('../../bll/messageManager')

const router = express.Router()

router.get("/:id", function(request, response){
    const profile_id = request.params.id
    if(request.session.isLoggedIn && request.session.userId == profile_id){
    const model = {
        csrfToken: request.csrfToken()
    }

    response.render("createMessage.hbs", model)
}
else {
    const model = {
      errorStatus: "401",
      errorMessage: "You are unauthorized to view this page",
      csrfToken: request.csrfToken()

    }
    response.render("error.hbs", model)
  }

})

router.post("/:id", function(request, response){
    

    

    
    const profile_id = request.params.id
    if(request.session.isLoggedIn && request.session.userId == profile_id){
    const message = request.body.message

    messageManager.createMessage(message, profile_id, function(errors){
        if(errors){
            const model = {
                errorMessage: errors,
                csrfToken: request.csrfToken(),
                message
            }
            response.render("createMessage.hbs",model)
        }
        else {
            response.redirect("/profile/manageProfile/"+ profile_id)
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

module.exports = router
