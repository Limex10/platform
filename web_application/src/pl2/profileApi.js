
const express = require('express')

module.exports = function({profileManager}){


    const router = express.Router()


    router.post("/",function(request,response){

        const password = request.body.password
        const repeatedPassword = request.body.repeatedPassword
        const email = request.body.email
    
        profileManager.createProfile(email, password, repeatedPassword, function (error, id) {
            if (error && error.includes('Account already exists.')) {
                
                response.status(500).json(error)
      
            }else if(error && 0 < error.length){
                response.status(400).json(error)
            }
            else {
    
                response.sendStatus(200)
    
            }
      
          })
    
    })

    return router
}




