module.exports = function ({ db }) {

  return {

    getAccountInfoByEmail: function (email, callback) {

      const query = `SELECT password, email, profile_id FROM myDB.profiles WHERE email = ?`
      const values = email

      db.query(query, values, function (error, account) {

        if (error) {

          callback(['databaseError'], null)

        }
        else {

          if (account.length == 0) {

            callback(["Email does not exists!"], null)

          }
          else {

            callback(null, account)

          }
        }
      })
    }
  }
}