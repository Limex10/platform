const express = require('express')

const profileManager = require('../../bll/profileManager')
const interestManager = require('../../bll/interestManager')
const messageManager = require('../../bll/messageManager')

const router = express.Router()

router.get('/create', function (request, response) {

    response.render("createProfile.hbs")
})

//gets createInfopage for specific profile
router.get('/createInfo/:id', function (request, response) {

    const id = request.params.id
    if (id == request.session.userId) {


        interestManager.getAllInterests(function (errors, interests) {
            if (errors) {

            }
            else {

                const model = {
                    interests: interests,
                    id: id
                }
                response.render("createProfileInfo.hbs", model)

            }

        })



    }
    else {
        const model = {
            errorStatus: "401",
            errorMessage: "You are unauthorized to view this page"

        }
        response.render("error.hbs", model)
    }
    //gets all the interests so the profile can use them



})

router.get('/home/:id', function (request, response) {
    const id = request.params.id
    console.log(request.session.userId)
    if (id == request.session.userId) {
        profileManager.getAllProfiles(function (errors, profiles) {
            if (errors) {

            }
            else {
                profileManager.getProfileById(id, function (errors, profile) {
                    if (errors) {
                    }
                    else {

                        interestManager.filterInterestsById(profile[0].id_interest1, profile[0].id_interest2, profile[0].id_interest3, profile[0].id_interest4, function (errors, filterInterests) {
                            if (errors) {

                            }
                            else {
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

    } else {
        const model = {
            errorStatus: "401",
            errorMessage: "You are unauthorized to view this page"

        }
        response.render("error.hbs", model)
    }

})

router.get('/home/viewPerson/:id', function (request, response) {

    const profile_id = request.params.id
    if (profile_id == request.session.userId) {
        profileManager.getProfileById(profile_id, function (errors, profile) {
            if (errors) {

            }
            else {
                interestManager.getInterestsById(profile[0].id_interest1, profile[0].id_interest2, profile[0].id_interest3, profile[0].id_interest4, function (errors, interests) {
                    if (errors) {

                    }
                    else {
                        interestManager.filterInterestsById(profile[0].id_interest1, profile[0].id_interest2, profile[0].id_interest3, profile[0].id_interest4, function (errors, filterInterests) {
                            if (errors) {

                            }
                            else {
                                const model = {
                                    errors: errors,
                                    profile: profile,
                                    interests: interests,
                                    filterInterests: filterInterests
                                }
                                console.log(model)
                                response.render("viewPerson.hbs", model)
                            }
                        })
                    }
                })
            }

        })
    }
    else {
        const model = {
            errorStatus: "401",
            errorMessage: "You are unauthorized to view this page"

        }
        response.render("error.hbs", model)
    }


})
router.post("/create", function (request, response) {

    const password = request.body.password
    const repeatedPassword = request.body.repeatedPassword
    const email = request.body.email


    profileManager.createProfile(email, password, repeatedPassword, function (errors, id) {
        if (errors) {
            const model = {
                errors,
                email

            }
            response.render("createProfile.hbs", model)

        }
        else {
            request.session.isLoggedIn = true
            request.session.userId = id
            response.redirect("/profile/createInfo/" + request.session.userId)


        }

    })

})

router.post("/createInfo/:id", function (request, response) {

    const city = request.body.city
    const country = request.body.country
    const firstname = request.body.firstname
    const lastname = request.body.lastname
    const interest1 = request.body.interest1
    const interest2 = request.body.interest2
    const interest3 = request.body.interest3
    const interest4 = request.body.interest4
    const profile_id = request.params.id
    
    if (profile_id == request.session.userId) {
    profileManager.updateProfileInfo(city, country, firstname, lastname, interest1, interest2, interest3, interest4, profile_id, function (errors, id) {
        if (errors) {
            interestManager.getAllInterests(function (interestErrors, interests) {
                if(interestErrors){
                    const model = {
                        errors:errors,
                        id: id,
                        interestsErrors: interestErrors
                    }
    
                    response.render("createProfileInfo.hbs", model)

                }else{
                    const model = {
                        errors:errors,
                        id,
                        interests
                    }
    
                    response.render("createProfileInfo.hbs", model)

                }
       
            })

        }
        else {
            response.redirect("/profile/home/" + request.session.userId)
        }
    })
}
else{
    const model = {
        errorStatus: "401",
        errorMessage: "You are unauthorized to view this page"

    }
    response.render("error.hbs", model)
}
})

router.get("/manageProfile/:id", function (request, response) {
    const profile_id = request.params.id

    if (profile_id == request.session.userId) {
        profileManager.getProfileById(profile_id, function (errors, profile) {
            if (errors) {

            }
            else {
                interestManager.getInterestsById(profile[0].id_interest1, profile[0].id_interest2, profile[0].id_interest3, profile[0].id_interest4, function (errors, interests) {
                    if (errors) {

                    }
                    else {
                        interestManager.filterInterestsById(profile[0].id_interest1, profile[0].id_interest2, profile[0].id_interest3, profile[0].id_interest4, function (errors, filterInterests) {
                            if (errors) {

                            }
                            else {
                                interestManager.getAllInterests(function (errors, allInterests) {
                                    if (errors) {

                                    }
                                    else {
                                        messageManager.getAllMessagesByProfileId(profile_id, function (errors, messages) {
                                            if (errors) {

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
                                                response.render("manageProfile.hbs", model)

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
    }
    else {
        const model = {
            errorStatus: "401",
            errorMessage: "You are unauthorized to view this page"

        }
        response.render("error.hbs", model)
    }

})

router.post("/createMessage/:id", function (request, response) {

    const profile_id = request.params.id
    const message = request.body.message

    messageManager.createMessage(message, profile_id, function (errors, result) {
        if (errors) {

        }
        else {
            response.redirect("/profile/manageProfile/" + profile_id)
        }
    })
})

router.post("/updateInfo/:id", function (request, response) {

    const city = request.body.city
    const country = request.body.country
    const firstname = request.body.firstname
    const lastname = request.body.lastname
    const interest1 = request.body.interest1
    const interest2 = request.body.interest2
    const interest3 = request.body.interest3
    const interest4 = request.body.interest4
    const profile_id = request.params.id

    profileManager.updateProfileInfo(city, country, firstname, lastname, interest1, interest2, interest3, interest4, profile_id, function (errors, id) {
        if (errors) {

        }
        else {
            response.redirect("/profile/manageProfile/" + profile_id)
        }
    })
})

router.get('/updateInfo/:id', function (request, response) {

    const id = request.params.id
    if (id == request.session.userId) {
        profileManager.getProfileById(id, function (errors, profile) {
            if (errors) {

            }
            else {
                interestManager.getAllInterests(function (errors, interests) {
                    if (errors) {

                    }
                    else {

                        const model = {
                            profile: profile,
                            interests: interests,
                            id: id
                        }
                        response.render("updateProfile.hbs", model)

                    }

                })
            }
        })

    }
    else {
        const model = {
            errorStatus: "401",
            errorMessage: "You are unauthorized to view this page"

        }
        response.render("error.hbs", model)
    }
    //gets all the interests so the profile can use them



})

router.get("/updateAccount/:id", function (request, response) {
    const id = request.params.id
    if (id == request.session.userId) {
        profileManager.getProfileById(id, function (errors, profile) {
            if (errors) {

            }
            else {

                const model = {
                    profile: profile,
                    id: id
                }
                response.render("updateAccount.hbs", model)
            }
        })

    }
    else {
        const model = {
            errorStatus: "401",
            errorMessage: "You are unauthorized to view this page"

        }
        response.render("error.hbs", model)
    }

})

router.post("/updateAccount/:id", function (request, response) {
    const id = request.params.id
    if (id == request.session.userId) {

        const email = request.body.email
        const password = request.body.password
        const repeatedPassword = request.body.repeatedPassword

    }
    else {
        const model = {
            errorStatus: "401",
            errorMessage: "You are unauthorized to view this page"

        }
        response.render("error.hbs", model)
    }

})



module.exports = router