const express = require('express')
//const messageManager = require('../../bll/messageManager')


module.exports = function ({ messageManager }) {

    const router = express.Router()

    router.get("/:id", function (request, response) {
        const profile_id = request.params.id
        if (request.session.isLoggedIn && request.session.userId == profile_id) {
            const model = {
                csrfToken: request.csrfToken()
            }

            response.render("createMessage.hbs", model)
        }
        else {
            const model = {
                errorStatus: "401",
                errorMessage: "You are unauthorized to view this page",
                csrfToken: request.csrfToken()

            }
            response.render("error.hbs", model)
        }

    })

    router.post("/:id", function (request, response) {

        const profile_id = request.params.id
        if (request.session.isLoggedIn && request.session.userId == profile_id) {
            const message = request.body.message

            messageManager.createMessage(message, profile_id, function (errors) {
                if (errors) {
                    const model = {
                        errorMessage: errors,
                        csrfToken: request.csrfToken(),
                        message
                    }
                    response.render("createMessage.hbs", model)
                }
                else {
                    response.redirect("/profile/manageProfile/" + profile_id)
                }
            })
        } else {
            const model = {
                errorStatus: "401",
                errorMessage: "You are unauthorized to post in this page",
                csrfToken: request.csrfToken()

            }
            response.render("error.hbs", model)
        }

    })

    router.post("/update/:id", function (request, response) {
        const profile_id = request.params.id
        if (request.session.isLoggedIn && request.session.userId == profile_id) {
            const message = request.body.message

            messageManager.updateMessageByProfileId(message, profile_id, function(errors) {
                if (errors) {
                    const model = {
                        errorMessage: errors,
                        csrfToken: request.csrfToken(),
                        message
                    }
                    response.render("updateMessage.hbs", model)
                }
                else {
                    response.redirect("/profile/manageProfile/" + profile_id)
                }
            })



        } else {
            const model = {
                errorStatus: "401",
                errorMessage: "You are unauthorized to post in this page",
                csrfToken: request.csrfToken()

            }
            response.render("error.hbs", model)
        }
    })

    router.post("/delete/:id", function (request, response) {
        const profile_id = request.params.id
        if (request.session.isLoggedIn && request.session.userId == profile_id) {

            messageManager.deleteMessageByProfileId(profile_id, function (errors) {
                if (errors) {
                    const model = {
                        errorMessage: errors,
                        csrfToken: request.csrfToken()

                    }
                    response.render("createMessage.hbs", model)

                } else {
                    response.redirect("/profile/manageProfile/" + profile_id)
                }
            })

        }
        else {
            const model = {
                errorStatus: "401",
                errorMessage: "You are unauthorized to post in this page",
                csrfToken: request.csrfToken()

            }
            response.render("error.hbs", model)
        }
    })

    router.get("/update/:id", function (request, response) {
        const profile_id = request.params.id
        if (request.session.isLoggedIn && request.session.userId == profile_id) {


            messageManager.getMessageByProfileId(profile_id, function (error, message) {
                if (error) {
                    const model = {
                        errorMessage: error,
                        csrfToken: request.csrfToken(),
                    }
                    response.render("updateMessage.hbs", model)
                } else {
                    const model = {
                        csrfToken: request.csrfToken(),
                        message: message
                    }
                    console.log(message)
                    response.render("updateMessage.hbs", model)
                }
            })
        }
        else {
            const model = {
                errorStatus: "401",
                errorMessage: "You are unauthorized to post in this page",
                csrfToken: request.csrfToken()

            }
            response.render("error.hbs", model)
        }
    })

    router.get("/delete/:id", function (request, response) {
        const profile_id = request.params.id
        if (request.session.isLoggedIn && request.session.userId == profile_id) {
            const model = {
                csrfToken: request.csrfToken()
            }
            response.render("deleteMessage.hbs", model)
        }
    })
    return router
}

//module.exports = router
