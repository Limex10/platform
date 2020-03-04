const jwt = require('jsonwebtoken')
const express = require('express')



const serverSecret = "yeetyeetyeetskjfahsa"  

module.exports = function({profileManager,loginManager,messageManager}){


const router = express.Router()  

  



router.post("/createAccount",function(request,response){

    const password = request.body.password
    const repeatedPassword = request.body.repeatedPassword
    const email = request.body.email

    console.log(password)
    console.log(repeatedPassword)
    console.log(email)

    profileManager.createProfile(email, password, repeatedPassword, function (errors, id) {
        if (errors) {
            
            response.sendStatus(500)
  
        }
        else {

            response.sendStatus(200)

       
          
  
        }
  
      })

})


router.post("/login",function(request,response){

    const grantType = request.body.grant_type
    const email = request.body.email
    const password = request.body.password

    console.log("yeeeeeeeeeeeeet")
    if(grantType != "password"){
        response.status(400).json({error: "unsupported_grant_type"})
        return
    }

    loginManager.getAccountInfoByEmail(email, password, function (errors, profile_id){
        if(errors){
            response.status(500).end()
        }
        else{
            const payload = {id: profile_id}

            const accessToken = jwt.sign(payload, serverSecret)
            request.auth = accessToken
            /*
            const idToken = jwt.sign(
                {sub: profile_id, email: email },
                "usahf87safasf"
            )*/

            response.status(200).json({
                access_token: accessToken,
                //id_token: idToken
                
                
            })
        }


    })
   

})

router.post("/message",verifyToken, function(request,response){

    const profile_id = request.tokenInfo.id
    const message = request.body.message

    
    messageManager.createMessage(message, profile_id, function (errors){

        if(errors.includes("You have already created a message. If you want to change message go to update message.")){

            response.status(500).end()

        }else if(0 < errors.length){
           
            response.status(400).json(errors)

        }
        else{
           
            response.setHeader("location", "/message/"+profile_id)
             response.status(201).end() 
        }
    })

})

router.post("/messageUpdate/:id",verifyToken, function(request,response){


    const profile_id = request.params.id
    const message = request.body.message
    console.log({profile_id,message})

    messageManager.updateMessageByProfileId(message, profile_id, function(error){
        
        console.log(error)
        
        if(error.includes('databaseError')){
            response.sendStatus(500)

        }else if(0 <error.length){
            response.sendStatus(404).json(error)

        }else{
            console.log("yeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeet")
            response.sendStatus(200)
            
        }


    }) 
    

})

router.get("/message/:id",verifyToken, function(request,response){

    const profile_id = request.params.id
    console.table(profile_id)


    messageManager.getMessageByProfileId(profile_id,function(errors, message){
        if(errors){
            response.status(500).end()

        }else if(!message){
            response.status(404).end()
        }else{
            
            response.status(200).json(message)

        }

    })

})

    return router

}


function verifyToken(request,response,next){

    const bearerHeader = request.get('Authorization')
    const accessToken = bearerHeader.substr("Bearer".length)

    /*
    if(typeof bearerHeader !== 'undefined'){
        const bearer = accessToken
        const bearerToken = bearer
       

        request.tokenInfo = bearerToken
        
    } else {
        response.sendStatus(403)
    }*/
    
    jwt.verify(accessToken, serverSecret, function(error,token){
        if(error){
            console.log(error)
            response.sendStatus(404).json(error)
        }else{
            request.tokenInfo = token
            
            next()

        }
    })
   
    
    

}



/*
router.post("/", function (request, response) {
    const email = request.body.email
    const password = request.body.password
    loginManager.getAccountInfoByEmail(email, password, function (errors, result) {
        if (errors) {
            const model = {
                errorMessage: errors,
                csrfToken: request.csrfToken(),
                email
            }
            response.render("login.hbs", model)
        }
        else {
            request.session.isLoggedIn = true
            request.session.userId = result
            response.redirect("/profile/home/" + request.session.userId)
        }
    })
})*/
