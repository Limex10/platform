const bcrypt = require('bcrypt')

module.exports = function ({ loginRepository }) {

  return {

    getAccountInfoByEmail: function (email, password, callback) {

      loginRepository.getAccountInfoByEmail(email, function (errors, account) {

        if (errors) {

          callback(errors, null)

        }
        else {

          bcrypt.compare(password, account[0].password, function (err, isMatch) {

            if (err) {

              callback(["Something went wrong!"], null)

            }
            else {

              if (isMatch) {

                callback(null, account[0].profile_id)

              }
              else {

                isMatch = false
                callback(["Incorrect password!"], null)

              }
            }
          })
        }
      })
    }
  }
}