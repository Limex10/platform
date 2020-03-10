module.exports = function ({ db }) {

  return {

    getAllInterests: function (callback) {

      db.models.interests.findAll({
        
        raw: true

      })
        .then(function (interests) {

          callback(null, interests)

        }).catch(function (error) {

          callback(["Something went wrong."], null)

        })
    }
    ,

    createInterest: function (interest, callback) {

      db.models.interests.create({

        interest: interest

      }).then(function () {

        callback(null)

      }).catch(function (error) {

        callback(['Interest already exists.'])

      })
    }
    ,

    getInterestsById: function (id_interest1, id_interest2, id_interest3, id_interest4, callback) {

      db.query(`select interest FROM interests i WHERE i.interests_id IN (?, ?, ?, ?)`, {

        raw: true,
        model: "interests",
        type: db.SELECT,
        replacements: [id_interest1, id_interest2, id_interest3, id_interest4]

      }).then(function (results) {

        callback(null, results)

      }).catch(function (error) {

        callback(["Something went wrong"], null)

      })
    }
    ,

    filterInterestsById: function (id_interest1, id_interest2, id_interest3, id_interest4, profile_id, callback) {

      db.query(`Select * FROM profiles p WHERE profile_id <> ? and ((id_interest1 = ? and id_interest2 = ? and id_interest3 = ? and id_interest4 = ?) or (id_interest1 = ? and id_interest2 = ? and id_interest3 = ?) or (id_interest2 = ? and id_interest3 = ? and id_interest4 = ?) or (id_interest1 = ? and id_interest3 = ? and id_interest4 = ?) or (id_interest1 = ? and id_interest2 = ? and id_interest4 = ?))`, {
        
        model: "profiles",
        raw: true,
        type: db.SELECT,
        replacements: [profile_id, id_interest1, id_interest2, id_interest3, id_interest4, id_interest1, id_interest2, id_interest3, id_interest2, id_interest3, id_interest4, id_interest1, id_interest3, id_interest4, id_interest1, id_interest2, id_interest4]
      
      }).then(function (filteredInterests) {

        callback(null, filteredInterests)

      }).catch(function (error) {

        callback(['databaseError'], null)
        
      })
    }
  }
}