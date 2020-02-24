//const loginRepository = require('../dal/loginRepository')
const bcrypt = require('bcrypt')

module.exports = function({loginRepository}){

    return{

    
getAccountInfoByEmail: function (email, password, callback) {
    //validate
    loginRepository.getAccountInfoByEmail(email, function (errors, result) {
        if (errors) {
            callback(errors, null)
        }
        else {
            
            bcrypt.compare(password, result[0].password, function (err, isMatch) {
                if (err) {
                    callback(["Something went wrong!"], null)
                }
                else {
                    if (isMatch) {
                        callback(null, result[0].profile_id)

                    } else {
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
/*
exports.getIdByEmail = function(email, callback){
    //validate

    loginRepository.getIdByEmail(email, callback)

}*/