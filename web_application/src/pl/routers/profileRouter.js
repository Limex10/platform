const express = require('express')

const profileManager = require('../../bll/profileManager')
const interestManager = require('../../bll/interestManager')
const messageManager = require('../../bll/messageManager')

const router = express.Router()

router.get('/create', function (request, response) {

  if (request.session.isLoggedIn) {
    response.redirect("/profile/home/" + request.session.userId)
  } else {

    const model = {
      csrfToken: request.csrfToken()
    }
    response.render("createProfile.hbs", model)
  }
})

//gets createInfopage for specific profile
router.get('/createInfo/:id', function (request, response) {
  if (request.session.isLoggedIn) {
    response.redirect("/profile/home/" + request.session.userId)
  } else {

    const id = request.params.id
    if (id == request.session.userId) {


      interestManager.getAllInterests(function (errors, interests) {
        if (errors) {

          const model = {
            errorStatus: "500",
            errorMessage: errors,
            csrfToken: request.csrfToken()

          }
          response.render("error.hbs", model)


        }
        else {

          const model = {
            interests: interests,
            id: id,
            csrfToken: request.csrfToken()
          }
          response.render("createProfileInfo.hbs", model)

        }

      })



    }
    else {
      const model = {
        errorStatus: "401",
        errorMessage: "You are unauthorized to view this page",
        csrfToken: request.csrfToken()

      }
      response.render("error.hbs", model)
    }
    //gets all the interests so the profile can use them

  }
})

router.get('/home/:id', function (request, response) {
  const profile_id = request.params.id

  if (profile_id == request.session.userId) {
    profileManager.getAllProfiles(request.session.userId,function (errors, profiles) {
      if (errors) {

        const model = {
          errorStatus: "500",
          errorMessage: errors,
          csrfToken: request.csrfToken()

        }
        response.render("error.hbs", model)

      }
      else {
        profileManager.getProfileById(profile_id, function (errors, profile) {
          if (errors) {

            const model = {
              errorStatus: "500",
              errorMessage: errors,
              csrfToken: request.csrfToken()

            }
            response.render("error.hbs", model)
          }
          else {

            interestManager.filterInterestsById(profile[0].id_interest1, profile[0].id_interest2, profile[0].id_interest3, profile[0].id_interest4, request.session.userId, function (errors, filterInterests) {
              if (errors) {

                const model = {
                  errorStatus: "500",
                  errorMessage: errors,
                  csrfToken: request.csrfToken()

                }
                response.render("error.hbs", model)

              }
              else {

                const model = {
                  profiles: profiles,
                  profile: profile,
                  filterInterests: filterInterests,
                  csrfToken: request.csrfToken()
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
      errorMessage: "You are unauthorized to view this page",
      csrfToken: request.csrfToken()

    }
    response.render("error.hbs", model)
  }

})

router.get('/home/viewPerson/:id', function (request, response) {

  if (request.session.isLoggedIn) {
    const profile_id = request.params.id

    profileManager.getProfileById(request.session.userId, function (errors, userProfile) {
      if (errors) {

        const model = {
          errorStatus: "500",
          errorMessage: errors,
          csrfToken: request.csrfToken()

        }
        response.render("error.hbs", model)

      }
      else {

        profileManager.getProfileById(profile_id, function (errors, profile) {
          if (errors) {

            const model = {
              errorStatus: "500",
              errorMessage: errors,
              csrfToken: request.csrfToken()

            }
            response.render("error.hbs", model)

          }
          else {
            interestManager.getInterestsById(profile[0].id_interest1, profile[0].id_interest2, profile[0].id_interest3, profile[0].id_interest4, function (errors, interests) {
              if (errors) {

                const model = {
                  errorStatus: "500",
                  errorMessage: errors,
                  csrfToken: request.csrfToken()

                }
                response.render("error.hbs", model)

              }
              else {
                interestManager.filterInterestsById(userProfile[0].id_interest1, userProfile[0].id_interest2, userProfile[0].id_interest3, userProfile[0].id_interest4, request.session.userId, function (errors, filterInterests) {
                  if (errors) {

                    const model = {
                      errorStatus: "500",
                      errorMessage: errors,
                      csrfToken: request.csrfToken()

                    }
                    response.render("error.hbs", model)

                  }
                  else {
                    const model = {
                      profile: profile,
                      interests: interests,
                      filterInterests: filterInterests,
                      csrfToken: request.csrfToken()
                    }

                    response.render("viewPerson.hbs", model)
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
router.post("/create", function (request, response) {

  const password = request.body.password
  const repeatedPassword = request.body.repeatedPassword
  const email = request.body.email


  profileManager.createProfile(email, password, repeatedPassword, function (errors, id) {
    if (errors) {

      const model = {
        errors,
        email,
        csrfToken: request.csrfToken()

      }
      response.render("createProfile.hbs", model)

    }
    else {
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
          if (interestErrors) {

            const model = {
              errorStatus: "500",
              errorMessage: interestsErrors,
              csrfToken: request.csrfToken()

            }
            response.render("error.hbs", model)

          } else {
            const model = {
              errors,
              id,
              interests,
              city,
              firstname,
              country,
              lastname,
              csrfToken: request.csrfToken()

            }

            response.render("createProfileInfo.hbs", model)

          }

        })

      }
      else {
        request.session.isLoggedIn = true
        response.redirect("/profile/home/" + request.session.userId)
      }
    })
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

router.get("/manageProfile/:id", function (request, response) {
  const profile_id = request.params.id

  if (profile_id == request.session.userId) {
    profileManager.getProfileById(profile_id, function (errors, profile) {
      if (errors) {

        const model = {
          errorStatus: "500",
          errorMessage: errors,
          csrfToken: request.csrfToken()

        }
        response.render("error.hbs", model)

      }
      else {
        interestManager.getInterestsById(profile[0].id_interest1, profile[0].id_interest2, profile[0].id_interest3, profile[0].id_interest4, function (errors, interests) {
          if (errors) {

            const model = {
              errorStatus: "500",
              errorMessage: errors,
              csrfToken: request.csrfToken()

            }
            response.render("error.hbs", model)

          }
          else {
            interestManager.filterInterestsById(profile[0].id_interest1, profile[0].id_interest2, profile[0].id_interest3, profile[0].id_interest4, request.session.userId, function (errors, filterInterests) {
              if (errors) {

                const model = {
                  errorStatus: "500",
                  errorMessage: errors,
                  csrfToken: request.csrfToken()

                }
                response.render("error.hbs", model)

              }
              else {
                interestManager.getAllInterests(function (errors, allInterests) {
                  if (errors) {

                    const model = {
                      errorStatus: "500",
                      errorMessage: errors,
                      csrfToken: request.csrfToken()

                    }
                    response.render("error.hbs", model)

                  }
                  else {
                    messageManager.getAllMessagesByProfileId(profile_id, function (errors, messages) {
                      if (errors) {

                        const model = {
                          errorStatus: "500",
                          errorMessage: errors,
                          csrfToken: request.csrfToken()

                        }
                        response.render("error.hbs", model)

                      }
                      else {
                        const model = {
                          errors: errors, // behövs väl inte right???? kemil
                          profile: profile,
                          interests: interests,
                          filterInterests: filterInterests,
                          allInterests: allInterests,
                          messages: messages,
                          csrfToken: request.csrfToken()
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
      errorMessage: "You are unauthorized to view this page",
      csrfToken: request.csrfToken()

    }
    response.render("error.hbs", model)
  }

})

router.post("/createMessage/:id", function (request, response) {

  const profile_id = request.params.id
  const message = request.body.message

  messageManager.createMessage(message, profile_id, function (errors, result) {
    if (errors) {
      const model = {
        errorMessage: errors,
        csrfToken: request.csrfToken()
      }
      response.render("createMessage.hbs", model)
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

  if (profile_id == request.session.userId) {

    profileManager.getProfileById(profile_id, function (errors, profile) {
      if (errors) {

        const model = {
          errorStatus: "500",
          errorMessage: errors,
          csrfToken: request.csrfToken()

        }
        response.render("error.hbs", model)

      }
      else {
        interestManager.getAllInterests(function (errors, interests) {
          if (errors) {

            const model = {
              errorStatus: "500",
              errorMessage: errors,
              csrfToken: request.csrfToken()

            }
            response.render("error.hbs", model)

          }
          else {


            profileManager.updateProfileInfo(city, country, firstname, lastname, interest1, interest2, interest3, interest4, profile_id, function (errors, id) {
              if (errors) {
                const model = {
                  errors,
                  profile,
                  interests,
                  csrfToken: request.csrfToken()
                }
                response.render("updateProfile.hbs", model)

              }
              else {
                response.redirect("/profile/manageProfile/" + id)
              }
            })

          }

        })

      }

    })
  } else {

    const model = {
      errorStatus: "401",
      errorMessage: "You are unauthorized to view this page",
      csrfToken: request.csrfToken()

    }
    response.render("error.hbs", model)

  }
})

router.get('/updateInfo/:id', function (request, response) {

  const id = request.params.id
  if (id == request.session.userId) {
    profileManager.getProfileById(id, function (errors, profile) {
      if (errors) {

        const model = {
          errorStatus: "500",
          errorMessage: errors,
          csrfToken: request.csrfToken()

        }
        response.render("error.hbs", model)

      }
      else {
        interestManager.getAllInterests(function (errors, interests) {
          if (errors) {

            const model = {
              errorStatus: "500",
              errorMessage: errors,
              csrfToken: request.csrfToken()

            }
            response.render("error.hbs", model)

          }
          else {

            const model = {
              profile: profile,
              interests: interests,
              id: id,
              csrfToken: request.csrfToken()
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
      errorMessage: "You are unauthorized to view this page",
      csrfToken: request.csrfToken()

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

        const model = {
          errorStatus: "500",
          errorMessage: errors,
          csrfToken: request.csrfToken()

        }
        response.render("error.hbs", model)

      }
      else {

        const model = {
          profile: profile,
          id: id,
          csrfToken: request.csrfToken()
        }
        response.render("updateAccount.hbs", model)
      }
    })

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

router.post("/updateAccount/:id", function (request, response) {
  const id = request.params.id
  const email = request.body.email
  const password = request.body.password
  const repeatedPassword = request.body.repeatedPassword


  if (id == request.session.userId) {
    profileManager.getProfileById(id, function (errors, profile) {
      if (errors) {

        const model = {
          errorStatus: "500",
          errorMessage: errors,
          csrfToken: request.csrfToken()
        }

        response.render("error.hbs", model)
      }
      else {

        profileManager.updateAccountInfo(email, password, repeatedPassword, id, function (errors) {
          if (errors) {
            const model = {
              errors,
              profile,
              csrfToken: request.csrfToken()
            }
            response.render("updateAccount.hbs", model)
          }
          else {

            response.redirect("/profile/manageProfile/" + id)

          }

        })
      }

    })
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

router.get("/deleteAccount/:id", function (request, response) {

  const profile_id = request.params.id

  if (profile_id == request.session.userId) {

    const model = {
      csrfToken: request.csrfToken()
    }
    response.render("deleteAccount.hbs", model)
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

router.post("/deleteAccount/:id", function (request, response) {

  const profile_id = request.params.id
  const userId = request.body.deleteAccountButton
  if (profile_id == request.session.userId && userId == profile_id) {


    profileManager.deleteAccountById(profile_id, function (error) {
      if (error) {
        const model = {
          errorMessage: error,
          csrfToken: request.csrfToken()
        }
        response.render("deleteAccount.hbs", model)

      } else {
        response.redirect("/../")
        request.session.userId = null
        request.session.isLoggedIn = false

      }
    })
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



module.exports = router