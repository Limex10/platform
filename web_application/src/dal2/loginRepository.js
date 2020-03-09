module.exports = function ({ db }) {

  return {

    getAccountInfoByEmail: function (email, callback) {

      db.models.profiles.findAll({

        raw: true,
        where: {

          email: email

        }
      }).then(function (account) {

        if (account.length == 0) {

          callback(["Email does not exists!"], null)

        }
        else {

          callback(null, account)

        }
      }).catch(function (errors) {

        callback(['databaseError'], null)

      })
    }
  }
}
