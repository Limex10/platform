const express = require('express')
const profileManager = require('../../bll/profileManager')
const interestManager = require('../../bll/interestManager')
const messageManager = require('../../bll/messageManager')

const router = express.Router()

router.get('/create', function(request, response){
    
    response.render("createProfile.hbs")
  })

//gets createInfopage for specific profile
router.get('/createInfo/:id', function(request,response){

    const id = request.params.id
    //gets all the interests so the profile can use them
    profileManager.getProfileById(id,function(errors,profile){
        if(errors){
            
        }
        else{
       
            interestManager.getAllInterests(function(errors, interests){
                console.log(interests)
                const model = {
                    errors: errors,
                    interests: interests,
                    id: id
                }
                response.render("createProfileInfo.hbs", model)
            })
        }
    })
   

})
router.get('/home/:id', function(request,response){
    const id = request.params.id
    profileManager.getAllProfiles(function(errors,profiles){
        if(errors){
            
        }
        else{
            profileManager.getProfileById(id, function(errors,profile){
                if(errors){
               }
               else{

                interestManager.filterInterestsById(profile[0].id_interest1,profile[0].id_interest2,profile[0].id_interest3,profile[0].id_interest4, function(errors, filterInterests){
                    if(errors){

                    }
                    else{
                        console.log(profile)
                        const model = {
                            errors: errors,
                            profiles: profiles,
                            profile: profile,
                            filterInterests: filterInterests
                            
                        }
                        response.render("home.hbs", model)
            
                    }
                })
                   
               }
           })
        }
        
    
        
    })
})

router.get('/home/viewPerson/:id', function(request,response){

    const profile_id = request.params.id

    profileManager.getProfileById(profile_id, function(errors,profile){
        if(errors){

        }
        else{
            interestManager.getInterestsById(profile[0].id_interest1,profile[0].id_interest2,profile[0].id_interest3,profile[0].id_interest4, function(errors, interests){
                if(errors){

                }
                else{
                    interestManager.filterInterestsById(profile[0].id_interest1,profile[0].id_interest2,profile[0].id_interest3,profile[0].id_interest4, function(errors, filterInterests){
                        if(errors){

                        }
                        else{
                            const model = {
                                errors: errors,
                                profile: profile,
                                interests: interests,
                                filterInterests: filterInterests
                            }
                            console.log(model)
                            response.render("viewPerson.hbs",model)
                        }
                    })
                }
            }) 
        }

    })

})
router.post("/create", function(request,response){

    const password = request.body.password
    const repeatedPassword = request.body.repeatedPassword
    const email = request.body.email

    profileManager.createProfile(email,password,repeatedPassword,function(errors, id){
        if(errors){
           
            console.log("got error in create")
        }
        else{
            
            response.redirect("/profile/createInfo/"+id)
                
           
        }
        
    })
})

router.post("/createInfo/:id", function(request,response){

     const city = request.body.city
     const country = request.body.country
     const firstname = request.body.firstname
     const lastname = request.body.lastname
     const interest1 = request.body.interest1
     const interest2 = request.body.interest2
     const interest3 = request.body.interest3
     const interest4 = request.body.interest4
     const profile_id = request.params.id

     profileManager.updateProfileInfo(city, country, firstname, lastname, interest1, interest2, interest3, interest4, profile_id,function(errors, id){
         if(errors){

         }
         else
         {
            response.redirect("/profile/home/"+id)
         }
     })
})

router.get("/manageProfile/:id", function(request, response) {
    const profile_id = request.params.id

    profileManager.getProfileById(profile_id, function(errors,profile) {
        if(errors){

        }
        else{
            interestManager.getInterestsById(profile[0].id_interest1,profile[0].id_interest2,profile[0].id_interest3,profile[0].id_interest4, function(errors, interests){
                if(errors) {

                }
                else{
                    interestManager.filterInterestsById(profile[0].id_interest1,profile[0].id_interest2,profile[0].id_interest3,profile[0].id_interest4, function(errors, filterInterests){
                        if(errors) {

                        }
                        else {
                            interestManager.getAllInterests(function(errors, allInterests){
                                if(errors) {

                                }
                                else {
                                    messageManager.getAllMessagesByProfileId(profile_id, function(errors, messages){
                                        if(errors) {

                                        }
                                        else {
                                            const model = {
                                                errors: errors,
                                                profile: profile,
                                                interests: interests,
                                                filterInterests: filterInterests,
                                                allInterests: allInterests,
                                                messages: messages
                                            }
                                            console.log(model)
                                            response.render("manageProfile.hbs",model)

                                        }
                                    })
                                }
                            })
                            
                        }
                    })
                }
            }) 
        }

    })
})

router.post("/createMessage/:id", function(request, response){
    
    const profile_id = request.params.id
    const message = request.body.message

    messageManager.createMessage(message, profile_id, function(errors, result){
        if(errors){

        }
        else {
            response.redirect("/profile/manageProfile/"+profile_id)
        }
    })
})

router.post("/updateInfo/:id", function(request,response){

    const city = request.body.city
    const country = request.body.country
    const firstname = request.body.firstname
    const lastname = request.body.lastname
    const interest1 = request.body.interest1
    const interest2 = request.body.interest2
    const interest3 = request.body.interest3
    const interest4 = request.body.interest4
    const profile_id = request.params.id

    profileManager.updateProfileInfo(city, country, firstname, lastname, interest1, interest2, interest3, interest4, profile_id,function(errors, id){
        if(errors){

        }
        else
        {
           response.redirect("/profile/manageProfile/"+profile_id)
        }
    })
})



module.exports = router