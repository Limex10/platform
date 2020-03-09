const Sequelize = require('sequelize')

module.exports = function ({ db }) {

  return {

    createProfile: function (email, password, callback) {

      db.models.profiles.create({

        email: email,
        password: password

      }).then(function (id) {

        callback(null, id.profile_id)

      }).catch(function (error) {

        callback(['Account already exists.'], null)

      })
    }
    ,

    getAllProfiles: function (profile_id, callback) {

      db.models.profiles.findAll({

        raw: true,
        where: {

          profile_id: {

            [Sequelize.Op.not]: profile_id

          }
        }
      })

        .then(function (profiles) {

          if (profiles.length == 0) {

            callback(["There are no profiles"], null)

          }
          else {

            callback(null, profiles)

          }
        }).catch(function (error) {

          callback(['databaseError'], null)

        })
    }
    ,

    updateProfileInfo: function (city, country, firstname, lastname, id_interest1, id_interest2, id_interest3, id_interest4, profile_id, callback) {


      db.models.profiles.update({

        city: city,
        country: country,
        firstname: firstname,
        lastname: lastname,
        id_interest1: id_interest1,
        id_interest2: id_interest2,
        id_interest3: id_interest3,
        id_interest4: id_interest4

      }, {

        where: {

          profile_id: profile_id

        }

      }).then(function () {

        callback(null, profile_id)

      }).catch(function (error) {

        callback(['databaseError'], null)

      })
    }
    ,

    getProfileById: function (profile_id, callback) {

      db.models.profiles.findAll({

        raw: true,
        where: {

          profile_id: profile_id

        }

      }).then(function (profile) {

        if (profile.length == 0) {

          callback(["Something went wrong"], null)

        }
        else {

          callback(null, profile)

        }

      }).catch(function (errors) {

        callback(['databaseError'], null)

      })
    }
    ,

    updateAccountInfo: function (email, password, profile_id, callback) {

      db.models.profiles.update({

        email: email,
        password: password

      }, {

        where: {

          profile_id: profile_id

        }
      }
      ).then(function () {

        callback(null)

      }).catch(function (error) {

        callback(['Email already exists!'])

      })
    }
    ,

    deleteAccountById: function (id, callback) {

      db.models.profiles.destroy({

        where: {

          profile_id: id

        }
      }).then(function () {

        callback(null)

      }).catch(function (error) {

        callback(['Could not delete account!'])

      })
    }
  }
}



