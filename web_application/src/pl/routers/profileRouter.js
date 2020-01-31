const express = require('express')
const profileManager = require('../../bll/profileManager')
const interestManager = require('../../bll/interestManager')

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
        const model = {
            errors: errors,
            profiles: profiles
            
        }
        
        response.render("home.hbs", model)
    })
})

router.get('viewPerson/:id', function(request,response){

    const profile_id = request.params.id

    profileManager.getProfileById(profile_id, function(errors,profile){

        const model = {
            errors: errors,
            profile: profile
        }
        response.render("viewPerson/",model)
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


     console.log(interest1)
     console.log(interest2)
     console.log(interest3)
     console.log(interest4)
     console.log(profile_id)
     profileManager.updateProfileInfo(city, country, firstname, lastname, interest1, interest2, interest3, interest4, profile_id,function(errors, id){
         if(errors){

         }
         else
         {
            console.log(id)
            response.redirect("/profile/home/"+id)
         }
     })
})



module.exports = router