const jwt = require('jsonwebtoken')
const express = require('express')
const bodyParser = require('body-parser')
const loginManager = require('../bll/loginManager')
const messageManager = require('../bll/messageManager')
const csrf = require('csurf');




    const app = express()


        
    app.use(bodyParser.urlencoded({
        extended:false
    }))

    
    app.use(bodyParser.json()) // ??

    app.use(csrf({

        cookie: true
      
      }))
const serverSecret = "yeetyeetyeetskjfahsa"    

app.post("/login",function(request,response){

    const grantType = request.body.grant_type
    const email = request.body.email
    const password = request.body.password

    console.log("yeeeeeeeeeeeeet")
    if(grantType != "password"){
        response.status(400).json({error: "unsupported_grant_type"})
        return
    }

    loginManager.getAccountInfoByEmail(email, password, function (errors, result){
        if(errors){
            response.status(500).end()
        }
        else{
            const payload = {id: result}

            const accessToken = jwt.sign(payload, serverSecret)

            const idToken = jwt.sign(
                {sub: result, email: email },
                "usahf87safasf"
            )

            response.status(200).json({
                access_Token: accessToken,
                id_token: idToken
                
                
            })
        }


    })
   

})
app.post("/logout",function(request,response){


    console.log("yeeeeeeeeeeeeeeeeeeeeeeeet")






})

app.get("/message/:id", function(request,response){

    const profile_id = request.params.id
    /*const authorizationHeader = request.get('authorization')
    const accessToken = authorizationHeader.substr("Bearer".length)

    try{

        const payload = jwt.verify(accessToken,serverSecret)

    }catch(error){
        response.status(401).end()
        return
    }*/


    messageManager.getAllMessagesByProfileId(profile_id,function(errors, message){
        if(errors){
            response.status(500).end()

        }else if(!message){
            response.status(404).end()
        }else{
            
            response.status(200).json(message)

        }

    })

})

module.exports = app



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