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

    const thing = request.tokenInfo

    console.log(thing)
    
    const message = request.body.message


    console.log(message)
    console.log(profile_id)

    messageManager.createMessage(message, profile_id, function (errors){

        if(errors.includes("You have already created a message. If you want to change message go to update message.")){

            response.status(500).end()

        }else if(0 < errors.length){
            console.log("got error back")
            response.status(400).json(errors)

        }
        else{
            console.log("didn't work ")
            response.setHeader("location", "/manageProfile")
             response.status(201).end() 
        }
    })

})

router.get("/message/:id", function(request,response){

    const profile_id = request.params.id

    const authorizationHeader = request.get('authorization')
    const accessToken = authorizationHeader.substr("Bearer".length)
    try{
        const payload = jwt.verify(accessToken,serverSecret)
    }catch(error){
        response.status(401).end()
        return
    }


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

    const authorizationHeader = request.get('Authorization')
    const accessToken = authorizationHeader.substr("Bearer".length)
    
    console.log(accessToken)
    console.log(serverSecret)
    
    jwt.verify(accessToken, serverSecret).then(tokenId =>{

        console.log(tokenId)
        request.tokenInfo = tokenId
        next()
    }).catch(error =>{

        response.status(401).end()

    
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
