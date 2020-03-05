const jwt = require('jsonwebtoken')
const express = require('express')

const serverSecret = "yeetyeetyeetskjfahsa" 

module.exports = function({messageManager}){

    const router = express.Router()

    router.get("/:id",verifyToken, function(request,response){

        const profile_id = request.params.id
        
        messageManager.getMessageByProfileId(profile_id,function(errors, message){
            if(errors){
                response.sendStatus(500)
    
            }else if(!message){
                response.sendStatus(404)
            }else{
                
                response.status(200).json(message)
    
            }
    
        })
    
    })

    router.post("/",verifyToken, function(request,response){

        const profile_id = request.tokenInfo.id
        const message = request.body.message
    
        console.log({profile_id})
        messageManager.createMessage(message, profile_id, function (error){
    
            if(error && error.includes("You have already created a message. If you want to change message go to update message.")){
    
                response.sendStatus(500)
    
            }else if(error && 0 < errors.length){
               
                response.status(400).json(errors)
    
            }
            else{
               
                response.setHeader("location", "/message/"+profile_id)
                response.sendStatus(201) 
            }
        })
    
    })

    router.put("/:id",verifyToken, function(request,response){


        const profile_id = request.params.id
        const message = request.body.message
        
        messageManager.updateMessageByProfileId(message, profile_id, function(error){
                
            if(error && error.includes('databaseError')){
                response.sendStatus(500)
    
            } else if(error && 0 <error.length){
                response.status(404).json(error) //Ska vi skicka med validationfelen=?
    
            } else{

                response.sendStatus(201)
                
            }
    
        }) 
        
    
    })

    router.delete("/:id",verifyToken,function(request,response){

        const profile_id = request.params.id
    
        messageManager.deleteMessageByProfileId(profile_id, function (error){
            
    
            if(error && error.includes('Could not delete message!')){
                response.status(500).json(error)
            }else{
                response.sendStatus(200)
            }
    
        })
    
    })

    return router

}

function verifyToken(request,response,next){

    const bearerHeader = request.get('Authorization')
    const accessToken = bearerHeader.substr("Bearer".length)

   
    jwt.verify(accessToken, serverSecret, function(error,token){
        if(error){
            response.sendStatus(404).json(error)
        }else{
            request.tokenInfo = token   
            next()

        }
    })
   
}