const express = require('express')
const interestManager = require('../../bll/interestManager')

const router = express.Router()
//glöm inte ändra routern så att detta inte är createprofile
router.get("/", function(request, response){
	interestManager.getAllInterests(function(errors, interests){
		console.log(errors, interests)
		const model = {
			errors: errors,
			interests: interests
		}
		response.render("createProfileInfo.hbs", model)
	})
})

router.post("/", function(request,response){

    const interest = request.body.createInterest
    console.log(interest)

    interestManager.createInterest(interest, function(errors){
        if(errors){


        }else{
            response.redirect("/")
        }
    })

})
module.exports = router
