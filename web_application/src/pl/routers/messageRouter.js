const express = require('express')
const messageManager = require('../../bll/messageManager')

const router = express.Router()

router.post("/createMessage/:id"), function(request, response){
    
    const profile_id = request.params.id
    const message = request.body.message

    messageManager.createMessage(message, profile_id, function(errors, result){
        if(errors){

        }
        else {
            response.redirect("manageProfile.hbs")
        }
    })
}

module.exports = router
