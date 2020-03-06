const jwt = require('jsonwebtoken')
const express = require('express')

const serverSecret = "yeetyeetyeetskjfahsa"  

module.exports = function({loginManager}){

const router = express.Router()

router.post("/",function(request,response){

    const grantType = request.body.grant_type
    const email = request.body.email
    const password = request.body.password

    
    if(grantType != "password"){
        response.status(400).json({error: "unsupported_grant_type"})
        return
    }

    loginManager.getAccountInfoByEmail(email, password, function (errors, profile_id){
        if(errors){
            response.sendStatus(500)
        }
        else{

            const payload = {id: profile_id}
            const accessToken = jwt.sign(payload, serverSecret)
           
            
        
            response.status(200).json({
                access_token: accessToken,
                userId: profile_id   
            })
        }


    })
   

})

    return router

}



